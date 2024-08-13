"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Videos extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Videos.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // Add any other fields you need for your videos
    },
    {
      sequelize,
      modelName: "videos",
    }
  );
  return Videos;
};
