const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const cloudinary = require('cloudinary').v2;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

router.post('/createactivity', async (req, res) => {
    try {
        await Activity.create({
            title: req.body.title,
            description: req.body.description,
            imgs: req.body.imgs
        }).then(res.json({ success: true }));
    } catch (error) {
        res.status(400).json({ error: "Error Occured." });
    }
});

router.post('/activitydata', async (req, res) => {
    try {
        const activity_data = await Activity.find({});
        res.send(activity_data);
    } catch (error) {
        res.status(400).json({ error: "Error Occured." });
    }
});

router.post('/activitypage', async (req, res)=>{
    try {
        const activity_data = await Activity.findById(req.body.id);
        res.json(activity_data);
        
    } catch (error) {
        res.status(400).json({ error: "Error Occured." });
    }
});

router.post('/deleteactivity', async (req, res) => {
    try {
        const imgs = req.body.imgs;
        for(let i = 0; i < imgs.length; i++){
            const imgUrl = imgs[i];
            const urlArray = imgUrl.split('/');
            const imageName = urlArray[urlArray.length - 1].split('.')[0];
            await cloudinary.uploader.destroy(imageName, async (err, result) => {
            });
        }
        await Activity.findByIdAndDelete(req.body.id);
        res.send({success:true});
    } catch (error) {
        res.status(400).json({ error: "Error Occured." });
    }
});

module.exports = router;