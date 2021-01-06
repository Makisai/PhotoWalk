const express = require("express");
const db = require("../models");
const User = db.users;
const OP = db.Sequelize.Op;

const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const uuid = require('uuid');

//Einen User Datensatz mit gesetztem Parameter(ID) finden und als json senden
exports.findOneUser = (req,res) => {
    const id = req.params.id;
    User.findOne(id,  {} )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

//User nach Username suchen (Um dann eine neue Freundesanfrage zu senden)
exports.findByUsername = (req,res) => {
    const username = req.params.username;

    User.findAll({attributes: ['username', 'profile_picture'],where: {username}})
        .then(data => {
            res.json(200, data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the user."
            });
        });
};

exports.getUserInfo = (req,res) => {
    const id = req.params.id;

    User.findOne({
        attributes: ['username', 'email', 'profile_picture'],
        where: {
            id
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving UserInfo with id=" + id
            });
        });
};

exports.updateUsername = (req,res) => {
    const id = req.body.id;
    const newUsername = req.body.newUsername;

    User.update(
        {username: newUsername},
        {where: {id:id}}
    ).then(
        res.status(200).send({
            message: "Username sucessfully updated."
        })
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating."
        });
    });
};

exports.updateProfilBild = (req,res) => {
    const id = req.body.id;
    const newProfilBild = req.body.newProfilBild;

    User.update(
        {profile_picture: newProfilBild},
        {where: {id:id}}
    ).then(
        res.status(200).send({
            message: "Profilbild sucessfully updated."
        })
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating."
        });
    });
};

exports.updatePassword = (req,res) => {
    const id = req.body.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    User.findOne({
        where: {
            id
        }
    }).then((user) => {
        bcrypt.compare(oldPassword, user.password, (err,isMatch) => {
        if(err) return err;
        if(isMatch) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (err, hash) => {
                    if (err) throw err;
                    User.update(
                        {password: hash},
                        {where: {id:id}}
                    ).then(
                        res.status(200).send({
                            message: "Password sucessfully updated."
                        })
                    ).catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while updating."
                        });
                    });
                });
            });
        } else{
            return res.json(401, {message: 'current password is incorrect'});
        }
    })});
};

//Login Prozess
exports.login = (req,res,next) => {
    const {email, password} = req.body;
    User.findOne({
        where: {
            email
        }
    }).then((user) => {
        //Checken ob Passwort zur eingegebenen E-Mail-Adresse existiert/richtig ist
        bcrypt.compare(password, user.password, (err,isMatch) => {
            if(err) return err;
            if(isMatch) {
                if(user.token === ''){
                    const token = uuid.v4()
                    User.update({ token }, {where: {email}});
                    return res.json(200, {username: user.username, token});
                }else{
                    return res.json(200, {username: user.username, token: user.token});
                }
            } else{
                return res.json(401, {message: 'password is incorrect'});
            }
        });
    })
  //  return res.json(200, {})
};

exports.logout = (req,res) => {
    const token = req.user.token
    User.update({ token: "" }, {
        where: {
            token
        }
    });
    res.json(200, {message: 'your logged out'});
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
                    username, email, password,token:uuid.v4()
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

exports.deleteUser= (req,res) => {
    const id = req.params.id;

    User.destroy({
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted sucessfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}