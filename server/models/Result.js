const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true
    },
    standard: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

const Result = mongoose.model('result', resultSchema);

module.exports = Result;