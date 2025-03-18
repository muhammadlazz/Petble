// middleware/authMiddleware.js - Middleware untuk verifikasi token JWT
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Ambil token dari header
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Cari user berdasarkan ID dalam token
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Token valid tetapi user tidak ditemukan" });
      }
      
      // Tambahkan informasi user ke req object
      req.user = { id: user._id };
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token tidak valid" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kesalahan server pada middleware auth" });
  }
};

export default authMiddleware;