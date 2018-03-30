const db = require('../database');
const mysql = require('mysql');


exports.newRun = (req, res) => {
  console.log(req.body)
  db.query('INSERT INTO runningTable (location, date, mileage, userid, incline, terrain, weather, rating, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [req.body.location,
      req.body.date,
      req.body.mileage,
      req.body.userid,
      req.body.incline,
      req.body.terrain,
      req.body.weather,
      req.body.rating,
      req.body.notes],
    (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'run added to database',
      data: result
    });
  });
};

exports.getAllRuns = (req, res) => {
  console.log(req.params.userid)
  db.query(`SELECT * from runningTable WHERE userid = ${req.params.userid}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Here are all of your run details',
      data: result
    });
  });
};

exports.getOneRun = (req, res) => {
  db.query(`SELECT * from runningTable WHERE id = ${req.params.id}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Here is your run information',
      data: result
    });
  });
};

exports.deleteOne = (req, res) => {
  db.query(`DELETE from runningTable WHERE id = ${req.params.id}`, (err, result) => {
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
  db.query(`UPDATE runningTable SET 
  location = '${req.body.location}', 
  mileage = '${req.body.mileage}', 
  date = '${req.body.date}', 
  terrain = '${req.body.terrain}',
  weather = '${req.body.weather}',
  incline = '${req.body.incline}',
  rating = '${req.body.rating}',
  notes = '${req.body.notes}' WHERE id = ${req.params.id}`, (err, result) => {
    if(err)
      throw err;
    res.status(200).json({
      message: 'Your run has been updated',
      data: result
    });
  });
};