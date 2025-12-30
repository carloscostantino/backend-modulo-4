import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a MySQL");
  } catch (error) {
    console.error("❌ Error conectando a la DB:", error);
  }
};

export { sequelize, connectDB };
