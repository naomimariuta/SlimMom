const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  category: { type: String, required: true },
  notAllowed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Product", productSchema);
