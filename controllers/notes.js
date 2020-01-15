const Note = require('../models/Note');

// @desc Get all notes
// @route GET /api/v1/notes
// @access Public
exports.getNotes = async (req, res, next) => {
    try {
        // find documents
        const notes = await Note.find();

        // convert their _id to id and return
        return res.status(200).json(notes.map(item => ({
            ...item._doc,
            id: item._doc._id,
            _id: undefined
        })));
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

        return res.status(200).json({...created._doc, id: created._doc._id, _id: undefined});
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

        const actual = await Notebook.findById(req.params.id);

        return res.status(200).json({...actual._doc, id: actual._doc._id, _id: undefined});
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

        return res.status(200).json({...deleted._doc, id: deleted._doc._id, _id: undefined});
    } catch (e) {
        console.error(e);

        if (['ValidationError', 'CastError'].indexOf(e.name) != -1) {
            return res.status(400).json({error: e.message});
        }

        return res.status(500).json({error: e.message});
    }
};
