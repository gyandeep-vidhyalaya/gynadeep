const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

router.post('/adminlogin', async(req, res)=>{
    try{
        const check = await Admin.findOne({username:req.body.username});
        if(check){
            if(check['password'] == req.body.password)
                res.send({success:true});
            else
                res.status(400).json({error: "Wrong Password."});
        }else{
            res.status(400).json({error: "Username Not Found."});    
        }
    }catch(error){
        res.status(400).json({error: "Error Occured."});
    }
});

module.exports = router;