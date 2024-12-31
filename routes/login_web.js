const express = require("express");
const router = express.Router();

const Login = require("../src/services/Login");
const LoginCheck = require("../src/services/LoginCheck");

router.get("/", async (req, res) => {
  try {
    await Login();
    res.render("code");
  } catch (error) {
    res.render("500");
  }
});

router.post("/check", async (req, res) => {
  try {
    await LoginCheck(req.body.code);
    res.render("codeSuccess");
  } catch (error) {
    res.render("codeError");
  }
});

module.exports = router;
