import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Definimos el modelo Task
const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Task;
