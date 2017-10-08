'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.DATE,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    googleId: DataTypes.INTEGER,
    token: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    docPatient: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  User.associate = function(models){
    User.hasOne(models.Doctor);
    User.hasOne(models.Patient);
  };
  return User;
};