const express = require('express');
const { getNotebooks, postNotebook, putNotebook, deleteNotebook } = require('../controllers/notebooks');

const router = express.Router();

router.route('/notebooks')
    .get(getNotebooks)
    .post(postNotebook);

router.route('/notebooks/:id')
    .put(putNotebook)
    .delete(deleteNotebook);

module.exports = router;

