const express = require("express");
const backend = express.Router();
const { Messages } = require("../models");


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

//base

backend.get(
  "/contact",
  asyncHandler(async (req, res) => {
    res.cookie("hello", "hi!");
    res.render("contact");
  })
);

backend.post(
    "/contact",
    asyncHandler(async (req, res) => {
        console.log(req.body);
        await Messages.create({
            fname: req.body.fname,
            fmail: req.body.fmail,
            fobjet: req.body.fobjet,
            fmessage: req.body.fmessage,
        })
        return res.redirect("/contact");
    })
)

module.exports = backend;
