import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js"; // Pastikan path benar

dotenv.config();

const app = express();
app.use(express.json());

// Endpoint untuk tes server
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Gunakan router untuk users
app.use("/api/users", userRoutes);

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB Connection Error:", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
