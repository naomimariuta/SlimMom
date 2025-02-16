require("dotenv").config();
const express = require("express");
const mongoose = require("./config/db");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const diaryRoutes = require("./routes/diaryRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Documentație API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/diary", diaryRoutes);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     console.log("Database connection succesful^_^");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error.message);
//   });

module.exports = app;
