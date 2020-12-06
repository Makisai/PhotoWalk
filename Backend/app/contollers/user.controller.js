const db = require("../models");
const { deserializeUser } = require('../config/passport.config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('../config/passport.config');

//Login Prozess
exports.login = (req,res) => {
    passport.authenticate('local', {
        sucessRedirect: '/',
        failureRedirect:'/login'
    })(req,res,next);
}

exports.register = (req,res,next) => {
    const {username,email,password,password2} = req.body;
    let errors= [];

    //Überprüfen, ob alle notwendigen Felder ausgefüllt sind
    if(!username || !email || !password || password2) {
        errors.push({msg: 'Please fill out all fields'});
    }

    //TODO Überprüfen, ob die E-Mail eine E-Mail ist
    //Überprüfen, ob password und password2 übereinstimmen
    if(password.equals(password2)) {
        errors.push({msg: 'Passwords don\'t match'});
    }

    //Passwordlänge überprüfen
    if (password.length <8) {
        errors.push({msg: 'Password has to have at least 8 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2
        })
    }
    //Validierung erfolgreich
    else{
        User.findOne({email: email, username: username}).then(user => {
            if (user.email){
                //Überprüfung, ob die E-Mail bereits existiert
                errors.push({msg: 'Email is already used'});
            }
            if(user.username) {
                //Überprüfung, ob der Username bereits vergeben ist
                errors.push({msg: 'Username is already used'});
            }
            if(errors.length > 0) {
                res.render('register', {
                    errors,
                    username,
                    email,
                    password,
                    password2
                })
            }
            else {
                const newUser = new db.User({
                    username,email,password
                });

                //Password wird gehasht
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password,salt, (err,hash)=> {
                        if(err) throw err;
                        //Hash als Passwort setzten
                        newUser.password(hash);
                        //User speichern
                        newUser.save().then(user => {res.redirect('.');
                        }).catch(err => console.log(err));
                    });
                });
            }
        });
    }
};