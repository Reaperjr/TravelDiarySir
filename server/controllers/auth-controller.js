var connection = require('../config/config');
var bcrypt = require('bcrypt');
const base = {};
const saltRounds = 10;

base.login = async function (req, res) {
    let userData = {email: req.body.email, password: req.body.password};
    console.log(userData);
    connection.query('SELECT * FROM user WHERE email = ?',[userData.email], async function (error, results) {
        if (error) {
            res.json({
                status:false,
                message:'Algum problema com a query'
            })
        }else{
            console.log(results[0]);
            if(results.length >0){
                if (await bcrypt.compare(userData.password, results[0].password)){
                    
                    res.json({
                        status:true,
                        data:results,
                        message: results[0].nome + ' you have been successfully authenticated'
                    });
                }else{
                    res.json({
                        status:false,
                        message:"Email and password does not match"
                    });
                }
            }else{
                res.json({
                    status:false,    
                    message:"Email does not exits"
                });
            }
        }   
    });
};

base.register= async function(req,res){
    console.log(req.body);
        let password = await bcrypt.hash(req.body.password, saltRounds);
    var users={
        nome: req.body.name,
        email: req.body.email,
        password: password,
        data_nasc: req.body.data_nasc
    }
    console.log(users)
    connection.query('INSERT INTO user SET ?', users, function (error, results) {
      if (error) {
        res.json({
            status:false,
            message:'There are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'User registered sucessfully'
        })
      }
    });
}

module.exports = base;