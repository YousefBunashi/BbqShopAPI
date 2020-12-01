const { Burger } = require("../db/models");

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

// exports.burgerDelete = async (req, res) => {
//   try {
//     await req.burger.destroy();
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

// exports.burgerUpdate = async (req, res) => {
//   try {
//     if (req.file) {
//       req.body.image = `${req.protocol}://${req.get("host")}/media/${
//         req.file.filename
//       }`;
//     }
//     await req.burger.update(req.body);
//     res.status(204).end();
//   } catch (err) {
//     next(err);
//   }
// };

exports.burgerList = async (req, res, next) => {
  try {
    const burgers = await Burger.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(burgers);
  } catch (error) {
    next(error);
  }
};
