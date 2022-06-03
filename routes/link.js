const { Router } = require('express');
const Link = require('../models/Link_model');
const { validationResult } = require('express-validator');
const User = require('../models/User_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = Router();

router.post('/generate', async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/', async (req, res) => {
    try {
        const links = await Link.find({ owner: null }); // ???
        res.json(links);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.params.id); // ???
        res.json(link);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

module.exports = router;
