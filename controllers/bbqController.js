let bbqs = require("../bbqs");
const slugify = require("slugify");

exports.bbqCreate = (req, res) => {
  const id = bbqs[bbqs.length - 1].id + 1;
  const slug = slugify(req.body.name, { lower: true });
  const newBbq = { id, slug, ...req.body };
  bbqs.push(newBbq);
  res.status(201).json(newBbq);
};

exports.bbqDelete = (req, res) => {
  const { bbqId } = req.params;
  const foundBbq = bbqs.find((bbq) => bbq.id === +bbqId);

  if (foundBbq) {
    bbqs = bbqs.filter((bbq) => bbq.id !== +bbqId);
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Bbq not found" });
  }
};

exports.bbqUpdate = (req, res) => {
  const { bbqId } = req.params;
  const foundBbq = bbqs.find((bbq) => bbq.id === +bbqId);
  if (foundBbq) {
    for (const key in req.body) foundBbq[key] = req.body[key];
    foundBbq.slug = slugify(req.body.name, { lower: true });
    res.status(204).end();
  } else {
    res.status(404).json({ message: "Bbq not found" });
  }
};

exports.bbqList = (req, res) => {
  res.json(bbqs);
};
