const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");
const OP = db.Sequelize.Op;

const User = db.users;

//Checken ob eingegebene E-Mail-Adresse schon in der DB vorhanden ist
module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //Match User
            User.findOne({where:{ email: email}})
                .then(user => {
                if(!user){
                    return done(null, false, {message: 'This email is not registered'});
                }
                //Checken ob Passwort zur eingegebenen E-Mail-Adresse existiert/richtig ist
                bcrypt.compare(password, user.password, (err,isMatch) => {
                    if(err) return err;
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
        User.findOneUser(id, (err, user) => {
            if (err) { return err; }
            done(null, user);
        });
    });

    // passport.deserializeUser((id, done) => {
    //     User.findOneUser(id)
    //         .then((user) => {
    //             done(null, user);
    //         })
    //         .catch(err => done(err))
    // });
}