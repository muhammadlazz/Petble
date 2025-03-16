import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // ✅ Import routes dengan benar
import swaggerDocs from "./swagger.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

console.log("✅ Server setup is successful"); // Tambahkan di sini

// Koneksi ke MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api/auth", authRoutes);

// Dokumentasi Swagger (⚡ Diletakkan setelah inisialisasi `app`)
swaggerDocs(app);

app.get("/", (req, res) => {
  res.send("API is running...");
});

import path from "path";
console.log("Swagger Path:", path.resolve("./routes/*.js"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
