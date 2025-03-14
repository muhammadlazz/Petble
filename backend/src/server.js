import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // Pastikan ada ekstensi .js

// Load environment variables
dotenv.config();

// Koneksi ke MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend Petble berjalan!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
