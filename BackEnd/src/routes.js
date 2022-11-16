const routes = require("express").Router();
const bcrypt = require('bcrypt');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

routes.get('/', (req, res) => {
    res.json({
        data:"teste",
    });
});

routes.post('/auth/register', async(req, res) => {
    const{name, email, password, confirmPassword} = req.body;
    
    // validations
    if(!name) return res.status(422).json({msg: "Name is required!"});
    if(!email) return res.status(422).json({msg: "Email is required!"});
    if(!password) return res.status(422).json({msg: "Password is required!"});
    if(password !== confirmPassword) return res.status(422).json({msg: "Password not matched!"});

    const userExist = await User.findOne({email:email});
    if(userExist) return res.status(422).json({msg: "Email is already in use!"});

    //cryptography
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {
        await user.save()
        res.status(201).json({msg: "Sucess"});

    } catch (error) {
        res.status(500).json({msg: error});
    }

});

module.exports = routes;