const express = require("express");
const cors = require("cors");
let bbqs = require("./bbqs");
const bodyParser = require("body-parser");
const slugify = require("slugify");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/bbqs", (req, res) => {
  res.json(bbqs);
});

app.delete("/bbqs/:bbqId", (req, res) => {
  const { bbqId } = req.params;
  const foundBbq = bbqs.find((bbq) => bbq.id === +bbqId);

  if (foundBbq) {
    bbqs = bbqs.filter((bbq) => bbq.id !== +bbqId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Bbq not found" });
  }
});
app.post("/bbqs", (req, res) => {
  const id = bbqs[bbqs.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newBbq = { id, slug, ...req.body };
  bbqs.push(newBbq);
  res.status(201).json(newBbq);
});
app.put("/bbqs/:bbqId", (req, res) => {
  const { bbqId } = req.params;
  const foundBbq = bbqs.find((cookie) => cookie.id === +bbqId);
  if (foundBbq) {
    for (const key in req.body) foundBbq[key] = req.body[key];
  } else {
    res.status(404).json({ message: "Bbq not found" });
  }
});

app.listen(8000, () => {
  console.log("The application is jogingy on localhost:8000");
});
