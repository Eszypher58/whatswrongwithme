'use strict';
module.exports = (sequelize, DataTypes) => {
  var Hospital = sequelize.define('Hospital', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },  
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: DataTypes.STRING,
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
});

  Hospital.associate = function(models){
    Hospital.hasMany(models.Doctor, {
      onDelete: "cascade"
    });
    Hospital.hasMany(models.Patient, {
      onDelete: "cascade"
    });
  };
  return Hospital;
};