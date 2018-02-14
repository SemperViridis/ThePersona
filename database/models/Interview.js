'use strict';

module.exports = (sequelize, Sequelize) => {
  var Interview = sequelize.define('interviews', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    response: {
      type: Sequelize.TEXT(`long`),
      allowNull: false,
    },
    videoURL: {
      type: Sequelize.TEXT
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
  });

  return Interview;
};