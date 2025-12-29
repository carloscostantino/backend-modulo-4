// requerimos la librería DataTypes de Sequelize y la conexión a la base de datos
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Definimos el modelo Tarea
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

module.exports = Task;
