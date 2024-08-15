const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Messages extends Sequelize.Model {
    static associate(models) {
      Messages.hasMany(models.ProfileUser, { foreignKey: "userId" });
    }
  }
  Messages.init(
    {
      fname: Sequelize.STRING,
      fmail: Sequelize.STRING,
      fobjet: Sequelize.STRING,
      fmessage: Sequelize.STRING,
    },
    { sequelize, modelName: "Messages" }
  );

  return Messages;
};
