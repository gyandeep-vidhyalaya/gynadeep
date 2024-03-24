const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongoURL = process.env.MONGO_URL;

const mongoDB = async () => {
    await mongoose.connect(mongoURL);
};

module.exports = mongoDB;