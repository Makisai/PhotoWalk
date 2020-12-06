//Definiert Aufbau von Challenge Datensatz
//ID wird automatisch von Sequelize angelegt
module.exports = (sequelize, Sequelize) => {
    const Challenge = sequelize.define("challenge", {
        description: {
            type: Sequelize.STRING(4000)
        },
    }, {
        timestamp: false
    });
    return Challenge;
}