const db = require("../models");
const Challenge = db.challenges;
//Operationen von Sequelize nutzbar machen
const OP = db.Sequelize.Op;

//Alle Challenges eines Photowalks aus der Datenbank auslesen und als json senden
exports.findAllByPhotowalk = (req,res) => {
    Challenge.findAll({where: {photowalkId:req.params.id}},{ include: ["photos"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving challenges."
        });
    });
};

//Eine Challenge mit gesetztem Parameter(ID) finden und als json senden
exports.findOne = (req,res) => {
    const id = req.params.id;

    Challenge.findByPk(id, {include: ["photos"] })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Challenge with id=" + id
        });
    });
};