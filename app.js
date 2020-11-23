const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

// Routes
const bbqRoutes = require("./routes/bbqs");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/bbqs", bbqRoutes);
app.listen(8000, () => {
  console.log("The application is jogingy on localhost:8000");
});
