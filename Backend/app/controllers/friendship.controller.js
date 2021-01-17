const db = require("../models");
const {QueryTypes} = require("sequelize");
const Friendship = db.friendships;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für eine Friendship
exports.create = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    if (!req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (currentUserId > req.body.userId) {
        var user1 = req.body.userId;
        var user2 = currentUserId;
    } else {
        var user1 = currentUserId;
        var user2 = req.body.userId
    }

    if (currentUserId == req.body.userId) {
        res.status(400).send({
            message: "Ids müssen unterschiedlich sein!"
        });
        return;
    }

    Friendship.findAll({
        where: {
            [OP.and]: [
                {user1_id: user1},
                {user2_id: user2}
            ]
        }
    }).then(friendship => {
        if (friendship[0]) {
            res.status(400).send({
                message: "Freundschaft existiert bereits!"
            });
        } else {
            const friendship = {
                accepted: req.body.accepted,
                first_move: currentUserId,
                user1_id: user1,
                user2_id: user2
            };

            Friendship.create(friendship)
                .then(data => {
                    res.status(201).send({
                        message: "Freundschaft erfolgreich erstellt"
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Friendship"
                    });
                });
        }
    });


};

//Alle Friendship Datensätze eines Users aus der Datenbank auslesen und als json senden
exports.findAllOneUser = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    Friendship.findAll({where: OP.or[{user1_id: currentUserId}, {user2_id: currentUserId}]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving friendships."
            });
        });
};

//Updaten des Datensatzes -> Akzeptieren der Freundschaftsanfrage (accepted -> true)
exports.acceptFriendship = (req,res) => {
    const friendshipId = req.params.id;

    Friendship.update(
        {accepted: "TRUE"},
        {returning: true, where: {id:friendshipId}}
    ).then(
        res.status(200).send({
            message: "Freundschaft erfolgreich akzeptiert."
        })
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating."
        });
    });
}

exports.deleteFriendship = async (req, res) => {
    const id = req.params.id;

    Friendship.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Freundschaft wurde erfolgreich gelöscht"
                });
            } else {
                res.send({
                    message: `Cannot delete Friendship with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Friendship with id=" + id
            });
        });
}