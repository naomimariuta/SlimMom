const Product = require("../models/Product");

exports.getDailyIntake = async (req, res) => {
  try {
    const products = await Product.find({ notAllowed: true });
    res.json({
      dailyCalories: req.user.dailyCalories,
      forbiddenProducts: products,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const products = await Product.find({ title: new RegExp(query, "i") });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
