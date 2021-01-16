const passport = require('passport');
const multer = require('multer');

const storageProfile = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./app/profilePics/');
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
});

const fileFilter = (req,file,cb)=> {
    if(file.mimetype === 'image/jpeg'|| file.mimetype ==='image/png' || file.mimetype ==='image/jpg'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};

const update = multer({
    storage: storageProfile,
    limits:{
        fileSize: 1024*1024*15
    },
    fileFilter: fileFilter
});

module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require('express').Router();

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

    //Passwort ändern
    router.put('/updatePassword', passport.authenticate('bearer', { session: false }), user.updatePassword);

    //User löschen
    router.delete('/deleteUser/:id',  passport.authenticate('bearer', { session: false }), user.deleteUser)

    router.get('/is_logged_in', passport.authenticate('bearer', { session: false }),user.isloggedin);

    //Profilbild ändern
    router.patch("/updateProfilBild",passport.authenticate('bearer', { session: false }), update.single('profile_picture'),user.update);

    app.use('/api/users', router);
}