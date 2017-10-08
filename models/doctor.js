'use strict';
module.exports = (sequelize, DataTypes) => {
  var Doctor = sequelize.define('Doctor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    drRating: DataTypes.STRING,
    specialization: DataTypes.STRING,
  });

  Doctor.associate = function(models){
    Doctor.belongsTo(models.Hospital, {
      foreignKey: {
        allowNull: true
      }
    });
    Doctor.belongsTo(models.InsuranceProvider, {
      foreignKey: {
        allowNull: true
      }
    });
    Doctor.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Doctor;
};