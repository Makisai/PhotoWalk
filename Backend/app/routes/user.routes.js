const passport = require('passport');

module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require('express').Router();

    router.get('/', user.findOneUser);

    //Einloggen
    router.post('/login', user.login);

    //Ausloggen
    router.post('/logout', passport.authenticate('bearer', { session: false }), user.logout);

    //Registrierung
    router.post('/register', user.register);

    app.use('/api/users', router);
}