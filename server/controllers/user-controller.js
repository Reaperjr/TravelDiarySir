var connection = require('../config/config');
const base64 = require('base64-img');
var bcrypt = require('bcrypt');
const base = {};
const saltRounds = 10;

base.edit = async function (req, res) {
    let password = req.body.password;
    if (password != "") {
        password = await bcrypt.hash(req.body.password, saltRounds);
    }
    if (req.body.img != "") {
        base64.img(req.body.img, '../server/users', Date.now(), function (err, filepath) {
            var name = filepath.split("\\").pop();
            const fileName = name;
            var user = [
                req.body.nome,
                password,
                fileName,
                req.body.data_nasc,
                req.body.pais,
                req.body.id_user
            ]
            connection.query('UPDATE user SET nome=?, password=?, img=?, data_nasc=?, pais=? WHERE id_user=?', user, function (error, results) {
                if (error) {
                    res.json({
                        status: false,
                        message: 'There are some error with query'
                    })
                } else {
                    res.json({
                        status: true,
                        data: results,
                        message: 'Update sucessfully'
                    })
                }
            });
        })
    } else {
        var user = [
            req.body.nome,
            req.body.email,
            password,
            req.body.img,
            req.body.data_nasc,
            req.body.pais,
            req.body.id_user
        ]
        connection.query('UPDATE user SET nome=?, email=?,password=?, img=?, data_nasc=?, pais=? WHERE id_user=?', user, function (error, results) {
            if (error) {
                res.json({
                    status: false,
                    message: 'There are some error with query'
                })
            } else {
                res.json({
                    status: true,
                    data: results,
                    message: 'Update sucessfully'
                })
            }
        });
    }
}

base.getUser = async function (req, res) {
    var id = {
        id: req.params.id
    }
    connection.query('SELECT * FROM  user WHERE id_user = ?', [id.id], function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'GetUser successful'
            })
        }
    });
}


module.exports = base;