// mongoDB
const key = require('./key/key');

require('dotenv').config();

const express = require('express');
const morgan = require("morgan");
const mongoose = require('mongoose');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());


mongoose.connect(
    key,
    {
        useNewUrlParser: true
    }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(require('./routes'));
app.listen(PORT, HOST);
