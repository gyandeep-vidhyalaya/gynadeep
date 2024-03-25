const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');
const Activity = require('../models/Activity');
const Result = require('../models/Result');

router.post('/hometeachers', async (req, res) => {
    try {
        const all_data = await Faculty.find({});

        for (let i = all_data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all_data[i], all_data[j]] = [all_data[j], all_data[i]]; // Swap elements
        }
        res.json(all_data.slice(0, 6));
    } catch (error) {
        res.sendStatus(400).json({ error: "Error Occured." });
    }

});

router.post('/homeactivities', async (req, res) => {
    try {
        const all_data = await Activity.find({});
        for (let i = all_data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [all_data[i], all_data[j]] = [all_data[j], all_data[i]]; // Swap elements
        }
        res.json(all_data.slice(0, 8));
    } catch (error) {
        res.sendStatus(400).json({ error: "Error Occured." });
    }
});

module.exports = router;