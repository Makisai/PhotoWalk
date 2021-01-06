const db = require("../models");
const {QueryTypes} = require("sequelize");
const Photowalk = db.photowalks;
const OP = db.Sequelize.Op;

//Alle Photowalk Datensätze aus der Datenbank auslesen und als json senden
exports.findAll = async (req, res) => {
    const editedPhotowalks = await db.sequelize.query(`SELECT DISTINCT "photowalkId"
                                                       FROM "challenges" WHERE "id" IN (SELECT DISTINCT "challengeId"
                                                                                      FROM "photos")`, {type: QueryTypes.SELECT});

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