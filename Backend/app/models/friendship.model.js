module.exports = (sequelize, Sequelize) => {
    const Friendship = sequelize.define("friendship", {
        accepted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
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