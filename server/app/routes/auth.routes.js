const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/registration",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  controller.registration
);

router.post("/login", controller.login);

router.post("/logout", controller.logout);

module.exports = router;
