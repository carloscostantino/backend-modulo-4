const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/database");

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = app;
