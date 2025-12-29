const Task = require("../models/task.model");

// ======================
// CREAR TAREA
// ======================
const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "El título es obligatorio" });
    }

    const task = await Task.create({
      title,
      description,
      userId: req.user.id// Asignar la tarea al usuario logueado
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

// ======================
// OBTENER TAREAS DEL USUARIO
// ======================
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({// Obtener todas las tareas del usuario logueado
      where: { userId: req.user.id }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener tareas" });
  }
};

// ======================
// ACTUALIZAR TAREA
// ======================
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }// Asegurarse que la tarea pertenece al usuario logueado
    });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

// Actualizar campos si se proporcionan
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar tarea" });
  }
};

// ======================
// ELIMINAR TAREA
// ======================
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id, userId: req.user.id }// Asegurarse que la tarea pertenece al usuario logueado
    });

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    await task.destroy();

    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};
