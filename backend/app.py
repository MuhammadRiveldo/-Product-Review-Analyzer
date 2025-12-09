import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from transformers import pipeline
import google.generativeai as genai
import traceback

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Load Hugging Face sentiment analysis model
sentiment_analyzer = pipeline("sentiment-analysis")

# Database Model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_review = db.Column(db.Text, nullable=False)
    sentiment = db.Column(db.String(50), nullable=False)
    key_points = db.Column(db.Text, nullable=True)

    def to_json(self):
        return {
            'id': self.id,
            'product_review': self.product_review,
            'sentiment': self.sentiment,
            'key_points': self.key_points
        }

# API Endpoints
@app.route('/api/analyze-review', methods=['POST'])
def analyze_review():
    try:
        data = request.get_json()
        if not data or 'review' not in data:
            return jsonify({'error': 'Review text is required'}), 400

        review_text = data['review']

        # 1. Analyze Sentiment with Hugging Face
        sentiment_result = sentiment_analyzer(review_text)[0]
        sentiment = sentiment_result['label']

        # 2. Extract Key Points with Gemini
        model = genai.GenerativeModel('gemini-2.5-flash')
        prompt = f"Extract the key points from this product review:\n\n\"{review_text}\"\n\nKey points:"
        response = model.generate_content(prompt)
        key_points = response.text

        # 3. Save to Database
        new_review = Review(
            product_review=review_text,
            sentiment=sentiment.upper(),
            key_points=key_points
        )
        db.session.add(new_review)
        db.session.commit()

        return jsonify(new_review.to_json()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/reviews', methods=['GET'])
def get_reviews():
    try:
        reviews = Review.query.order_by(Review.id.desc()).all()
        return jsonify([review.to_json() for review in reviews]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5001)
