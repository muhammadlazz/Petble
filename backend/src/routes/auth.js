import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Pastikan ada route GET yang valid
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Ambil semua user dari database
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Endpoint Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek apakah user ada di database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Endpoint untuk Add Friend
router.post("/add-friend", async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    // Cari user yang sedang login
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Periksa apakah user adalah premium
    if (!user.isPremium && user.friends.length >= 5) {
      return res
        .status(403)
        .json({ message: "Free users can only have up to 5 friends." });
    }

    // Cari user yang ingin ditambahkan sebagai teman
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Cek apakah sudah berteman
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    // Tambahkan friend ke list friends
    user.friends.push(friendId);
    await user.save();

    res.status(200).json({ message: "Friend added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
