//Untuk pengelolaan profil dan pertemanan
import express from "express";
import User from "../models/user.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Protected)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a list of users (without passwords)
 *       401:
 *         description: Unauthorized, missing or invalid token
 */
// GET: Ambil semua user (Protected route)
userRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Kesalahan server", error: error.message });
  }
});

/**
 * @swagger
 * /api/users/update-profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               gender:
 *                 type: string
 *               interest:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

// Update profil user (Protected)
// Update profil user (Protected)
// Update profil user (Protected)
userRouter.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { bio, gender, interest } = req.body;
    const userId = req.user?.id; // Ambil user ID dari token

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: req.user tidak ditemukan" });
    }

    // Cari user berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Update hanya jika ada perubahan (tidak wajib kirim semua field)
    if (bio !== undefined) user.bio = bio;
    if (gender !== undefined) user.gender = gender;
    if (interest !== undefined) user.interest = interest;

    await user.save(); // Simpan perubahan

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(" Error updating profile:", error);
    res.status(500).json({ message: "Kesalahan server", error: error.message });
  }
});

/**
 * @swagger
 * /api/users/add-friend:
 *   post:
 *     summary: Add a friend
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               friendId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully
 *       400:
 *         description: Already friends
 *       403:
 *         description: Free users can only have up to 5 friends
 *       404:
 *         description: User or friend not found
 */

// Tambah teman
userRouter.post("/add-friend", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Gunakan ID dari token
    const { friendId } = req.body;

    if (!friendId) {
      return res.status(400).json({ message: "friendId harus disertakan" });
    }

    if (userId === friendId) {
      return res.status(400).json({ message: "Kamu tidak bisa menambahkan diri sendiri sebagai teman" });
    }

    // Cari user dan teman dalam satu query
    const [user, friend] = await Promise.all([
      User.findById(userId).lean(),
      User.findById(friendId).lean(),
    ]);

    if (!user || !friend) {
      return res.status(404).json({ message: "User atau teman tidak ditemukan" });
    }

    // Periksa batas teman untuk pengguna gratis
    if (!user.isPremium && user.friends.length >= 5) {
      return res.status(403).json({ message: "Pengguna gratis hanya dapat memiliki maksimal 5 teman" });
    }

    // Periksa apakah sudah berteman
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Sudah berteman" });
    }

    // Tambahkan pertemanan secara dua arah (mutual friends)
    await Promise.all([
      User.findByIdAndUpdate(userId, { $push: { friends: friendId } }),
      User.findByIdAndUpdate(friendId, { $push: { friends: userId } }),
    ]);

    // Ambil daftar teman terbaru
    const updatedUser = await User.findById(userId).populate("friends", "username bio gender interest");

    return res.status(200).json({ message: "Teman berhasil ditambahkan", friends: updatedUser.friends });
  } catch (error) {
    console.error(" Error menambahkan teman:", error);
    return res.status(500).json({ message: "Kesalahan server", error: error.message });
  }
});

export default userRouter;