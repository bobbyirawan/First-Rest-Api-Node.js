let connection  = require('../koneksi')
let mysql = require('mysql')
let md5 = require('MD5')
let response = require('../res')
let jwt = require('jsonwebtoken')
let config = require('../config/secret')
let ip = require('ip')

// CONTROLLER UNTUK REGISTER
exports.registrasi = function(req, res) {
    let post =  {
        username : req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM ?? WHERE ?? = ?"
    let table = ["users", "email", post.email]

    query = mysql.format(query, table);
    connection.query(query, function(error, rows) {
        if(error){
            console.log(error)
        }else {
            if(rows.length == 0) {
                let query = "INSERT INTO ?? SET ?"
                let table = ['users']
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if(error) {
                        console.log(error)
                    }else {
                        response.ok("Berhasil menambah data user baru", res)
                    }
                })
            }else {
                response.ok("email sudah terdaftar!", res);
            }
        }
    })
}