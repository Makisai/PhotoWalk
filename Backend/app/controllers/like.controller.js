const db = require("../models");
const Like = db.likes;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für einen Like
exports.create = (req, res) => {
    if (!req.body.userId && !req.body.photoId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const like = {
        userId: req.body.userId,
        photoId: req.body.photoId
    };

    Like.create(like)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Like"
            });
        });
};

//Anzahl Likes für ein Photo auslesen
exports.findAllCountOnePhoto = (req,res) => {
    const photoId = req.params.photoId;

    Like.findAndCountAll({where: {photoId: photoId}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving like count."
            });
        });
};

//Like löschen (mit UserId und PhotoId)
exports.delete = (req,res) => {
    const userId = req.params.userId;
    const photoId = req.params.photoId;

    Like.destroy({
        where:  {[OP.and]: [
            { userId: userId},
            { photoId: photoId}
            ]
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Like was deleted sucessfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Like.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Like"
            });
        });
};