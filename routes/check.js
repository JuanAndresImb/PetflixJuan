const express = require("express");
const check = express.Router();
const { Users, ProfileUser, ProfileIcon } = require("../models");

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

check.post(
  "/usernameCheck",
  asyncHandler(async (req, res) => {
    const username = req.body.input;
    const userNameDB = await Users.findOne({
      where: { username: username },
    });
    console.log(userNameDB);
    if (userNameDB) {
      const text = "user already exist";
      return res.send(text);
    } else {
      const text = "";
      return res.send(text);
    }
  })
);

check.post(
  "/emailCheck",
  asyncHandler(async (req, res) => {
    const email = req.body.input;
    const userNameDB = await Users.findOne({
      where: { email: email },
    });
    console.log(userNameDB);
    console.log("here");
    if (userNameDB) {
      const text = "email already exist";
      return res.send(text);
    } else {
      const text = "";
      return res.send(text);
    }
  })
);

check.post(
  "/profilecheck/:id",
  asyncHandler(async (req, res) => {
    if (req.params.id.slice(0, -1) == "profile") {
      console.log(req.body);
      const profileNumber = parseInt(req.params.id.slice(-1)) - 1;

      const userNameDB = await Users.findOne({
        where: { username: req.session.userid },
      });
      const profileAll = await ProfileUser.findAll({
        where: { userId: userNameDB.id },
      });

      const profileIcon = await ProfileIcon.findOne({
        where: { imgName: req.body.selectedImage },
      });

      const profile = profileAll[profileNumber];

      const adultCheck = req.body.adultContents == "on" ? true : false;

      profile.set({
        profileName: req.body.profileName,
        password: parseInt(req.body.profilePassword),
        profileIconId: profileIcon.idProfileIcon,
        ageRestriction: adultCheck,
      });

      await profile.save();

      return res.redirect("/profile");
    }
  })
);

module.exports = check;
