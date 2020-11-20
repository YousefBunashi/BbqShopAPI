const express = require("express");
const cors = require("cors");
const bbqs = require("./bbqs");

const app = express();

app.use(cors());

app.get("/bbqs", (req, response) => {
  res.json(bbqs);
});

app.listen(8000, () => {
  console.log("The application is jogingy on localhost:8000");
});
