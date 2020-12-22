const db = require("../models");
const Friendship = db.friendships;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für eine Friendship
exports.create = (req, res) => {
    if (!req.body.id && !req.body.accepted) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    if (req.body.user1_id > req.body.user2_id) {
        res.status(400).send({
            message: "Ids are not sorted and can't be written into the database!"
        });
        return;
    }

    const friendship = {
        accepted: req.body.accepted,
        first_move: req.body.first_move,
        user1_id: req.body.user1_id,
        user2_id: req.body.user2_id
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
};

//Alle Friendship Datensätze eines Users aus der Datenbank auslesen und als json senden
exports.findAllOneUser = (req,res) => {
    const id = req.params.id;

    Friendship.findAll({where: OP.or[{user1_id: id}, {user2_id:id}]})
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
    const id = req.params.id;

    Friendship.update(
        {accepted: "TRUE"},
        {returning: true, where: {id:id}}
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