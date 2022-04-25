const express = require('express')
const userRouter = require('./routes/users');
const config = require('config');
const mongoose = require('mongoose');
const app = express()
const PORT = config.get('port') || 5000;


async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (e) {
        console.log('Server error', e);
        process.exit(1);
    }
}
start();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/rnd', (req, res) => {
    res.json({ number: Math.random(), text: 'hello!' });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

app.use('/auth', require('./routes/auth'));

app.use('/users', userRouter);