import bcrypt from "bcrypt";
import User from "../models/user.model.js";

// ======================
// VER USUARIO LOGUEADO
// ======================
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Usuario obtenido del middleware

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuario"
    });
  }
};

// ======================
// ACTUALIZAR USUARIO
// ======================
export const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: "Usuario actualizado correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar usuario"
    });
  }
};

// ======================
// ELIMINAR USUARIO
// ======================
export const deleteUser = async (req, res) => {
  try {
    await req.user.destroy();

    res.json({
      message: "Usuario eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar usuario"
    });
  }
};
