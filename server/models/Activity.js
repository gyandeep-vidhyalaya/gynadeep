const mongoose = require('mongoose');

const {Schema} = mongoose;

const ActivitySchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    imgs:{
        type:Array
    }
});

module.exports = mongoose.model('activity', ActivitySchema);