const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Videos extends Sequelize.Model {}
  Videos.init(
    {
      idVideo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idV: Sequelize.STRING,
      iso_3166_1: Sequelize.STRING,
      iso_639_1: Sequelize.STRING,
      key: Sequelize.STRING,
      movie_id: Sequelize.INTEGER,
      name: Sequelize.STRING,
      official: Sequelize.BOOLEAN,
      published_at: Sequelize.DATE,
      site: Sequelize.STRING,
      size: Sequelize.INTEGER,
      type: Sequelize.STRING,
    },
    { sequelize }
  );

  return Videos;
};
