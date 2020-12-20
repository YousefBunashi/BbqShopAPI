const { Butchery, Bbq } = require("../db/models");
const { bbqCreate } = require("./bbqController");

exports.fetchButchery = async (butcheryId, next) => {
  try {
    const butchery = await Butchery.findByPk(butcheryId);
    return butchery;
  } catch (error) {
    next(error);
  }
};

exports.butcheryCreate = async (req, res, next) => {
  try {
    const foundbutchery = await Butchery.findOne({
      where: { userId: req.user.id },
    });
    if (foundbutchery) {
      const err = new Error("You already have Butchery");
      err.status = 400;
      next(err);
    }
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }
    req.body.userId = req.user.id;
    const newButchery = await Butchery.create(req.body);
    res.status(201).json(newButchery);
  } catch (error) {
    next(error);
  }
};

exports.butcheryList = async (req, res, next) => {
  try {
    const butcherys = await Butchery.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Bbq,
        as: "bbqs",
        attributes: ["id"],
      },
    });
    res.json(butcherys);
  } catch (error) {
    next(error);
  }
};
