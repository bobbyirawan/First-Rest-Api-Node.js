'use strict';

var response = require('./rest');
var connection = require('./koneksi');
const conn = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Rest Api berjalan", res);
}

// MENAMPILKAN SEMUA DATA MAHASISWA
exports.tampilDataMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

// MENAMPILKAN SEMUA DATA MAHASISWA BERDASARKAN ID
exports.tampilDataMahasiswaBerdarkanId = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
}

// INSERT DATA MAHASISWA
exports.tambahDataMahasiswa = function (req, res) {
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    connection.query("INSERT INTO mahasiswa (nim, nama, jurusan) VALUES(?,?,?)", [nim, nama, jurusan], function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok("BERHASIL MENAMBAHKAN DATA", res);
        }
    });
}

//UBAH DATA MAHASISWA BERDASARKAN ID
exports.ubahDataMahasiswa = function (req, res) {
    let id = req.body.id_mahasiswa;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    connection.query("UPDATE mahasiswa SET nim =?, nama =?, jurusan =? where id_mahasiswa = ?", [nim, nama, jurusan, id], function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            response.ok("data berhasil diubah", res);
        }
    });
}

// notes : 
// 1. jika ingin ambil data dari parameter gunakan params. example : let id = req.params.id
// 2. jika ingin ambil data dari body atau dengan method post gunakan body. example : let nama = req.body.nama