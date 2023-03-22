const router = require("express").Router();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const {
  registerUser,
  login,
  logout,
  me
} = require("../../controllers/authController");

app.use(cookieParser());

router.post("/register", registerUser);

router.post("/login", login);

router.post("/logout", logout);

router.get("/me", me)

module.exports = router;
