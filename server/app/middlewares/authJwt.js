const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;
  console.log({token});
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const checkRole = (roleName) => {
  return (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      Role.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            return res.status(500).json({ message: err });
          }

          const hasRole = roles.some((role) => role.name === roleName);

          if (hasRole) {
            next();
          } else {
            res.status(403).json({ message: `Require ${roleName} Role!` });
          }
        }
      );
    });
  };
};

const authJwt = {
  verifyToken,
  isAdmin: checkRole("admin"),
  isDriver: checkRole("driver"),
  isUser: checkRole("user"),
};

module.exports = authJwt;
