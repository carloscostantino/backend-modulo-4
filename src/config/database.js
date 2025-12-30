const { Sequelize } = require("sequelize");// Importamos Sequelize
require("dotenv").config();   // Cargamos variables de entorno

// Creamos la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false // evita que muestre logs SQL
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
