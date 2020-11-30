const express = require("express");
const router = express.Router();
const {
  bbqCreate,
  bbqList,
  bbqUpdate,
  bbqDelete,
  fetchBbq,
} = require("../controllers/bbqController");

router.param("bbqId", async (req, res, next, bbqId) => {
  const bbq = await fetchBbq(bbqId, next);
  if (bbq) {
    req.bbq = bbq;
    next();
  } else {
    const err = new Error("Bbq Not Found");
    err.status = 404;
    next(err);
  }
});
// bbq List
router.get("/", bbqList);

// bbq Create
router.post("/", bbqCreate);

// bbq Update
router.put("/:bbqId", bbqUpdate);

// Bbq Delete
router.delete("/:bbqId", bbqDelete);
module.exports = router;
