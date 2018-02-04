'use strict';

module.exports = (sequelize, Sequelize) => {
  var Tag = sequelize.define('tags', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tagname: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });


  return Tag;
};