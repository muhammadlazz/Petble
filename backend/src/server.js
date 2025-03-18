import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import swaggerDocs from "./swagger.js";
import path from "path";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

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
app.use("/api/auth", authRoutes);

// ✅ Chatbot Responses
const responses = [
  { keywords: ["halo", "hi", "hai", "hay"], reply: "Halo! Ada yang bisa saya bantu?" },
  { keywords: ["buat akun", "daftar akun", "registrasi"], reply: "Untuk membuat akun, silakan klik tombol 'Daftar' di halaman utama dan isi data yang diperlukan." },
  { keywords: ["lupa password", "reset password"], reply: "Jika Anda lupa password, klik 'Lupa Password' di halaman login untuk meresetnya." },
  { keywords: ["hapus akun", "delete account"], reply: "Anda bisa menghapus akun melalui menu 'Pengaturan Akun'. Perlu bantuan lebih lanjut? Hubungi tim support kami." },
  { keywords: ["premium", "akun premium"], reply: "Akun premium memberikan akses ke fitur eksklusif. Anda bisa berlangganan melalui menu 'Langganan Premium'." }
];
io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  socket.on("chatMessage", (message) => {
    console.log(`📩 Pesan diterima dari ${socket.id}:`, message); // Debug

    let reply = "Saya tidak mengerti. Silakan hubungi CS 085xxxxx";
    const foundResponse = responses.find(item =>
      item.keywords.some(keyword => message.toLowerCase().includes(keyword))
    );

    if (foundResponse) {
      reply = foundResponse.reply;
    }

    console.log(`🤖 Balasan chatbot ke ${socket.id}:`, reply); // Debug sebelum emit

    // Kirim balasan ke user tertentu
    io.to(socket.id).emit("chatReply", reply);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});


// ✅ Dokumentasi Swagger
swaggerDocs(app);

// ✅ Endpoint Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

console.log("Swagger Path:", path.resolve("./routes/*.js"));

// ✅ Jalankan Server
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
