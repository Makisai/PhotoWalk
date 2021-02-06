const db = require("../models");
const {QueryTypes} = require("sequelize");
const Friendship = db.friendships;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für eine Friendship
exports.create = async (req, res) => {
    const friendId = req.params.id;
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    if (!friendId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (currentUserId == friendId) {
        res.status(400).send({
            message: "Ids müssen unterschiedlich sein!"
        });
        return;
    }

    Friendship.findAll({
        where: {
            [OP.and]: [
                {userId: currentUserId},
                {friendId: friendId}
            ]
        }
    }).then(friendship => {
        if (friendship[0]) {
            res.status(400).send({
                message: "Freundschaft existiert bereits!"
            });
        } else {
            Friendship.bulkCreate([{
                accepted: req.body.accepted,
                first_move: currentUserId,
                userId: currentUserId,
                friendId: friendId
            },{
                accepted: req.body.accepted,
                first_move: currentUserId,
                userId: friendId,
                friendId: currentUserId
            }])
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

//Updaten des Datensatzes -> Akzeptieren der Freundschaftsanfrage (accepted -> true)
exports.acceptFriendship = async (req, res) => {
    const friendId = req.params.id;
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    Friendship.update(
        {accepted: true},
        {where: {
                [OP.or]: [
                    {[OP.and]: [{userId: currentUserId}, {friendId: friendId}]},
                    {[OP.and]: [{userId: friendId}, {friendId: currentUserId}]}
                ]
            }
        }
    ).then(
        res.send({
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
    const friendId = req.params.id;
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    Friendship.destroy({
        where: {
                [OP.or]: [
                    {[OP.and]: [{userId: currentUserId}, {friendId: friendId}]},
                    {[OP.and]: [{userId: friendId}, {friendId: currentUserId}]}
                ]
            }
    })
        .then(
            res.send({
                message: "Freundschaft wurde erfolgreich gelöscht"
            })
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete Friendship with id=" + friendId
            });
        });
}