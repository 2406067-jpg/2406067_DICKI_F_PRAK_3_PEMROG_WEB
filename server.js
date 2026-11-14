const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// 1. Koneksi ke Database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kampus'
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi Database Gagal:', err.message);
        return;
    }
    console.log('Terhubung ke Database MySQL');
});

// 2. READ: Ambil Seluruh Data Mahasiswa 
app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa ORDER BY id DESC', (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json(result);
    });
});

// 3. CREATE: Tambah Mahasiswa Baru
app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, jurusan, email } = req.body;
    const sql = 'INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)';
    db.query(sql, [nim, nama, jurusan, email], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Data Mahasiswa Berhasil Disimpan' });
    });
});

// 4. UPDATE: Ubah Data Mahasiswa 
app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nim, nama, jurusan, email } = req.body;
    const sql = 'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, email = ? WHERE id = ?';
    db.query(sql, [nim, nama, jurusan, email, id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Data Mahasiswa Berhasil Diperbarui!' });
    });
});

// 5. DELETE: Hapus Data Mahasiswa 
app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.json({ success: true, message: 'Data Mahasiswa Berhasil Dihapus!' });
    });
});

app.listen(PORT, () => {
    console.log(`Server CRUD aktif di http://localhost:${PORT}`);
});