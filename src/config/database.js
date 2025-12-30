//require("dotenv").config();   // Cargamos variables de entorno cuando trabajo localmente
const { Sequelize } = require("sequelize"); // Importamos Sequelize

// Creamos la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    dialect: "mysql",
  }
);


// Función para probar conexión
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Devuelve una Promesa. por eso utilizamos await para que el código no se siga ejecutando.
    console.log("✅ Conectado a la base de datos");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
};

module.exports = { sequelize, connectDB };
