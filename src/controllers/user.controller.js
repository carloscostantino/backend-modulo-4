const User = require("../models/user.model");

// ======================
// VER USUARIO LOGUEADO
// ======================
const getProfile = async (req, res) => {
  try {
    const user = req.user;// Usuario obtenido del middleware de autenticación

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
// Actualiza el perfil del usuario logueado, se puede cambiar nombre, email y contraseña
const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    if (password) {
      const bcrypt = require("bcrypt");
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();// Guardamos los cambios
    
// Respuesta con el usuario actualizado
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
const deleteUser = async (req, res) => {
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

module.exports = {
  getProfile,
  updateUser,
  deleteUser
};
