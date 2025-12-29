const app = require("./src/app"); // Importamos la app de express
const { sequelize } = require("./src/config/database"); // Importamos la conexión a la base de datos

// IMPORTAMOS LOS MODELOS
require("./src/models/user.model");
require("./src/models/task.model");


const PORT = process.env.PORT || 3000;// Puerto del servidor

// Sincronizamos los modelos con la base de datos y luego iniciamos el servidor

sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Base de datos sincronizada");
// Iniciamos el servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});
