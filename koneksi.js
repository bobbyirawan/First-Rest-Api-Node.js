var mysql = require('mysql');

// BUAT KONEKSI DATABASE
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'firstrest'
})

conn.connect((err) => {
    if (err) throw err;

    // JIKA BERHASIL
    console.log("mysql terkoneksi");
});
module.exports = conn;