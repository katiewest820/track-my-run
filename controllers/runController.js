const db = require('../database');
const mysql = require('mysql');


exports.newRun = (req, res) => {
  console.log(req.body)
  db.query('INSERT INTO runningTable (name, date, goal, userid) VALUES (?, ?, ?, ?)', [req.body.name, req.body.date, req.body.goal, req.body.userid], (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'User added to database',
      data: result
    });
  });
};

exports.getAllRuns = (req, res) => {
  db.query('SELECT * from runningTable', (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Here are all of your run details',
      data: result
    });
  });
};

exports.getOneRun = (req, res) => {
  db.query(`SELECT * from runningTable WHERE idrunningTable = ${req.params.id}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Here is your run information',
      data: result
    });
  });
};

exports.deleteOne = (req, res) => {
  db.query(`DELETE from runningTable WHERE idrunningTable = ${req.params.id}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Your run has been deleted',
      data: result
    });
  });
};

exports.editOneRun = (req, res) => {
  console.log(req.body)
  db.query(`UPDATE runningTable SET goal = '${req.body.goal}', name = '${req.body.name}', date = '${req.body.date}' WHERE idrunningTable = ${req.params.id}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Your run has been updated',
      data: result
    });
  });
};