const express = require("express"); // Importar express
require("dotenv").config();// Cargar variables de entorno

// Importar la función para conectar a la base de datos
const { connectDB } = require("./config/database");

// Importar las rutas
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/task.routes");


const app = express();// Crear la aplicación de express

// Middleware Middleware global para parsear JSON. Permite leer JSON en el body de las requests.
app.use(express.json());

connectDB();

// Definir las rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);


app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

module.exports = app;
