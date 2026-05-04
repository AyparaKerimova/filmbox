import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import movieRoutes from "./routes/movies.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://filmboxapps.netlify.app/',
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) =>
  res.json({ status: "OK", message: "Filmbox API çalışıyor" }),
);

// MongoDB bağlantısı
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB bağlandı");
    app.listen(process.env.PORT || 3001, () =>
      console.log(
        `🚀 Sunucu http://localhost:${process.env.PORT || 3001} adresinde çalışıyor`,
      ),
    );
  })
  .catch((err) => console.error("❌ MongoDB bağlantı hatası:", err));
