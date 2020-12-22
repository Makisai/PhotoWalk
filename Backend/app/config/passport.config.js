const BearerStrategy = require("passport-http-bearer").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../models");
const OP = db.Sequelize.Op;

const User = db.users;

//Checken ob eingegebener Token schon in der Datenbank vorhanden ist
module.exports = function(passport) {
    passport.use(new BearerStrategy(
        function(token, done) {
            User.findOne({where:{ token: token }})
                .then((user) => {
                    if (!user) { return done(null, false); }
                    return done(null, user, { scope: 'all' });
                })
                .catch((err) => {return done(err);})
        }
    ));
}