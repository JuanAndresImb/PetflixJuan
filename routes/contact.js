const express = require("express");
const backend = express.Router();

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

module.exports = backend;
