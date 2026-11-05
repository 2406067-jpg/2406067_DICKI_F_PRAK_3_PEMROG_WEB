<div align="center">

# 🚀 MODUL 6: ASYNCHRONOUS JAVASCRIPT & API FETCHING
### **Praktikum Pemrograman Web 2026**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

<p align="center">
  <b>Aplikasi Web User Directory App yang terintegrasi dengan REST API Publik secara Real-time</b>
</p>

---

</div>

## 📌 Pengenalan Proyek

Proyek ini dibuat untuk memenuhi tugas **Praktikum Pemrograman Web Modul 6**. Fokus utama dari aplikasi ini adalah mengimplementasikan konsep pemrosesan **Asynchronous JavaScript** (*non-blocking execution*) menggunakan sintaks modern `async/await` serta melakukan **Fetch API** ke pustaka data eksternal.

Aplikasi mengambil data pengguna dari endpoint API publik `JSONPlaceholder`, lalu menampilkan data tersebut secara visual dalam format *card grid* yang responsif, dilengkapi indikator status *loading*, penanganan *error*, serta fitur filter pencarian *real-time*.

---

## 🎨 Tampilan & Fitur Utama

| Fitur | Deskripsi |
| :--- | :--- |
| ⚡ **Async/Await Fetching** | Mengambil data dari server di latar belakang tanpa menghentikan atau membekukan interaksi UI. |
| 🛡️ **Error Handling (`try...catch`)** | Menangkap kegagalan jaringan atau respons error dari server (HTTP status != 200) tanpa merusak (*crash*) aplikasi. |
| ⏳ **Status Loading Dynamic** | Memberikan feedback visual berupa pesan status dan mendisabilitaskan tombol saat request sedang berlangsung. |
| 🔍 **Real-time Search Filter** | Fitur pencarian interaktif untuk menyaring nama pengguna secara instan saat mengetik. |
| 📱 **Responsive Grid Layout** | Tampilan antarmuka berbasis CSS Grid yang menyesuaikan dengan berbagai ukuran layar. |

---

## 🛠️ Teknologi & API

- **Bahasa Pemrograman**: JavaScript (ES6+)
- **Struktur & Gaya**: HTML5 & CSS3 (Flexbox & CSS Grid)
- **REST API Endpoint**: `https://jsonplaceholder.typicode.com/users`
- **Version Control**: Git & GitHub (Branch: `pertemuan-6`)

---

## 📂 Struktur Repositori

```text
2406067_DICKI_F_PRAK_3_PEMROG_WEB-pertemuan-6/
│
├── index.html   # Struktur utama halaman & kontainer elemen DOM
├── style.css    # Penataan gaya visual, warna, layout grid & efek animasi
├── script.js    # Logika asinkronus, HTTP Request Fetch, & Manipulasi DOM
└── README.md    # Dokumentasi resmi proyek praktikum
