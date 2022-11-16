require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());


//credentials in .env
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@jwt-auth.96g4ffp.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true
    }
);

app.use(require('./routes'));
app.listen(PORT, HOST);
