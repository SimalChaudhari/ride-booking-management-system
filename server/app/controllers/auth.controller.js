const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registration = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      return res.status(500).json({ message: err });
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            return res.status(500).json({ message: err });
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              return res.status(500).json({ message: err });
            }

            res.json({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          return res.status(500).json({ message: err });
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            return res.status(500).json({ message: err });
          }

          res.json({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      if (!user) {
        return res.status(404).json({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid Password!" });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      const authorities = user.roles.map((role) => role.name.toUpperCase());
      res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        token
      });
    });
};

exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).json({ message: "You've been signed out!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
