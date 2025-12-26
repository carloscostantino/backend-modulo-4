const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/database");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(express.json());

// Conectar BD
connectDB();

// Rutas
app.use("/api/auth", authRoutes);

// Ruta test
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = app;
