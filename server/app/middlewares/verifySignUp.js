const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check username
  User.findOne({ username: req.body.username }).exec((err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (user) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }

    // Check email
    User.findOne({ email: req.body.email }).exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (user) {
        return res.status(400).json({ message: "Failed! Email is already in use!" });
      }

      next();
    });
  });
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
