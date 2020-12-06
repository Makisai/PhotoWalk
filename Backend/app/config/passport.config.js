const LocalStrategy = require("passport-local");
const postgres = require("pg");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

//Checken ob eingegebene E-Mail-Adresse schon in der DB vorhanden ist
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({userNameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({email: email})
                .then(user => {
                if(!user){
                    return done(null, false, {message: 'This email is not registered'});
                }
                //Checken ob Passwort zur eingegebenen E-Mail-Adresse existiert/richtig ist
                bcrypt.compare(password, user.password, (err,isMatch) => {
                    if(err) throw err;
                    if(isMatch) {return done(null,user);
                    } else{
                        return done(null, false, {message: 'password is incorrect'});
                    }
                });
            }).catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err,user);
        });
    });
}