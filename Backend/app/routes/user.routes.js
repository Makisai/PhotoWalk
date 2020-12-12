module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require('express').Router();

    router.get('/', user.findOneUser);

    //Einloggen
    router.post('/login', user.login);

    //Registrierung
    router.post('/register', user.register);

    app.use('/api/users', router);
}