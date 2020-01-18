module.exports = (sequelize, Sequelize) => {
    return sequelize.define('blogposts', {
        content: Sequelize.TEXT,
        published: Sequelize.BOOLEAN,
    });
}