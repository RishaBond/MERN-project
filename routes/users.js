const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('users middlware', req.originalUrl);
    next();
});

router.get('/', (req, res) => {
    res.send('users main page');
})

router.get('/:id', (req, res) => {
    console.log('users single');
    res.send(`users single ${req.params.id} page`);
})

module.exports = router;
