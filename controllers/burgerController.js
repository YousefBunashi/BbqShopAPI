const { Burger, Bbq } = require("../db/models");
const { bbqCreate } = require("./bbqController");

exports.fetchBurger = async (burgerId, next) => {
  try {
    const burger = await Burger.findByPk(burgerId);
    return burger;
  } catch (error) {
    next(error);
  }
};

exports.burgerCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `${req.protocol}://${req.get("host")}/media/${
        req.file.filename
      }`;
    }

    const newBurger = await Burger.create(req.body);
    res.status(201).json(newBurger);
  } catch (error) {
    next(error);
  }
};

exports.burgerList = async (req, res, next) => {
  try {
    const burgers = await Burger.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Bbq,
        as: "bbqs",
        attributes: ["id"],
      },
    });
    res.json(burgers);
  } catch (error) {
    next(error);
  }
};
