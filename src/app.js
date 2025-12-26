const express = require("express");
require("dotenv").config();

const { connectDB } = require("./config/database");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = app;
