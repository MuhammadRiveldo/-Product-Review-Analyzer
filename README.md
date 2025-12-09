# Analisis Review Produk (Product Review Analyzer)
| Nama Lengkap      | NIM        | ID GitHub         |
| ----------------- | ---------- | ----------------- |
| **[Muhammad Riveldo Hermawan Putra]**   | **[122140037]** | **[MuhammadRiveldo]** |

Aplikasi web *full-stack* ini memungkinkan pengguna untuk mengirimkan ulasan produk. Aplikasi akan secara otomatis menganalisis teks tersebut untuk menentukan **Sentimen** (menggunakan Hugging Face) dan mengekstrak **Poin Penting** (menggunakan Google Gemini AI), lalu menyimpan hasilnya ke dalam database PostgreSQL.

## 🚀 Fitur

-   **Analisis Sentimen**: Menggunakan model Hugging Face (`distilbert-base-uncased`) untuk menentukan apakah ulasan bersifat POSITIF atau NEGATIF.
-   **Ekstraksi Poin Penting**: Menggunakan API Google Gemini (`gemini-1.5-flash` atau sejenisnya) untuk merangkum kelebihan (pros) dan kekurangan (cons) dari ulasan.
-   **Full-Stack**: Dibangun menggunakan React untuk Frontend dan Python (Flask) untuk Backend.
-   **Database**: Menyimpan semua riwayat ulasan dan hasil analisisnya secara permanen di PostgreSQL.

## 📸 Tampilan Aplikasi (Screenshots)

**1. Halaman Utama & Form Input**
*Tampilan awal aplikasi di mana pengguna dapat memasukkan ulasan produk.*
![Halaman Utama](./docs/images/1.png)

**2. Hasil Analisis Muncul**
*Setelah pengguna mengirimkan ulasan, hasil analisis sentimen dan poin penting akan ditampilkan.*
![Hasil Analisis](docs/images/2.png)

**3. Riwayat Ulasan**
*Di bagian bawah halaman, semua ulasan yang pernah dikirim akan ditampilkan dalam bentuk daftar riwayat.*
![Riwayat Ulasan](docs/images/3.png)

## 🛠️ Teknologi yang Digunakan

-   **Frontend**: React.js, CSS
-   **Backend**: Python, Flask, SQLAlchemy
-   **Database**: PostgreSQL
-   **AI/ML**:
    -   Google Generative AI (Gemini)
    -   Hugging Face Transformers (PyTorch)

## 📂 Struktur Proyek

```bash
/
├── backend/
│   ├── venv/               # Virtual environment Python
│   ├── app.py              # Logika utama aplikasi Flask
│   ├── .env                # Variabel lingkungan (Konfigurasi DB, API Key)
│   └── requirements.txt    # Daftar library Python yang dibutuhkan
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js          # Komponen utama React
│   │   └── ...
│   └── package.json
└── README.md
```

## ⚙️ Instalasi dan Pengaturan

### Prasyarat

-   Python 3.8+
-   Node.js and npm
-   PostgreSQL (dan pgAdmin untuk manajemen database)

### 1. Backend Setup

a. **Clone Repositori & Masuk ke Folder Backend**
```bash
git clone https://github.com/MuhammadRiveldo/-Product-Review-Analyzer.git
cd [backend]
```

b. **Buat dan aktifkan virtual environment:**
   ```bash
   # For Windows
   python -m venv venv
   venv\\Scripts\\activate

   # For macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

c. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

d. **Set up the database:**
   - Buka pgAdmin (atau terminal SQL kamu).
   - Buat database baru dengan nama product_reviews.
   - Buat file bernama `.env` di dalam folder `backend` directory dan Salin konfigurasi berikut ke dalamnya:
     ```
     DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost/product_reviews"
     GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
     ```
     Replace `YOUR_USER` and `YOUR_PASSWORD` with your PostgreSQL credentials.

e. **Run the backend server:**
   ```bash
   flask run --port 5001
   ```
   Server akan berjalan di `http://localhost:5001.` Saat pertama kali dijalankan, server akan otomatis membuat tabel `review` di database.

### 2. Frontend Setup

a. **Buka terminal baru dan masuk ke folder frontend:**
   ```bash
   cd ../frontend
   ```

b. **Install npm dependencies:**
   ```bash
   npm install
   ```

c. **Run the React development server:**
   ```bash
   npm start
   ```
   Aplikasi akan terbuka otomatis di browser pada alamat `http://localhost:3000`.

## Cara Penggunaan

1. Pastikan terminal Backend (Port 5001) dan Frontend (Port 3000) keduanya sedang berjalan
2. Buka Browser di`http://localhost:3000`.
3. Ketik ulasan produk di kolom input.
4. Klik tombol Analyze Review.
5. Tunggu sebentar hingga AI memproses. Hasil Sentimen dan Poin Penting akan muncul..
6. Gulir ke bawah untuk melihat riwayat ulasan yang tersimpan di database.
