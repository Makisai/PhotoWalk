//Definiert Aufbau von Photowalk Datensatz
//ID wird automatisch von Sequelize angelegt
module.exports = (sequelize, Sequelize) => {
    const Photowalk = sequelize.define("photowalk", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        length: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        region: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(4000),
            allowNull: false
        },
    }, {
        timestamps: false
    });

    return Photowalk;
};