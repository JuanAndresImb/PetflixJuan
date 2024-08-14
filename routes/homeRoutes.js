const express = require("express");
const homeRoutes = express.Router();
const { videos } = require("../models");

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

    const videoList = await videos.findAll({
      order: [["id", "DESC"]],
      limit: 4,
    });
    console.log("Home route hit");
    // Render the Pug template with the videos data
    res.render("home", { videos: videoList });
  })
);

module.exports = homeRoutes;
