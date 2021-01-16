const db = require("../models");
const {QueryTypes} = require("sequelize");
const Photowalk = db.photowalks;
const OP = db.Sequelize.Op;

//Alle Photowalk Datensätze aus der Datenbank auslesen und als json senden
exports.findAll = async (req, res) => {

    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    const editedPhotowalks = await db.sequelize.query(`SELECT DISTINCT "photowalkId"
                                                       FROM "challenges" WHERE "id" IN (SELECT DISTINCT "challengeId"
                                                                                      FROM "photos" WHERE "userId" = ?)`, {replacements: [currentUserId], type: QueryTypes.SELECT});

    Photowalk.findAll({attributes: ["id", "name", "length", "region", "route"]})
        .then(data => {
            res.send([data, editedPhotowalks]);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving photowalks."
            });
        });
};

//Einen Photowalk Datensatz mit gesetztem Parameter(ID) finden und als json senden
exports.findOne = (req,res) => {
    const id = req.params.id;

    Photowalk.findByPk(id,  {include: ["challenges"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Photowalk with id=" + id
        });
    });
};

exports.findLastPhotowalk = async (req, res) => {
    var tokenParts = req.headers.authorization.split(' ');

    const userId = await db.sequelize.query(`SELECT "id"
                                             FROM "users"
                                             WHERE "token" = ?`, {
        replacements: [tokenParts[1]],
        type: QueryTypes.SELECT
    });

    const currentUserId = userId[0].id;

    const editedPhotowalks = await db.sequelize.query(`SELECT "photowalkId"
                                                       FROM "challenges"
                                                       WHERE "id" = (SELECT "challengeId"
                                                                      FROM "photos"
                                                                    WHERE "id" = (SELECT MAX("id")
                                                                                    FROM "photos"
                                                                                WHERE "userId" = ?
                                                                                )
                                                                    )`, {replacements: [currentUserId], type: QueryTypes.SELECT});

    if (editedPhotowalks[0] !== undefined) {
        Photowalk.findOne({
            where: {
                id: editedPhotowalks[0].photowalkId
            }
        })
        .then(data => {
            res.send(data);
        })
    }
    else {
        res.send('No edited photowalks')
    }
};