// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.js"; // ✅ Import routes dengan benar
// import swaggerDocs from "./swagger.js";


// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// console.log("✅ Server setup is successful"); // Tambahkan di sini

// // Koneksi ke MongoDB Atlas
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Routes
// app.use("/api/auth", authRoutes); // ✅ Pastikan ini ada di server.js, bukan di auth.js

// // Dokumentasi Swagger (⚡ Diletakkan setelah inisialisasi `app`)
// swaggerDocs(app);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// import path from "path";
// console.log("Swagger Path:", path.resolve("./routes/*.js"));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // ✅ Pastikan file ini ada
import swaggerDocs from "./swagger.js";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Koneksi ke MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

console.log("✅ Server setup is successful");

// ✅ API Routes
app.use("/api/auth", authRoutes); // Pastikan auth.js ada di folder routes

// ✅ Chatbot Responses
const responses = [
  { keywords: ["halo", "hi", "hai", "hay"], reply: "Halo! Ada yang bisa saya bantu?" },
  { keywords: ["buat akun", "daftar akun", "registrasi"], reply: "Untuk membuat akun, silakan klik tombol 'Daftar' di halaman utama dan isi data yang diperlukan." },
  { keywords: ["lupa password", "reset password"], reply: "Jika Anda lupa password, klik 'Lupa Password' di halaman login untuk meresetnya." },
  { keywords: ["hapus akun", "delete account"], reply: "Anda bisa menghapus akun melalui menu 'Pengaturan Akun'. Perlu bantuan lebih lanjut? Hubungi tim support kami." },
  { keywords: ["premium", "akun premium"], reply: "Akun premium memberikan akses ke fitur eksklusif. Anda bisa berlangganan melalui menu 'Langganan Premium'." }
];

// ✅ Endpoint Chatbot
app.post("/chat", (req, res) => {
  console.log("Request diterima:", req.body);
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ reply: "Pesan tidak boleh kosong." });
  }

  let reply = "Saya tidak mengerti. Silakan hubungi CS 085xxxxx";

  const foundResponse = responses.find(item =>
    item.keywords.some(keyword => message.toLowerCase().includes(keyword))
  );

  if (foundResponse) {
    reply = foundResponse.reply;
  }

  console.log("Balasan chatbot:", reply);
  res.json({ reply });
});

// ✅ Dokumentasi Swagger
swaggerDocs(app);

// ✅ Endpoint Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("Swagger Path:", path.resolve("./routes/*.js"));

// ✅ Jalankan Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
