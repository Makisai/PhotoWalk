module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        profile_picture: {
            type: Sequelize.STRING,
            defaultValue: 'Link zum DefaultBild'
        }
    }, {
        timestamps: false
    });

    return User;
}