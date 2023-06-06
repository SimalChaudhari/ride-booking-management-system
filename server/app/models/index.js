const mongoose = require("mongoose");
const dbConfig = require("../config/db.config");
const initializeDatabase = require("../config/db.init");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConfig.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    initializeDatabase();
    console.log("Successfully connected to MongoDB.");
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
};

connectToDatabase();

const db = {
  mongoose,
  role: require("./role.model"),
  user: require("./user.model"),
  ROLES: ["user", "admin", "driver"],
};

module.exports = db;
