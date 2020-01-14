const Notebook = require('../models/Notebook');

// @desc Get all notebooks
// @route GET /api/v1/notebooks
// @access Public
exports.getNotebooks = async (req, res, next) => {
    try {
        const notebooks = await Notebook.find();

        return res.status(200).json(notebooks);
    } catch (e) {
        console.error(e);
        return res.status(500).json({error: e});
    }
};

// @desc Create a notebook
// @route POST /api/v1/notebooks
// @access Public
exports.postNotebook = async (req, res, next) => {
    try {
        const created = await Notebook.create(req.body);

        return res.status(200).json(created);
    } catch (e) {
        console.error(e);

        if (['ValidationError', 'CastError'].indexOf(e.name) != -1) {
            return res.status(400).json({error: e.message});
        }

        return res.status(500).json({error: e.message});
    }
};

// @desc Update a notebook
// @route PUT /api/v1/notebooks/:id
// @access Public
exports.putNotebook = async (req, res, next) => {
    try {
        const outdated = await Notebook.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: Date.now()});

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

// @desc Delete a notebook
// @route DELETE /api/v1/notebooks/:id
// @access Public
exports.deleteNotebook = async (req, res, next) => {
    try {
        const deleted = await Notebook.findByIdAndDelete(req.params.id);

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
