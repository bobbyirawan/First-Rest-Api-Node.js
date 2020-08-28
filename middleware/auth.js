let connection  = require('../koneksi');
let mysql = require('mysql');
let md5 = require('MD5');
let response = require('../res');
let jwt = require('jsonwebtoken');
let config = require('../config/secret');
let ip = require('ip');

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

// CONTROLLER UNTUK LOGIN
exports.login = function(req, res) {
    let post = {
        password : req.body.password,
        email: req.body.email
    }

    let query = 'SELECT * FROM ?? WHERE ?? = ? AND ?? = ?'
    let table = ['users', 'password', md5(post.password), "email", post.email]

    // FORMAT MYSQL
    query = mysql.format(query, table)

    connection.query(query, function(error, rows){
        if(error) {
            console.log(error)
        }else {
            if(rows.length == 1) {
                let token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id

                let data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                let query = "INSERT INTO ?? SET ?";
                let table = ["akses_token"];

                query = mysql.format(query, table);

                connection.query(query, data, function(error, rows) {
                    if(error){
                        console.log(error)
                    }else {
                        res.json({
                            succes: true,
                            message: "Generate Token Succes",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }else {
                 res.json({
                     error: true,
                     message : "Email atau Password Salah!!"
                 });
            }
        }
    });


}