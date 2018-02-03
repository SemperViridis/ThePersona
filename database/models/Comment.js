'use strict';

module.exports = (sequelize, Sequelize) => {
  var Comment = sequelize.define('comments', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cmnt: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });

  Comment.sync({ force: true });

  return Comment;
};