const Sequelize = require("sequelize");

module.exports = (sequelize, Movies) => {
  class MoviesByGenre extends Sequelize.Model {
    static associate(models) {
      MoviesByGenre.belongsTo(models.Movies, { foreignKey: "idDbMovie" });
    }
  }
  MoviesByGenre.init(
    {
      idMoviesByGenre: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idgenre: Sequelize.INTEGER,
      genre: Sequelize.INTEGER,
      movieTitle: Sequelize.STRING,
      idDbMovie: {
        type: Sequelize.INTEGER,
        references: {
          model: Movies, // Nom du modèle lié
          key: "idMovies", // Clé primaire du modèle lié
        },
      },
    },
    { sequelize }
  );

  return MoviesByGenre;
};
