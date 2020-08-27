'use strict';

var response = require('./rest');
var connection = require('./koneksi');

exports.index = function (req, res) {
    response.ok("Rest Api berjalan", res);
}

// MENAMPILKAN SEMUA DATA MAHASISWA
exports.tampilDataMahasiswa = function (req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fileds) {
        if (error) {
            connection.log(error);
        } else {
            // OK BERASAL DARI EKSPORTS FILE REST.JS
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
            // OK BERASAL DARI EKSPORTS FILE REST.JS
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
            // OK BERASAL DARI EKSPORTS FILE REST.JS
            response.ok("BERHASIL MENAMBAHKAN DATA", res);
        }
    });
}

// UBAH DATA MAHASISWA BERDASARKAN ID
exports.ubahDataMahasiswa = function (req, res) {
    let id = req.body.id_mahasiswa;
    let nim = req.body.nim;
    let nama = req.body.nama;
    let jurusan = req.body.jurusan;
    connection.query("UPDATE mahasiswa SET nim =?, nama =?, jurusan =? where id_mahasiswa = ?", [nim, nama, jurusan, id],
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                // OK BERASAL DARI EKSPORTS FILE REST.JS
                response.ok("data berhasil diubah", res);
            }
        });
}

// HAPUS DATA MAHASISWA BERDASARKAN ID
exports.hapusDataMahasiswa = function (req, res) {
    let id = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa = ?', [id],
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                // OK BERASAL DARI EKSPORTS FILE REST.JS
                response.ok('data berhasil dihapus', res);
            }
        });
}

// TAMPILKAN MATAKULIAH GROUP  (ditampilkan adalah table krs)
exports.tampilkanGroupMatakuliah = function (req, res) {
    connection.query('SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa',
        function (error, rows, fileds) {
            if (error) {
                connection.log(error);
            } else {
                // OKNESTED BERASAL DARI ExPORTS FILE REST.JS
                response.oknested(rows, res);
            }
        }
    );
}



// notes : 
// 1. jika ingin ambil data dari parameter gunakan params. example : let id = req.params.id
// 2. jika ingin ambil data dari body atau dengan method post gunakan body. example : let nama = req.body.nama