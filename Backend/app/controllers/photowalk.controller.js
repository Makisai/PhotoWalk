const db = require("../models");
const Photowalk = db.photowalks;
const OP = db.Sequelize.Op;

//Alle Photowalk Datensätze aus der Datenbank auslesen und als json senden
exports.findAll = (req,res) => {
    Photowalk.findAll({ include: ["challenges"] })
    .then(data => {
        res.send(data);
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