const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addProductToDiary,
  deleteProductFromDiary,
  getDiaryEntry,
} = require("../controllers/diaryController");
const router = express.Router();
router.post("/add", authMiddleware, addProductToDiary);
router.delete("/delete", authMiddleware, deleteProductFromDiary);
router.get("/:date", authMiddleware, getDiaryEntry);

module.exports = router;
