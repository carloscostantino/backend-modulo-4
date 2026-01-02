import 'dotenv/config'; // Cargar variables de entorno
import app from "./src/app.js"; // Importamos la aplicación de express
import { sequelize } from "./src/config/database.js"; // Importamos la conexión a la base de datos


// IMPORTAMOS LOS MODELOS
import "./src/models/user.model.js";
import "./src/models/task.model.js";


const PORT = process.env.PORT || 3000;// Puerto del servidor

// Sincronizamos los modelos con la base de datos y luego iniciamos el servidor

sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Base de datos sincronizada");
// Iniciamos el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});
