# 🌐 Praktikum Pemrograman Web — Pertemuan 7
**Aplikasi Web CRUD Data Mahasiswa (Node.js, Express, & MySQL/MariaDB)**

---

## 👤 Identitas Mahasiswa
* **Nama:** Dicki Firgiawan
* **NIM:** 2406067
* **Mata Kuliah:** Praktikum Pemrograman Web
* **Topik:** Pengembangan Fitur CRUD dengan JavaScript, Node.js, & Database MySQL

---

## 📋 Deskripsi Proyek
Repositori pada branch `pertemuan-7` ini berisi implementasi aplikasi web berbasis arsitektur **Client-Server** untuk mengelola data mahasiswa (**Create, Read, Update, Delete**). 

Aplikasi ini menggunakan **Node.js** dengan framework **Express.js** sebagai *backend* REST API, **MySQL/MariaDB** sebagai penyimpanan basis data relasional, serta **Vanilla JavaScript (Fetch API)**, **HTML5**, dan **CSS3** pada sisi *frontend* untuk manipulasi DOM secara dinamis tanpa memuat ulang halaman (*single-page interaction*).

---

## 🛠️ Teknologi & Lingkungan Pengembangan
* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js (`express`)
* **Database Driver:** MySQL2 (`mysql2`)
* **Database Server:** MySQL / MariaDB (XAMPP / Laragon)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+ Fetch API)
* **Version Control:** Git & GitHub

---

## 📁 Struktur Direktori Proyek
```text
crud-mhs/
├── public/
│   ├── index.html      # Halaman antarmuka pengguna (Form & Tabel Data)
│   ├── script.js       # Logika Client-Side CRUD & komunikasi Fetch API
│   └── style.css       # Styling tampilan antarmuka aplikasi
├── .gitignore          # Mengabaikan folder node_modules saat push ke Git
├── package.json        # Konfigurasi proyek & daftar dependensi Node.js
├── package-lock.json   # Kunci versi dependensi
└── server.js           # Server utama Express.js & konfigurasi endpoint REST API

🗄️ Struktur Basis Data
Nama Database: db_kampus
Nama Tabel: mahasiswa
SQL
CREATE DATABASE IF NOT EXISTS db_kampus;
USE db_kampus;

CREATE TABLE mahasiswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nim VARCHAR(20) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);
🚀 Cara Menjalankan Aplikasi Secara Lokal
Pastikan Layanan Database Aktif
Jalankan service MySQL / MariaDB melalui XAMPP atau Laragon.
Install Dependensi Proyek
Buka terminal di direktori utama proyek, lalu jalankan:
Bash
npm install
Jalankan Server Node.js
Bash
node server.js
Jika berhasil, terminal akan menampilkan pesan:
Plaintext
Server CRUD aktif di http://localhost:3000
Terhubung ke Database MySQL
Akses Aplikasi di Browser
Buka browser dan kunjungi alamat:
Plaintext
http://localhost:3000
🔌 Daftar Endpoint REST API
Method	Endpoint	Deskripsi
GET	/api/mahasiswa	Mengambil seluruh daftar data mahasiswa dari database
POST	/api/mahasiswa	Menambahkan data mahasiswa baru ke database
PUT	/api/mahasiswa/:id	Memperbarui data mahasiswa berdasarkan id
DELETE	/api/mahasiswa/:id	Menghapus data mahasiswa berdasarkan id

---

### Cara Memasukkannya ke Project & Push ke Branch `pertemuan-7`:

1. Buat file baru bernama **`README.md`** di folder utama **`crud-mhs`** (sejajar dengan `server.js`).
2. Tempel (*paste*) seluruh isi teks di atas ke dalamnya, lalu simpan (**`Cmd + S`**).
3. Jalankan perintah berikut di terminal VS Code untuk memperbarui branch `pertemuan-7` di GitHub:
   ```bash
   git add README.md
   git commit -m "Menambahkan dokumentasi README.md Pertemuan 7"
   git push origin pertemuan-7
