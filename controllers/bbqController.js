let bbqs = require("../bbqs");
const slugify = require("slugify");
const { Bbq } = require("../db/models");

exports.fetchBbq = async (bbqId, next) => {
  try {
    const bbq = await Bbq.findByPk(bbqId);
    return bbq;
  } catch (error) {
    next(error);
  }
};

exports.bbqCreate = async (req, res, next) => {
  try {
    const newBbq = await Bbq.create(req.body);
    res.status(201).json(newBbq);
  } catch (error) {
    next(error);
  }
};

exports.bbqDelete = async (req, res) => {
  try {
    await req.bbq.destroy();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.bbqUpdate = async (req, res) => {
  try {
    await req.bbq.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.bbqList = async (req, res, next) => {
  try {
    const bbqs = await Bbq.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(bbqs);
  } catch (error) {
    next(error);
  }
};
