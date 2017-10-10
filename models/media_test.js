'use strict';
module.exports = (sequelize, DataTypes) => {
  var Media_Test = sequelize.define('Media_Test', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    filename: DataTypes.STRING,
    location: DataTypes.STRING
});
  
  return Media_Test;
};