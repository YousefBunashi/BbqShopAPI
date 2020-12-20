const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  butcheryCreate,
  butcheryList,
} = require("../controllers/butcheryController");

const { bbqCreate } = require("../controllers/bbqController");
const passport = require("passport");
// butchery List
router.get("/", butcheryList);

// bbq Create
router.post(
  "/:butcheryId/bbqs",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  bbqCreate
);

// butchery Create

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  butcheryCreate
);
module.exports = router;
