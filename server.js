const app = require("./app");
app.listen(3000, () => {
  console.log("Server is running.");
});

// const crypto = require("crypto");

// // Funcție pentru a genera o cheie secretă
// function generateSecret() {
//   return crypto.randomBytes(32).toString("base64");
// }

// // Generează un secret pentru JWT
// const JWT_SECRET = generateSecret();
// const REFRESH_TOKEN_SECRET = generateSecret();

// console.log("JWT_SECRET:", JWT_SECRET);
// console.log("REFRESH_TOKEN_SECRET:", REFRESH_TOKEN_SECRET);
