const express = require('express');
const { getNotes, postNote, putNote, deleteNote } = require('../controllers/notes');

const router = express.Router();

router.route('/notes')
    .get(getNotes)
    .post(postNote);

router.route('/notes/:id')
    .put(putNote)
    .delete(deleteNote);

module.exports = router;

