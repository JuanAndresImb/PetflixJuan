const express = require("express");
const profile = express.Router();
const { Users, ProfileIcon, ProfileUser } = require("../models");
const bcrypt = require("bcrypt");

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

profile.get(
  "/profile",
  asyncHandler(async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (!isLoggedIn) {
      return res.redirect("/");
    }

    const userNameDB = await Users.findOne({
      where: { username: req.session.userid },
    });

    const icons = await ProfileIcon.findAll({
      attributes: ["imgName"],
      raw: true,
    });

    const iconNamesArray = icons.map((icon) => icon.imgName);

    const mainProfileWithIcon = await ProfileUser.findOne({
      where: { userId: userNameDB.id, profileNumber: 1 },
      include: {
        model: ProfileIcon,
        attributes: ["imgName"], // On ne récupère que le champ imgName
      },
      raw: true,
    });

    //const profileGetAll = await ProfileUser.findAll({
    //  where: { userId: userNameDB.id },
    //});

    console.log(userNameDB.newsletter);

    return res.render("profile", {
      profileUser: req.session.userid,
      username: userNameDB.username,
      email: userNameDB.email,
      icons: iconNamesArray,
      iconProfileMain: mainProfileWithIcon["ProfileIcon.imgName"],
    });
  })
);

profile.post(
  "/profileReq",
  asyncHandler(async (req, res) => {})
);

module.exports = profile;
