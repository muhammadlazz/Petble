import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const authRouter = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
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
 *         description: Registration successful
 *       400:
 *         description: Email already exists or missing fields
 */
// POST: Register user baru
authRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registrasi berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Kesalahan server", error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
// POST: Login user
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Kredensial tidak valid" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Kesalahan Server", error: error.message });
  }
});

/**
 * @swagger
 * /api/auth/add-friend:
 *   post:
 *     summary: Add a new friend for a premium user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               friendName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *       403:
 *         description: Only premium users can add friends
 *       500:
 *         description: Failed to add friend
 */
// POST: Add friend
authRouter.post("/add-friend", authMiddleware, async (req, res) => {
  try {
    const { friendName } = req.body;
    const userId = req.user.id; // Didapat dari middleware authMiddleware

    if (!friendName || friendName.trim() === "") {
      return res.status(400).json({ message: "Nama teman tidak boleh kosong" });
    }

    // Ambil user dari database
    const user = await User.findById(userId);

    if (!user.isPremium) {
      return res.status(403).json({ message: "Hanya pengguna Premium yang dapat menambahkan teman" });
    }

    // Tambahkan teman ke daftar teman user
    user.friends.push(friendName);
    await user.save();

    res.status(200).json({ message: "Teman berhasil ditambahkan", friends: user.friends });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan teman", error: error.message });
  }
});

export default authRouter;
