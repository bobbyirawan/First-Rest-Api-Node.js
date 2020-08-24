'use strict';

const { json } = require('body-parser');

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/').get(jsonku.index);
    app.route('/mahasiswa').get(jsonku.tampilDataMahasiswa);
    app.route('/mahasiswa/:id').get(jsonku.tampilDataMahasiswaBerdarkanId);
    app.route('/tambah').post(jsonku.tambahDataMahasiswa);
    app.route('/ubah').put(jsonku.ubahDataMahasiswa);
}