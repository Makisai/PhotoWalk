module.exports = (sequelize, Sequelize) => {
    const Waypoint = sequelize.define("waypoint", {
        lat: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        lng: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Waypoint;
}