const db = require('../database');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

let token;

exports.login = (req, res) => {
  console.log(req.body)
  if(!req.body.username || !req.body.password){
    res.status(401).json({
      message: 'Username as password are required'
    });
    return;
  }
  db.query(`SELECT * from userTable WHERE username = '${req.body.username}'`, (err, user) => {
    if(err)
      throw err;
    if (!user) {
      res.status(401).json({
        message: 'The username you entered does not exist'
      });
      return;
    }
    console.log(bcrypt.hashSync('password'));
    console.log(req.body.password)
    console.log(user[0].password)
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if(err){
        throw err;
      }
      if(!result){
        res.status(401).json({
          message: 'Wrong password'
        });
        return;
      }
      let userToken = {
        username: req.body.username,
      };
     token = jwt.sign(userToken, config.JWT_SECRET);
      console.log(user);
      console.log(token);
      res.status(200).json({
        message: `${user[0].username} successfully logged in`,
        userId: user[0].userid,
        token: token
      })
    })
  })
}

exports.register = (req, res) => {
  let userPassword;
  console.log(req.body)
  db.query(`SELECT * from userTable WHERE username = '${req.body.username}'`, (err, user) => {
    console.log(user)
    // if(err)
    //   console.log(err)
    //   throw err
    if (user.length > 0) {
      res.status(401).json({
        message: 'This username is taken. Please try again'
      })
      return;
    }
  });
  if(!req.body.username){
    res.status(401).json({
      message: 'A user name is required'
    });
    return;
  }
  if(!req.body.password){
    res.status(401).json({
      message: 'A password is required'
    });
    return;
  }
  let hash = bcrypt.hashSync(req.body.password);
  userPassword = hash;
  console.log(userPassword)
  db.query(`INSERT INTO userTable (username, password) VALUES (?, ?)`, [req.body.username, userPassword], (err, user) => {
    if(err)
      throw err;
    console.log(user)
    res.status(200).json({
      message: 'new user registered',
      data: user
    })
  })
}







