'use strict';

module.exports = (sequelize, DataTypes) => {
  var InsuranceProvider = sequelize.define('InsuranceProvider', {
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
    betterDoctorUid: DataTypes.STRING,
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  InsuranceProvider.associate = function(models){
    InsuranceProvider.hasMany(models.Doctor, {
      onDelete: "cascade"
    });
    InsuranceProvider.hasMany(models.Patient, {
      onDelete: "cascade"
    });
  };
  return InsuranceProvider;
};
