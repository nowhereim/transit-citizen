
const express = require('express');
const Http = require('http');
const routes = require('./routes');
const cors = require('cors');
const crypto = require("crypto");
require('dotenv').config();

const connect = require("./schemas");
connect();

// const passport = require('passport');
// const passportConfig = require('./passport');

const app = express();
const http = Http.createServer(app);
const port = 3000;

//app.config['JSON_AS_ASCII'] = False
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use(passport.initialize());
// passportConfig;

app.use(
    cors({
        origin: '*',
    })
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.use('/', routes);

http.listen(port, () => {
    console.log(`열려라 서버 : port ${port}`);
});

module.exports = http;
