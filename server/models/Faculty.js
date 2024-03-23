const mongoose = require('mongoose');

const {Schema} = mongoose;

const FacultySchema = new Schema({
    jobrole:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true
    },
    subjects:{
        type: Array,
        require: true
    },
    number:{
        type: Number
    }
});

module.exports = mongoose.model('faculty', FacultySchema);