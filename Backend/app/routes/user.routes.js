const passport = require('passport');

module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require('express').Router();

    //User nach Username suchen
    router.get('/search/:username', passport.authenticate('bearer', { session: false }), user.findByUsername)

    //Einloggen
    router.post('/login', user.login);

    //Ausloggen
    router.post('/logout', passport.authenticate('bearer', { session: false }), user.logout);

    //Registrierung
    router.post('/register', user.register);

    router.get('/is_logged_in', passport.authenticate('bearer', { session: false }),user.isloggedin);

    app.use('/api/users', router);
}