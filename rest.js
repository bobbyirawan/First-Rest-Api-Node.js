'use strict';

exports.ok = function (values, res) {
    var data = {
        'status': 200,
        'values': values
    }
    res.json(data);
    res.end();
}

// RESPONSE UNTUK NESTED MATAKULIAH
exports.oknested = function (values, res) {
    // LAKUKAN AKUMULASI
    const hasil = values.reduce((akumulasikan, item) => {
        // TENTUKAN KEY GROUPNYA
        if (akumulasikan[item.nama]) {
            //BUAT VARIABLE GROUP NAMA MAHASISWA
            const group = akumulasikan[item.nama];
            // CEK JIKA ISI ARRAY ADALAH MATAKULIAH
            if (Array.isArray(group.matakuliah)) {
                // TAMBAHKAN VALUE KE DALAM MATAKULIAH
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'value': hasil
    }
    res.json(data);
    res.end();
}