const Role = require("../models/role.model");

async function initializeDatabase() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      const roles = [
        { name: "user" },
        { name: "driver" },
        { name: "admin" }
      ];

      await Role.insertMany(roles);
      console.log("Added roles to the collection.");
    } else {
      console.log("Roles already exist in the collection.");
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

module.exports = initializeDatabase;
