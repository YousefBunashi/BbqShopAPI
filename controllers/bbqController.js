const { Bbq, Butchery } = require("../db/models");

exports.fetchBbq = async (bbqId, next) => {
  try {
    const bbq = await Bbq.findByPk(bbqId);
    return bbq;
  } catch (error) {
    next(error);
  }
};
exports.bbqCreate = async (req, res, next) => {
  if (req.user.id === req.butchery.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.butcheryId = req.butchery.id;
    const newBbq = await Bbq.create(req.body);
    res.status(201).json(newBbq);
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.bbqDelete = async (req, res) => {
  if (req.user.id === req.butchery.userId) {
    await req.bbq.destroy();
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.bbqUpdate = async (req, res) => {
  if (req.user.id === req.butchery.userId) {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    await req.bbq.update(req.body);
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.bbqList = async (req, res, next) => {
  try {
    const bbqs = await Bbq.findAll({
      attributes: { exclude: ["butcheryId", "createdAt", "updatedAt"] },
      include: {
        model: Butchery,
        as: "butchery",
        attributes: ["name"],
      },
    });
    res.json(bbqs);
  } catch (error) {
    next(error);
  }
};
