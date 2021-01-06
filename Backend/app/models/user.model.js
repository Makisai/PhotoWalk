module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profile_picture: {
            type: Sequelize.STRING,
            defaultValue: 'Link zum DefaultBild'
        },
        token: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });

    return User;
}