import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5001';

function App() {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [latestAnalysis, setLatestAnalysis] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/reviews`);
      setReviews(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch reviews.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) {
      setError('Review text cannot be empty.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      setLatestAnalysis(null);
      const response = await axios.post(`${API_URL}/api/analyze-review`, { review });
      setLatestAnalysis(response.data);
      setReview('');
      await fetchReviews(); // Refresh the list of reviews
    } catch (err) {
      setError('Failed to analyze review. Please check the backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Review Analyzer</h1>
      </header>
      <main>
        <div className="review-form">
          <h2>Submit a New Review</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Enter product review here..."
              rows="5"
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Review'}
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>

        {loading && <div className="loader"></div>}

        {latestAnalysis && (
          <div className="analysis-result">
            <h2>Latest Analysis</h2>
            <p><strong>Review:</strong> {latestAnalysis.product_review}</p>
            <p><strong>Sentiment:</strong> <span className={`sentiment ${latestAnalysis.sentiment?.toLowerCase()}`}>{latestAnalysis.sentiment}</span></p>
            <p><strong>Key Points:</strong></p>
            <pre>{latestAnalysis.key_points}</pre>
          </div>
        )}

        <div className="reviews-list">
          <h2>All Reviews</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((r) => (
                <li key={r.id}>
                  <p><strong>Review:</strong> {r.product_review}</p>
                  <p><strong>Sentiment:</strong> <span className={`sentiment ${r.sentiment?.toLowerCase()}`}>{r.sentiment}</span></p>
                  <p><strong>Key Points:</strong></p>
                  <pre>{r.key_points}</pre>
                </li>
              ))}
            </ul>
          ) : (
            <p>{loading ? 'Loading reviews...' : 'No reviews yet.'}</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
