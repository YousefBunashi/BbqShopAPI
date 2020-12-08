const express = require("express");
const db = require("./db/models");
const cors = require("cors");
const SequelizeSlugify = require("sequelize-slugify");
const path = require("path");
const passport = require("passport");
const { localStrategy } = require("./middleware/passport");

const bodyParser = require("body-parser");
const app = express();

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);
// Routes
const bbqRoutes = require("./routes/bbqs");
const burgerRoutes = require("./routes/burgers");
const userRoutes = require("./routes/users");

// Middleware

app.use(cors());
app.use(bodyParser.json());
app.use("/burgers", burgerRoutes);
app.use("/bbqs", bbqRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));
// app.use(passport.initialize());
// passport.use(localStrategy);

// Not found path
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

console.log("hii", path.join(__dirname, "media"));

const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
