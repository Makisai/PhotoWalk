const express = require("express");
const db = require("../models");
const User = db.users;
const OP = db.Sequelize.Op;

const { deserializeUser } = require('../config/passport.config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Login Prozess
exports.login = (req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect:'/login'
    })(req,res,next);
}

exports.register = (req,res,next) => {
    const {username,email,password,password2} = req.body;
    let errors= [];

    //Überprüfen, ob alle notwendigen Felder ausgefüllt sind
    if(!username || !email || !password || !password2) {
        errors.push({msg: 'Please fill out all fields'});
    }

    //TODO Überprüfen, ob die E-Mail eine E-Mail ist
    //Überprüfen, ob password und password2 übereinstimmen
    if(password !== password2) {
        errors.push({msg: 'Passwords don\'t match'});
    }
    //Passwordlänge überprüfen
    if (password.length < 8) {
        errors.push({msg: 'Password has to have at least 8 characters'});
    }

    if(errors.length > 0) {
        res.json(400, {
            errors,
            username,
            email,
            password,
            password2
        })
    } else {
        //User datensatz finden anhand der email
        User.findAll({
            where: {
                email: {
                    [OP.like]: email
                }
            }
        })
        .then(user => {
            //Überprüfung, ob die E-Mail bereits existiert und Rückgabe einer Liste mit allen gefundenen usern
            if (user[0] && user[0].email) {
                errors.push({msg: 'Email is already used'})
            }
            if (errors.length > 0) {
                res.json(400, {
                    errors,
                    username,
                    email,
                    password,
                    password2
                })
                //objekt mit daten, die in DB geschrieben werden sollen wird gebaut
            } else {
                const newUser = new User({
                    username, email, password
                });

                //Password wird gehasht
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        //Hash als Passwort setzten
                        newUser.password = hash;
                        //User speichern und statusmeldung zurückgeben, das es geklappt hat
                        newUser.save().then(user => {
                            res.json(201, {});
                        }).catch(err => console.log(err));
                    });
                });
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
};