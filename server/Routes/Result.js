const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const cloudinary = require('cloudinary').v2;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

router.post('/createresult', async (req, res) => {
    try {
        await Result.create({
            img: req.body.img,
            standard: req.body.standard,
            division: req.body.division,
            year: req.body.year
        });
        res.send({ success: true });
    } catch (error) {
        res.send({ success: false });
    }
}
);

router.post('/resultdata', async (req, res) => {
    try {
        const result_data = await Result.find({});
        res.send(result_data);
    } catch (error) {
        res.send({ success: false });
    }
});

router.post('/deleteresult', async (req, res) => {
    try {
        const imgUrl = req.body.img;
        const urlArray = imgUrl.split('/');
        const imageName = urlArray[urlArray.length - 1].split('.')[0];
        await cloudinary.uploader.destroy(imageName, (err, result) => {
        });
        await Result.findByIdAndDelete(req.body.id);
        res.send({ success: true });
    } catch (error) {
        res.send({ success: false });
    }
});

module.exports = router;