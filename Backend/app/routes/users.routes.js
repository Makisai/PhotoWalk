module.exports = app => {
    const user = require('../contollers/user.controller');

    var router = require('express').Router();

    //Einloggen
    router.post('/login', user.login);

    //Registrierung
    router.post('/register', user.register);

}