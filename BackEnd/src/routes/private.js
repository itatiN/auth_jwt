require('dotenv').config();
const routes = require("express").Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

routes.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password')

    // validations
    if (user) return res.status(200).json({ user })
    else return res.json({ msg: "User not found!" });
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        return res.status(401).json({ msg: error });
    }
}

module.exports = routes;