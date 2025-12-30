import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base de datos");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
};
