module.exports = (sequelize, Sequelize) => {
    const Friendship = sequelize.define("friendship", {
        accepted: {
            type: Sequelize.BOOLEAN
        },
        first_move: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false
    });

    return Friendship;
}