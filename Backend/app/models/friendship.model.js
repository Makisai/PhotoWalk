module.exports = (sequelize, Sequelize) => {
    const Friendship = sequelize.define("friendship", {
        accepted: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        first_move: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    return Friendship;
}