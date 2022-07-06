const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors')
// commented out for now 
// const store = require('./routes/Store');
const user = require('./routes/User');
// TODO import errors

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// commented out for now
// app.use('/store', store);
app.use('/user', user);

app.get('/', (req, res) => {
    res.status(200).send({"ping": "pong"});
})

module.exports = app;