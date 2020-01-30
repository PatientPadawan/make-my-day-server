module.exports = (sequelize, Sequelize) => sequelize.define('blogposts', {
  content: Sequelize.TEXT,
  published: Sequelize.BOOLEAN,
});
