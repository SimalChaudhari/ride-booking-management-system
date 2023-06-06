const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = require("./app/config/cors.config");
const db = require("./app/models");
const authRoutes = require("./app/routes/auth.routes");
const userRoutes = require("./app/routes/user.routes");
const rideRoutes = require("./app/routes/ride.routes");

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
db.mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

db.mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB.");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rides", rideRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
