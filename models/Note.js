const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add title field'],
        trim: true
    },
    body: {
        type: String,
        required: [true, 'Please add body field'],
        trim: true
    },
    uid: {
        type: String,
        required: [true, 'Please add uid field'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('Note', NoteSchema);
