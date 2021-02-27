const express = require("express");
const db = require("../models");
const User = db.users;
const OP = db.Sequelize.Op;

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const fs = require("fs");
const {QueryTypes} = require("sequelize");

//Einen User Datensatz mit gesetztem Parameter(ID) finden und als json senden
exports.findOneUser = (req,res) => {
    const id = req.params.id;
    User.findOne(id,  {} )
        .then(data => {
            res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

//User nach Username suchen (Um dann eine neue Freundesanfrage zu senden)
exports.findByUsername = (req,res) => {
    const username = req.params.username;

    User.findOne({attributes: ['id','username', 'profile_picture'],where: {username}})
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

exports.getUserInfo = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const id = userId[0].id;

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
                message: err + "Error retrieving UserInfo with id=" + id
            });
        });
};

exports.getFriends = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const id = userId[0].id;

    User.findOne({
        attributes: [],
        include: {
            model: db.users,
            attributes: ['id','username','profile_picture'],
            as: "friends",
            through: {
                attributes: ['accepted', 'first_move']
            }},
        where: {
            id
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving Friends of user with id=" + id
            });
        });
};

exports.updateUsername = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');
    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });
    const currentUserId = userId[0].id;
    const newUsername = req.body.newUsername;
    
    const oldUsername = await db.sequelize.query(`SELECT "username" 
                                                  FROM "users" 
                                                  WHERE "id" = ?`, {
        replacements: [currentUserId],
        type: QueryTypes.SELECT
    });

    if (oldUsername[0].username == newUsername) {
        res.status(400).send({
            message: "Username hat sich nicht geändert!"
        })
        return;
    }

    User.findOne({
        where: {
            username: {
                [OP.like]: newUsername
            }
        }
    }).then(user => {
        if (!user) {
            User.update(
                {username: newUsername},
                {where: {id: currentUserId}}
            ).then(
                res.status(200).send({
                    message: "Username erfolgreich erneuert."
                })
            ).catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while updating."
                });
            });
        } else {
            res.status(400).send({
                message: "Username bereits vergeben."
            })
        }
    })
};

// Soll das Profilbild patchen
exports.update = async (req, res) => {
    if (req.file == undefined) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;
    const newPhoto = `/profilePics/${req.file.filename}`;

    const oldProfilePicture = await db.sequelize.query(`SELECT "profile_picture"
                                                FROM "users"
                                                WHERE "id" = ?
                                                       `, {replacements: [currentUserId], type: QueryTypes.SELECT});

    const oldProfilePicturePath = "./app/public" + oldProfilePicture[0].profile_picture;

    User.update({
        profile_picture: newPhoto
    }, {
        where: {
            id: currentUserId
        }
    })
        .then(
            res.status(200).send({message: "Profilbild erfolgreich geändert", path: newPhoto})
        )
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the ProfilePicture"
            });
        });
    //Löschen des alten Files
    //Link zum Default hardgecoded abgefragt
    if (oldProfilePicture[0] !== undefined && oldProfilePicture[0].profile_picture !== '/profilePics/defaultProfile.png') {
        fs.unlinkSync(oldProfilePicturePath);
    }
   
};

exports.updatePassword = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const id = userId[0].id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    //Passwordlänge überprüfen
    if (newPassword.length < 8) {
        res.status(400).send({message: "Password has to have at least 8 characters"})
    }

    User.findOne({
        where: {
            id
        }
    }).then((user) => {
        bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
            if (err) return err;
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        User.update(
                            {password: hash},
                            {where: {id: id}}
                        ).then(
                            res.status(200).send({
                                message: "Password erfolgreich erneuert."
                            })
                        ).catch(err => {
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while updating."
                            });
                        });
                    });
                });
            } else {
                return res.json(401, {message: 'Current password is incorrect'});
            }
        })
    });
};

//Login Prozess
exports.login = (req,res) => {
    const {email, password} = req.body;
    User.findOne({
        where: {
            email
        }
    }).then((user) => {
        if(user === null){
            return res.json(401,{message: 'password or email incorrect'});
        }
        //Checken ob Passwort zur eingegebenen E-Mail-Adresse existiert/richtig ist
        bcrypt.compare(password, user.password, (err,isMatch) => {
            if(err) return err;
            if(isMatch) {
                const token = uuid.v4();
                User.update({ token }, {where: {email}});
                return res.json(200, {username: user.username, email: user.email, profilePicture: user.profile_picture, token});
            } else{
                return res.json(401, {message: 'password or mail is incorrect'});
            }
        });
    })
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

exports.isloggedin = (req,res) =>{
    res.json(200,{})
}

exports.register = (req,res) => {
    const {username,email,password} = req.body;
    let errors= [];

    //Überprüfen, ob alle notwendigen Felder ausgefüllt sind
    if(!username || !email || !password) {
        errors.push({msg: 'Please fill out all fields'});
    }

    //TODO Überprüfen, ob die E-Mail eine E-Mail ist

    //Passwordlänge überprüfen
    if (password.length < 8) {
        errors.push({msg: 'Password has to have at least 8 characters'});
    }
    //TODO überprüfen, ob Benutzername schon vergeben ist
    if(errors.length > 0) {
        res.json(400, {
            errors,
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
                })
            } else {
                User.findAll({
                    where: {
                        username: {
                            [OP.like]: username
                        }
                    }
                }).then(user => {
                    //Überprüfung, ob der Username bereits existiert und Rückgabe einer Liste mit allen gefundenen usern
                    if (user[0] && user[0].username) {
                        errors.push({msg: 'Username is already used'})
                    }
                    if (errors.length > 0) {
                        res.json(400, {
                            errors,
                        })
                        //objekt mit daten, die in DB geschrieben werden sollen wird gebaut
                    } else {
                        const newUser = new User({
                            username, email, password, token: uuid.v4()
                        });

                        //Password wird gehasht
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                //Hash als Passwort setzten
                                newUser.password = hash;
                                //User speichern und statusmeldung zurückgeben, das es geklappt hat
                                newUser.save().then(user => {
                                    res.json(201, {message: "User erfolgreich registriert!"});
                                }).catch(err => console.log(err));
                            });
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
};

exports.deleteUser= async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    const oldProfilePicture = await db.sequelize.query(`SELECT "profile_picture"
                                                FROM "users"
                                                WHERE "id" = ?
                                                       `, {replacements: [currentUserId], type: QueryTypes.SELECT});

    const oldProfilePicturePath = "./app/public" + oldProfilePicture[0].profile_picture;

    User.destroy({
        where: {id: currentUserId}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User erfolgreich gelöscht"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
     if (oldProfilePicture[0] !== undefined && oldProfilePicture[0].profile_picture !== '/profilePics/defaultProfile.png') {
        fs.unlinkSync(oldProfilePicturePath);
    }    
}