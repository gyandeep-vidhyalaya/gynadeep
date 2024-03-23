const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const cloudinary = require('cloudinary').v2;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

router.post('/createteacher', async(req, res)=>{
    try{
        await Faculty.create({
            name:req.body.name,
            jobrole:req.body.jobRole,
            img:req.body.img,
            subjects:req.body.subjects,
            number:req.body.number
        }).then(res.json({success:true}));
    }catch (error){
        res.json({success:false});
    }
});

router.post('/teachersdata', async(req, res)=>{
    try{
        const faculty_data = await Faculty.find({});
        res.send(faculty_data);
    }catch(error){
        res.send({success:false});
    }
});

router.post('/updateteacher', async(req, res)=>{
    try{
        await Faculty.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            jobrole:req.body.jobRole,
            img:req.body.img,
            subjects:req.body.subjects,
            number:req.body.number
        }).then(res.json({success:true}));
    }catch (error){
        res.json({success:false});
    }
});

router.post('/deleteteacher', async (req, res) => {
    const check = await Faculty.find({ img: req.body.img });
    if (check.length) {
        try {
            const imgUrl = req.body.img;
            const urlArray = imgUrl.split('/');
            const imageName = urlArray[urlArray.length - 1].split('.')[0];
            await cloudinary.uploader.destroy(imageName, (err, result) => {
            });
            await Faculty.deleteOne({ img: req.body.img }).then(res.json({ success: true }));
        } catch (error) {
            res.json({ success: false });
        }
    } else {
        res.status(400).json({ error: "Account Not Found" });
    }
});

module.exports = router;