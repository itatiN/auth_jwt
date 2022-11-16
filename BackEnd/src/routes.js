const routes = require("express").Router();
const User = require('./models/User');

routes.get('/', (req, res) => {
    res.json({
        data:"teste",
    });
});

routes.post('/auth/register', async(req, res) => {
    const{name, email, password, confirmpassword} = req.body;
    if(!name) return res.status(422).json({msg: "O nome é obrigatório!"});

});

module.exports = routes;