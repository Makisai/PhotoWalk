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

    if (!req.body.userId && !req.body.accepted) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (currentUserId > req.body.userId) {
        res.status(400).send({
            message: "Ids are not sorted and can't be written into the database!"
        });
        return;
    }

    if (currentUserId == req.body.userId) {
        res.status(400).send({
            message: "Ids cannot be equal!"
        });
        return;
    }

    Friendship.findAll({
        where: {
            [OP.and]: [
                {user1_id: currentUserId},
                {user2_id: req.body.userId}
            ]
        }
    }).then(friendship => {
        if (friendship[0]) {
            res.status(400).send({
                message: "Friendship already exists"
            });
        } else {
            const friendship = {
                accepted: req.body.accepted,
                first_move: req.body.first_move,
                user1_id: currentUserId,
                user2_id: req.body.userId
            };

            Friendship.create(friendship)
                .then(data => {
                    res.send(data);
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
            message: "Friendship sucessfully updated."
        })
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating."
        });
    });
}

exports.deleteFriendship = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    Friendship.destroy({
        where: {id: currentUserId}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Friendship was deleted sucessfully!"
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