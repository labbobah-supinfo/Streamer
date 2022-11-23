const express = require('express');
const { listStreamer, createStreamer, updateStreamer, deleteStreamer, loginStreamer, logoutStreamer } = require('../controller/controller');

const router = express.Router();

router.route('/login/').post(loginStreamer).get(logoutStreamer);
router.route('/').get(listStreamer).post(createStreamer);
router.route('/:id').put(updateStreamer).post(deleteStreamer);


module.exports = router;