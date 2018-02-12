'use strict';

module.exports = (sequelize, Sequelize) => {
  var Answer = sequelize.define('answers', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    response: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });


  return Answer;
};