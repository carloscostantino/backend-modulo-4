import 'dotenv/config';
import app from "./src/app.js";
import { sequelize, connectDB } from "./src/config/database.js";

import "./src/models/user.model.js";
import "./src/models/task.model.js";

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB();

  await sequelize.sync({ alter: true });
  console.log("📦 Base de datos sincronizada");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
})();
