const app = require("./src/app");
const { sequelize } = require("./src/config/database");

// IMPORTAMOS LOS MODELOS
require("./src/models/user.model");

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log("📦 Base de datos sincronizada");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
});
