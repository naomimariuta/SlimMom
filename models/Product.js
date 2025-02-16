const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  notRecommended: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
