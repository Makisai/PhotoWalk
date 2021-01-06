const passport = require('passport');

module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require('express').Router();

    router.get('/', user.findOneUser);

    //User nach Username suchen
    router.get('/search/:username', passport.authenticate('bearer', { session: false }), user.findByUsername)

    //UserInfos ausgeben für Einstellungen Seite
    router.get('/info/:id', passport.authenticate('bearer', { session: false }), user.getUserInfo)

    //Einloggen
    router.post('/login', user.login);

    //Ausloggen
    router.post('/logout', passport.authenticate('bearer', { session: false }), user.logout);

    //Registrierung
    router.post('/register', user.register);

    //Username updaten
    router.put('/updateUsername', passport.authenticate('bearer', { session: false }), user.updateUsername);

    //Profilbild ändern
    router.put('/updateProfilBild', passport.authenticate('bearer', { session: false }), user.updateProfilBild);

    //Passwort ändern
    router.put('/updatePassword', passport.authenticate('bearer', { session: false }), user.updatePassword);

    //User löschen
    router.delete('/deleteUser/:id',  passport.authenticate('bearer', { session: false }), user.deleteUser)

    app.use('/api/users', router);
}