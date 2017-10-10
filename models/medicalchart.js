'use strict';

module.exports = (sequelize, DataTypes) => {
  var MedicalChart = sequelize.define('MedicalChart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    comment: DataTypes.TEXT,
    isDrComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
});

  MedicalChart.associate = function(models){
    MedicalChart.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
    MedicalChart.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
    MedicalChart.belongsTo(models.Media, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return MedicalChart;
};
