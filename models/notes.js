const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    userId : String,
    notes : {
        title : String,
        description : String
    }
}, {
    timestamps: true,
});

const notesModel = mongoose.model('notes', notesSchema);

module.exports = {
    notesModel
};
