require('dotenv').config();
const routes = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

routes.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;

    // validations
    if (!email) return res.status(422).json({ msg: "Email is required!" });
    if (!password) return res.status(422).json({ msg: "Password is required!" });

    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return res.status(422).json({ msg: "Invalid password!" });

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id
        }, secret);

        res.json({ msg: "Sucess", token })

    } catch (error) {
        res.status(500).json({ msg: error });
    }

});

module.exports = routes;