const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getDailyIntake,
  searchProducts,
} = require("../controllers/productController");
const router = express.Router();
router.get("/daily-rate", authMiddleware, getDailyIntake);
router.get("/search", searchProducts);
module.exports = router;
