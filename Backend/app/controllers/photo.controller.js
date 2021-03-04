const db = require("../models");
const fs = require("fs");
const {QueryTypes} = require("sequelize");
const { findAll } = require("./photowalk.controller");
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");
const Photo = db.photos;
const OP = db.Sequelize.Op;

//Erstellen eines Datensatzes für ein Foto
exports.create = async (req, res) => {
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

    const photo = {
        photo_link: `/uploads/${req.file.filename}`,
        challengeId: req.body.challengeId,
        userId: currentUserId
    };

    Photo.create(photo)
        .then(data => {
            res.json(201, {message: "Photo erfolgreich hochgeladen!"});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Photo"
            });
        });
};

//Alle Foto Datensätze aus der Datenbank auslesen und als json senden
exports.findAllByUserId = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

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
        }, where: {userId: currentUserId}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Fehler beim Auslesen der Photos des Users"
            });
        });
};

//Alle Photos eines Users zu einem Photowalk und die Photos der Freunde
exports.findAllByPhotowalkId = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    const photowalkId = req.params.id;

    let challengeIds = await db.sequelize.query(`SELECT "id"
                                                FROM "challenges"
                                                WHERE "photowalkId" = ?
                                                       `, {replacements: [photowalkId], type: QueryTypes.SELECT});

    const challArray = challengeIds.map((challenge) => challenge.id);

    let userIds = await db.sequelize.query(`SELECT "friendId"
                                                FROM "friendships"
                                                WHERE "userId" = ?
                                                       `, {replacements: [currentUserId], type: QueryTypes.SELECT})

    const friendArray = userIds.map((user) => user.friendId);

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
                {[OP.or]: [{userId: {[OP.in]: friendArray }},{userId: currentUserId}]},
                { challengeId:  {[OP.in]: challArray }}
            ]}
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Fehler beim Auslesen der Photos zum Photowalk mit id = 1"
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
exports.delete = async (req, res) => {
    const id = req.params.id;
    const oldPicture = await db.sequelize.query(`SELECT "photo_link"
                                                        FROM "photos"
                                                        WHERE "id" = ?
    `, {replacements: [id], type: QueryTypes.SELECT});

    Photo.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Photo erfolgreich gelöscht"
                });
            } else {
                res.json(404, {message: `Photo mit id=${id} wurde nicht gefunden!`});
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Photo with id=" + id
            });
        });

    //Löschen des alten Files
    if (oldPicture[0] !== undefined) {
        fs.unlinkSync(oldPicture[0].photo_link);
    }
};

//Alle Fotos eines Users löschen
exports.deleteAllUserId = async (req,res) =>{
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;
    let oldPicturePaths= [];
    Photo.findAll({
        attributes: ["photo_link"],
        where:
            {userId: currentUserId}
    })
        .then(data => {
            for (i=0; i <data.length; i++){
                oldPicturePaths.push("./app/public" + data[i].photo_link);
            }
            for (i=0; i < oldPicturePaths.length; i++){
                if (oldPicturePaths[i] !== undefined ) {
                fs.unlinkSync(oldPicturePaths[i]);
                }
            };
            res.status(200).send({
                message: "Photos erfolgreich gelöscht"

            });
            
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Fehler beim Auslesen der Photos des Users"
            });
        });
}