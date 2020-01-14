const Note = require('../models/Note');

// @desc Get all notes
// @route GET /api/v1/notes
// @access Public
exports.getNotes = async (req, res, next) => {
    try {
        const notes = await Note.find();

        return res.status(200).json(notes);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: e});
    }
};

// @desc Create a note
// @route POST /api/v1/notes
// @access Public
exports.postNote = async (req, res, next) => {
    try {
        const created = await Note.create(req.body);

        return res.status(200).json(created);
    } catch (e) {
        console.error(e);

        if (['ValidationError', 'CastError'].indexOf(e.name) != -1) {
            return res.status(400).json({error: e.message});
        }

        return res.status(500).json({error: e.message});
    }
};

// @desc Update a note
// @route PUT /api/v1/notes/:id
// @access Public
exports.putNote = async (req, res, next) => {
    try {
        const outdated = await Note.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: Date.now()});

        if (outdated === null) {
            return res.status(404).json(null);
        }

        return res.status(200).json(outdated);
    } catch (e) {
        console.error(e);

        if (['ValidationError', 'CastError'].indexOf(e.name) != -1) {
            return res.status(400).json({error: e.message});
        }

        return res.status(500).json({error: e.message});
    }
};

// @desc Delete a note
// @route DELETE /api/v1/notes/:id
// @access Public
exports.deleteNote = async (req, res, next) => {
    try {
        const deleted = await Note.findByIdAndDelete(req.params.id);

        if (deleted === null) {
            return res.status(404).json(null);
        }

        return res.status(200).json(deleted);
    } catch (e) {
        console.error(e);

        if (['ValidationError', 'CastError'].indexOf(e.name) != -1) {
            return res.status(400).json({error: e.message});
        }

        return res.status(500).json({error: e.message});
    }
};
