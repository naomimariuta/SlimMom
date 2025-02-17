const Diary = require("../models/Diary");
const Product = require("../models/Product");
const mongoose = require("mongoose");

exports.addProductToDiary = async (req, res) => {
  try {
    const { title, quantity, date } = req.body;
    const { userId } = req.user;

    // Găsește produsul după titlu
    const title2 = "Amaranth";
    console.log(title);
    const product = await Product.findOne({ title });
    const product2 = await Product.findOne({ title2 });
    console.log(product2._id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Caută intrarea în jurnal pentru acea dată
    let diaryEntry = await Diary.findOne({ userId, date });

    if (!diaryEntry) {
      diaryEntry = new Diary({
        userId,
        date,
        products: [{ productId: product._id, quantity }],
      });
    } else {
      // Verificăm dacă produsul există deja în jurnal
      const existingProductIndex = diaryEntry.products.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );

      if (existingProductIndex >= 0) {
        diaryEntry.products[existingProductIndex].quantity += quantity;
      } else {
        diaryEntry.products.push({ productId: product._id, quantity });
      }
    }

    await diaryEntry.save();
    res.status(200).json({ message: "Product added to diary successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Șterge un produs din jurnalul utilizatorului
exports.deleteProductFromDiary = async (req, res) => {
  try {
    const { productId, date } = req.body; // Produsul și data
    const { userId } = req.user; // Id-ul utilizatorului din token

    const diaryEntry = await Diary.findOne({ userId, date });

    if (!diaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    // Căutăm produsul în lista de produse
    const productIndex = diaryEntry.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found in diary" });
    }

    // Ștergem produsul
    diaryEntry.products.splice(productIndex, 1);
    await diaryEntry.save();

    res.status(200).json({ message: "Product removed from diary" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obține informațiile din jurnalul utilizatorului pentru o anumită zi
exports.getDiaryEntry = async (req, res) => {
  try {
    const { date } = req.params; // Data
    const { userId } = req.user; // Id-ul utilizatorului din token

    const diaryEntry = await Diary.findOne({ userId, date }).populate(
      "products.productId"
    );

    if (!diaryEntry) {
      return res.status(404).json({ message: "Diary entry not found" });
    }

    res.status(200).json(diaryEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
