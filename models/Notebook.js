const mongoose = require('mongoose');

const NotebookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name field'],
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

module.exports = mongoose.model('Notebook', NotebookSchema);
