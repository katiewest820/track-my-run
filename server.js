const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {PORT, CLIENT_ORIGIN} = require('./config');
const userRoutes = require('./routes/userRoutes');
const runRoutes = require('./routes/runRoutes');
const db = require('./database');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(cors({origin: CLIENT_ORIGIN}));

app.all('/');
app.use('/user', userRoutes);
app.use('/run', runRoutes);

let server;

function runServer(port=PORT) {
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`your server is running on port: ${PORT}`);
      resolve();
    });
  });
}

function closeServer(){
  return db.end().then(() => {
    return new Promise((resolve, reject) => {
        console.log('closing server');
      server.close(err => {
        if(err){
          return reject(err);
        }
          resolve();
      });
    });
  });
}

 if (require.main === module) {
   runServer().catch(err => console.log(`internal server error: ${err}`).status(500));
 };

module.exports = {app, runServer, closeServer};



