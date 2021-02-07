var connection = require('../config/config');
const base64 = require('base64-img');
var bcrypt = require('bcrypt');
const base = {};
const saltRounds = 10;

base.updates = async function (req, res) {

    var data = [req.body.assunto, req.body.obs, req.body.img, req.body.data, req.body.id_submissions]
    console.log(data);
    connection.query('UPDATE submissions SET assunto=?, obs=?, img=?, data=? WHERE id_submissions=?', data, function (error, results) {
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
base.edit = async function (req, res) {
    let password = await bcrypt.hash(req.body.password, saltRounds);
    base64.img(req.body.img, '../server/users', Date.now(), function (err, filepath) {
        var name = filepath.split("\\").pop();
        const fileName = name;
        var user = [
            req.body.nome,
            req.body.email,
            password,
            fileName,
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
    })
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

base.delete = async function (req, res) {
    var id = {
        id_viagens: req.params.id_viagens
    }
    connection.query('DELETE FROM  viagens WHERE id_viagens = ?', [id.id_viagens], function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'There are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'Delete successful'
            })
        }
    });
}

module.exports = base;