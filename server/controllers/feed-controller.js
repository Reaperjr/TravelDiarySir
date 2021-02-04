var connection = require('../config/config');
const base = {};

base.submit = async function (req, res) {
  
  var feed = {
    id_user: req.body.id_user,
    title: req.body.title,
    desc: req.body.desc,
    partida: req.body.partida,
    destino: req.body.destino,
    pLat: req.body.pLat,
    pLong: req.body.pLong,
    dLat: req.body.dLat,
    dLong: req.body.dLong,
    img: req.body.img
  }
  
  connection.query('INSERT INTO viagens SET ?', feed, function (error, results) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'Submission sucessfully'
      })
    }
  });
}

base.getAll = async function (req, res) {
  connection.query('SELECT * FROM  viagens', function (error, results) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'GetAll successful'
      })
    }
  });
}


base.getFeedById = async function (req, res) {
  var id = {
    id_viagens: req.params.id_viagens
  }
  connection.query('SELECT * FROM  viagens WHERE id_viagens = ?', [id.id_viagens], function (error, results) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'GetFeedById successful'
      })
    }
  });
}
base.getFeedUserById = async function (req, res) {
  var id = {
    id_user: req.params.id_user
  }
  connection.query('SELECT * FROM  viagens WHERE id_user = ?', [id.id_user], function (error, results) {
    if (error) {
      res.json({
        status: false,
        message: 'There are some error with query'
      })
    } else {
      res.json({
        status: true,
        data: results,
        message: 'GetFeedUserById successful'
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

base.updates = async function (req, res) {
  
  var data = [req.body.assunto,req.body.obs,req.body.img, req.body.data, req.body.id_submissions]
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

module.exports = base;