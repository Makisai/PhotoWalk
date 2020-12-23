//Definiert Aufbau von Foto Datensatz
//ID wird automatisch von Sequelize angelegt
module.exports = (sequelize, Sequelize) => {
    const Photo = sequelize.define("photo", {
        photo_link: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Photo;
}
