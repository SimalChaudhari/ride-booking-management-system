// role.model.js
const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: String
});

module.exports = mongoose.model("Role", RoleSchema);
