const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const port = process.env.PORT;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/build'));

var favicon = require('serve-favicon')
 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to DB');
    })
    .catch((err) => {
        console.log('Not connected', err);
});

app.use(cors({
    origin: ["http://localhost:3000", "localhost:3000"],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
    secret: process.env.cookieSecret,
    resave: false,
    saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));
app.use('/petCrud', require('./routes/petCrud'));

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
});

module.exports = app;