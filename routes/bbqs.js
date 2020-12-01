const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
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

// bbq Update
router.put("/:bbqId", upload.single("image"), bbqUpdate);

// Bbq Delete
router.delete("/:bbqId", bbqDelete);
module.exports = router;
