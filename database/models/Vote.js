'use strict';

module.exports = (sequelize, Sequelize) => {
  var Vote = sequelize.define('votes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }
  });

  Vote.sync({ force: true });

  return Vote;
};