const express = require("express");
const router = express.Router();
const {
  bbqCreate,
  bbqList,
  bbqUpdate,
  bbqDelete,
} = require("../controllers/bbqController");

// bbq List
router.get("/", bbqList);

// bbq Create
router.post("/", bbqCreate);

// bbq Update
router.put("/:bbqId", bbqUpdate);

// Bbq Delete
router.delete("/:bbqId", bbqDelete);
module.exports = router;
