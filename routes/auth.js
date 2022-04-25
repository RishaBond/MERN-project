const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const User = require('../models/User_model');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();

router.use((req, res, next) => {
    console.log('users middlware', req.originalUrl);
    next();
});

router.post(
    './register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Invalid password. Password must be at least 6 characters.')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({

            });
        }


        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return res.status(400).json({ message: 'Такой пользователь уже зарегистрирован'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword});

        await user.save()
        res.status(201).json({ message: 'Пользователь создан '});

    } catch (error) { 
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.post(
    '/login',
    [
        check('email', 'Invalid email').normalizeEmail().isEmail(),
        check('password', 'Invalid password. Password must be at least 6 characters.')
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({

            });
        }

        const {email, password} = req.body;

        const findUser = await User.findOne({email});

        if (!findUser) {
            return res.status(400).json({ message: 'Пользователь не найден'});
        }

        // const hashedPassword = await bcrypt.hash(password, 12);
        const isMatch = await bcrypt.compare(password, findUser.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль'});
        }

        const token = jwt.sign(
            { userId: findUser.id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        );

        res.json({ token, userId: findUser.id });

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

module.exports = router;
