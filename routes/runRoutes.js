const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');

router.post('/newRun', runController.newRun);

router.get('/getAllRuns', runController.getAllRuns);

router.get('/getOneRun/:id', runController.getOneRun);

router.delete('/deleteOneRun/:id', runController.deleteOne);

router.put('/editOneRun/:id', runController.editOneRun);

module.exports = router;