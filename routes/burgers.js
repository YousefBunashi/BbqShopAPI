const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const {
  burgerCreate,
  burgerList,
  fetchBurger,
} = require("../controllers/burgerController");

// burger List
router.get("/", burgerList);

// burger Create
router.post("/", upload.single("image"), burgerCreate);
module.exports = router;
