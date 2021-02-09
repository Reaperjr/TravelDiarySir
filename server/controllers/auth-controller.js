var connection = require('../config/config');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const base = {};
const saltRounds = 10;

base.login = async function (req, res) {
    let userData = { email: req.body.email, password: req.body.password };
    connection.query('SELECT * FROM user WHERE email = ?', [userData.email], async function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'Algum problema com a query'
            })
        } else {
            if (results.length > 0) {
                if (await bcrypt.compare(userData.password, results[0].password)) {
                    let token = jwt.sign({ id: results[0].id_user }, 'supersecret', {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.json({
                        status: true,
                        token: token,
                        data: results,
                        message: results[0].nome + ' you have been successfully authenticated'
                    });
                } else {
                    res.json({
                        status: false,
                        message: "Email and password does not match"
                    });
                }
            } else {
                res.json({
                    status: false,
                    message: "Email does not exits"
                });
            }
        }
    });
};

base.register = async function (req, res) {
    let password = await bcrypt.hash(req.body.password, saltRounds);
    connection.query('SELECT * FROM user where email=?', req.body.email, function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with select query'
            })
        } else {
            console.log(results);
            if (results == "") {
                
                var users = {
                    nome: req.body.name,
                    email: req.body.email,
                    password: password,
                    data_nasc: req.body.data_nasc,
                    img: "Nopicture.png"
                }
                connection.query('INSERT INTO user SET ?', users, function (error, results) {
                    if (error) {
                        res.json({
                            status: false,
                            message: 'There are some error with insert query'
                        })
                    } else {
                        res.json({
                            status: true,
                            data: results,
                            message: 'User registered sucessfully'
                        })
                    }
                });

            } else {
                res.json({
                    status: false,
                    message: 'Email já existe'
                })
            }
        }
    });
}

base.forgot = async function (req, res) {
    let randompass = generatePassword();
    let password = await bcrypt.hash(randompass, saltRounds);
    var user = [
        password,
        req.body.email
    ]
    connection.query('UPDATE user SET password=? WHERE email=?', user, function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'Updated password sucessfully'
            })
        }
    });
    connection.query('SELECT nome FROM user WHERE email=?', req.body.email, function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            const nome = results;
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'traveldiary.sir@gmail.com',
                    pass: 'traveldiary'
                }
            });
            let info = transporter.sendMail({
                from: '"TravelDiary" <traveldiary.sir@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "Pedido de reset password!", // Subject line
                html: `<h1><b>Olá, ${nome[0].nome}</b></h1><p>Foi pedido um reset à password! </p><h2>Credenciais Login:</h2><p>Email: ${req.body.email}</p><p>Password: ${randompass}</p><p>Encontramo-nos em <a href="http://localhost:8080/login">TravelDiary</a>!</p>`
            }, function (err, info) {
                if (err)
                    console.log(err);
                else
                    console.log('Email enviado');
            });
        }
    });
}
function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

module.exports = base;