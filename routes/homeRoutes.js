const express = require("express");
const homeRoutes = express.Router();
const { Videos, Movies } = require("../models");

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      // Forward error to the global error handler
      next(error);
    }
  };
}

// Route to fetch videos for carousel
homeRoutes.get(
  "/home",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn || typeof req.session.register === "string") {
      return res.redirect("/");
    }
    if (!req.session.profileSelect) {
      return res.redirect("/profileselect");
    }

    ///////////////////////////////////////////////////

    const videoList = await Videos.findAll({
      order: [["id", "DESC"]],
      limit: 4,
    });
    console.log("Home route hit");
    // Render the Pug template with the videos data
    res.render("home", { videos: videoList });
  })
);

//////////////////////////////////////////////
homeRoutes.get(
  "/hometest",
  asyncHandler(async (req, res) => {
    const MovieAll = await Movies.findAll({
      raw: true,
    });

    const VideoAll = await Videos.findAll({
      raw: true,
    });

    /// ici code pour generer la page (sequelize pour le CRUD de la database)

    return res.render("home", { videos: videoList });
  })
);

homeRoutes.post(
  "/hometest",
  asyncHandler(async (req, res) => {
    console.log(req.body);

    /// pour les request post ici

    return res.redirect("/hometest"); // generic response
  })
);

homeRoutes.get(
  "/movie/:id",
  asyncHandler(async (req, res) => {
    console.log(req.params); // {id : parametre exemple local /movie/armagueddon}

    //return res.render(//ici pug pour les movie )
  })
);

module.exports = homeRoutes;
