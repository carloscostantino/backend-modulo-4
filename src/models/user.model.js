// requerimos la librería DataTypes de Sequelize y la conexión a la base de datos
const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

// Definimos el modelo Usuario
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

//Al borrar un usuario borrar sus tareas.
const Task = require("./task.model");

// Definimos la relación entre User y Task
User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });// Un usuario puede tener muchas tareas
Task.belongsTo(User, { foreignKey: "userId" });   // Una tarea pertenece a un único usuario


module.exports = User;
