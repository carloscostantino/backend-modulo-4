import express from "express";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Importar la conexión a la base de datos
import { connectDB } from "./config/database.js";

// Importar las rutas
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

// Middleware
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API funcionando correctamente" });
});

export default app;
