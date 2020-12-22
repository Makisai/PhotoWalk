module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define("like", {}, {
        timestamps: false
    });

    return Like;
}