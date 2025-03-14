import express from "express";
import User from "../models/user.js"; // Pastikan ada ekstensi .js

const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json(newUser);
});

export default router;