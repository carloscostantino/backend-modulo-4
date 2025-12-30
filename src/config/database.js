const { Sequelize } = require("sequelize");
require("dotenv").config();

// Soporte para dos modos de configuración:
// 1) Variables separadas: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
// 2) Variable única: DATABASE_URL (ej: mysql://user:pass@host:port/dbname)
// Opcional: activar SSL si el proveedor lo requiere: DB_SSL=true

let sequelize;

if (process.env.DATABASE_URL) {
  // Cuando Railway u otro proveedor expone una URL de conexión
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "mysql",
    dialectOptions: process.env.DB_SSL === "true" ? { ssl: { rejectUnauthorized: false } } : {},
    logging: false,
  });
} else {
  // Configuración por partes (útil para desarrollo local)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
      dialect: "mysql",
      dialectOptions: process.env.DB_SSL === "true" ? { ssl: { rejectUnauthorized: false } } : {},
      logging: false,
    }
  );
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();

    if (process.env.DATABASE_URL) {
      console.log("✅ Conectado a la base de datos (DATABASE_URL)");
    } else {
      console.log(`✅ Conectado a la base de datos ${process.env.DB_NAME} @ ${process.env.DB_HOST}:${process.env.DB_PORT || 'default'}`);
    }
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    // Para debugging puedes descomentar la línea siguiente (no comitear credenciales):
    // console.error(error);
  }
};

module.exports = { sequelize, connectDB };
