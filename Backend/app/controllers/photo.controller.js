const db = require("../models");
const {QueryTypes} = require("sequelize");
const Photo = db.photos;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für ein Foto
exports.create = (req, res) => {
    if (!req.body.photo_link) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const photo = {
        photo_link: req.body.photo_link,
        challengeId: req.body.challengeId,
        userId: req.body.userId
    };

    Photo.create(photo)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || "Some error occurred while creating the Photo"
            });
        });
};

//Alle Foto Datensätze aus der Datenbank auslesen und als json senden
exports.findAllByUserId = (req,res) => {
    const id = req.params.id;
    Photo.findAll({attributes: {include: [
        [
            db.sequelize.literal(`(
                SELECT COUNT(likes."photoId")
                FROM likes 
                WHERE likes."photoId" = id
                 
            )`,
            ), 'likeCount'
        ]
            ]},where: {userId:id}})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving photos."
        });
    });
};

//Alle Photos eines Users zu einem Photowalk und die Photos der Freunde
exports.findAllByPhotowalkId = async (req, res) => {
    const photowalkId = req.params.id;
    const currentUserId = req.body.userId;

    let challengeIds = await db.sequelize.query(`SELECT "id"
                                                FROM "challenges"
                                                WHERE "photowalkId" = ?
                                                       `, {replacements: [photowalkId], type: QueryTypes.SELECT});

    const challArray = challengeIds.map((challenge) => challenge.id);

    let userIds = await db.sequelize.query(`SELECT "user1_id", "user2_id"
                                                FROM "friendships"
                                                WHERE "user1_id" = ? OR "user2_id" = ?
                                                       `, {replacements: [currentUserId, currentUserId], type: QueryTypes.SELECT})

    const userArray1 = userIds.map((user) => user.user1_id);

    const userArray2 = userIds.map((user) => user.user2_id);

    var userArray = userArray1.concat(userArray2);


    Photo.findAll({
        attributes: {
            include: [
                [
                    db.sequelize.literal(`(
                SELECT COUNT(likes."photoId")
                FROM likes 
                WHERE likes."photoId" = id
                 
            )`,
                    ), 'likeCount'
                ]
            ]
        },
        where: { [OP.and]: [
                {[OP.or]: [{userId: {[OP.in]: userArray }},{userId: currentUserId}]},
                { challengeId:  {[OP.in]:challArray }}
            ]}
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving photos."
            });
        });
};

//Einen Foto Datensatz mit gesetztem Parameter(ID) finden und als json senden
exports.findOne = (req,res) => {
    const id = req.params.id;

    Photo.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Photo with id=" + id
        });
    });
};

//Löscht einen Foto Datensatz anhand eines gesetzen Parameters(ID)
exports.delete = (req,res) => {
    const id = req.params.id;

    Photo.destroy({
        where: {id:id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Photo was deleted sucessfully!"
                });
            } else {
                res.send({
                    message: `Photo mit id=${id} wurde nicht gefunden!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Photo with id=" + id
            });
        });
};