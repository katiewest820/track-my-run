const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const sharedController = require('../controllers/sharedController');

router.use(sharedController.checkForToken);

router.post('/newRun', runController.newRun);

router.get('/getAllRuns/:userid', runController.getAllRuns);

router.get('/getOneRun/:id', runController.getOneRun);

router.delete('/deleteOneRun/:id', runController.deleteOne);

router.put('/editOneRun/:id', runController.editOneRun);

module.exports = router;