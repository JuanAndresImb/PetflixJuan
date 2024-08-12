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

    const profileGetAll = await ProfileUser.findAll({
      where: { userId: userNameDB.id },
      include: {
        model: ProfileIcon,
        attributes: ["imgName"], // On ne récupère que le champ imgName
      },
      raw: true,
    });

    const newsletter = userNameDB.newsletter ? true : false;

    const profiles = [
      {
        id: "profile1",
        color: "blueviolet",
        icon: profileGetAll[0]["ProfileIcon.imgName"],
        name: profileGetAll[0].profileName,
        adultContents: profileGetAll[0].ageRestriction,
        created: profileGetAll[0].created ? "update" : "create",
      },
      {
        id: "profile2",
        color: "green",
        icon: profileGetAll[1]["ProfileIcon.imgName"],
        name: profileGetAll[1].profileName,
        adultContents: profileGetAll[1].ageRestriction,
        created: profileGetAll[1].created ? "update" : "create",
      },
      {
        id: "profile3",
        color: "red",
        icon: profileGetAll[2]["ProfileIcon.imgName"],
        name: profileGetAll[2].profileName,
        adultContents: profileGetAll[2].ageRestriction,
        created: profileGetAll[2].created ? "update" : "create",
      },
      {
        id: "profile4",
        color: "orange",
        icon: profileGetAll[3]["ProfileIcon.imgName"],
        name: profileGetAll[3].profileName,
        adultContents: profileGetAll[3].ageRestriction,
        created: profileGetAll[3].created ? "update" : "create",
      },
    ];

    return res.render("profile", {
      profileUser: req.session.userid,
      username: userNameDB.username,
      email: userNameDB.email,
      icons: iconNamesArray,
      iconProfile1: mainProfileWithIcon["ProfileIcon.imgName"],
      newsletter: newsletter,
      profiles: profiles,
    });
  })
);

profile.post(
  "/profileReq",
  asyncHandler(async (req, res) => {})
);

////////////////////////////////////////////////////////////////////////////////////////////////////////

profile.get(
  "/profilecreate",
  asyncHandler(async (req, res) => {
    const icons = await ProfileIcon.findAll({
      attributes: ["imgName"],
      raw: true,
    });

    const iconNamesArray = icons.map((icon) => icon.imgName);

    return res.render("profileCreate", { icons: iconNamesArray });
  })
);

profile.post(
  "/profilecreate",
  asyncHandler(async (req, res) => {
    console.log(req.body);

    const icons = await ProfileIcon.findOne({
      where: { imgName: req.body.selectedImage },
    });

    console.log(icons);

    const userNameDB = await Users.findOne({
      where: { username: req.session.register },
    });

    const ageRestriction = req.body.adultContents == "on" ? true : false;
    const createUserProfile1 = await ProfileUser.create({
      profileName: req.body.profilename,
      profileNumber: 1,
      ageRestriction: ageRestriction,
      password: req.body.password,
      profileIconId: icons.idProfileIcon,
      created: true,
      userId: userNameDB.id,
    });

    const createUserProfile2 = await ProfileUser.create({
      profileName: "profile name",
      profileNumber: 2,
      ageRestriction: false,
      password: "",
      profileIconId: 1,
      created: false,
      userId: userNameDB.id,
    });

    const createUserProfile3 = await ProfileUser.create({
      profileName: "profile name",
      profileNumber: 3,
      ageRestriction: false,
      password: "",
      profileIconId: 1,
      created: false,
      userId: userNameDB.id,
    });

    const createUserProfile4 = await ProfileUser.create({
      profileName: "profile name",
      profileNumber: 4,
      ageRestriction: false,
      password: "",
      profileIconId: 1,
      created: false,
      userId: userNameDB.id,
    });
  })
);

//////////////////////////////////////////////////////////////////////////////////////////////////////////

profile.get(
  "/profileselect",
  asyncHandler(async (req, res) => {})
);

profile.post(
  "/profileselect/:id",
  asyncHandler(async (req, res) => {})
);

module.exports = profile;
