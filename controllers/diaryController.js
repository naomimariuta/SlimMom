const Diary = require("../models/DIary");

exports.addProductToDiary = async (req, res) => {
  try {
    const { date, productId, quantity } = req.body;
    let diaryEntry = await Diary.findOne({ userId: req.user.userId, date });
    if (!diaryEntry) {
      diaryEntry = new Diary({ userId: req.user.userId, date, products: [] });
    }
    diaryEntry.products.push({ productId, quantity });
    await diaryEntry.save();
    res.json(diaryEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductFromDiary = async (req, res) => {
  try {
    const { date, productId } = req.body;
    let diaryEntry = await Diary.findOne({ userId: req.user.userId, date });
    if (!diaryEntry) return res.status(404).json({ message: "No entry found" });
    diaryEntry.products = diaryEntry.products.filter(
      (p) => p.productId.toString() !== productId
    );
    await diaryEntry.save();
    res.json(diaryEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiaryEntry = async (req, res) => {
  try {
    const { date } = req.params;
    const diaryEntry = await Diary.findOne({
      userId: req.user.userId,
      date,
    }).populate("products.productId");
    if (!diaryEntry) return res.status(404).json({ message: "No entry found" });
    res.json(diaryEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
