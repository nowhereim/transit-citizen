
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
app.use(function (req, res, next) {
    res.set({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin,
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization, refreshToken, cache-control',
    });
    next();
});


app.use(
    cors({
        origin: '*',
    })
);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });


app.use('/', routes);

http.listen(port, () => {
    console.log(`열려라 서버 : port ${port}`);
});

module.exports = http;
