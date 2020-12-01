const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { burgerCreate, burgerList } = require("../controllers/burgerController");

const { bbqCreate } = require("../controllers/bbqController");
// burger List
router.get("/", burgerList);

// bbq Create
router.post("/:burgerId/bbqs", upload.single("image"), bbqCreate);

// burger Create
router.post("/", upload.single("image"), burgerCreate);
module.exports = router;
