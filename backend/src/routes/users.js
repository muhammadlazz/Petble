import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Jangan tampilkan password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Registrasi berhasil", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
