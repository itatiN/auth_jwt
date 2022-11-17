const routes = require("express").Router();

routes.use(require('./routes/private'));
routes.use(require('./routes/login'));
routes.use(require('./routes/register'));

module.exports = routes;