const mongoose = require('mongoose');

const {Schema} = mongoose;

const AdminSchema = new Schema({
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model('admin', AdminSchema);