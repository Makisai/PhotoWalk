const db = require("../models");
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
    Photo.findAll({where: {userId:req.params.id}})
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
//TODO: Überprüfen ob current USER auch der OWNER des FOTOS ist
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
                    message: `Cannot delete Photo with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Photo with id=" + id
            });
        });
};