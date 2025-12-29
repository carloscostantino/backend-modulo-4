const bcrypt = require("bcrypt");// Librería para encriptar contraseñas
const jwt = require("jsonwebtoken");// Librería para manejar JSON Web Tokens
const User = require("../models/user.model");// Importamos el modelo de Usuario

// ======================
// REGISTRO DE USUARIO
// ======================
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica de campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios"
      });
    }

    // Verificamos si el usuario ya existe 
    const userExists = await User.findOne({ where: { email } });// Busca un usuario por email
    if (userExists) {
      return res.status(400).json({
        message: "El usuario ya existe"
      });
    }

    // Encriptamos contraseña. Convierte la contraseña en un hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword    // Guardamos la contraseña encriptada
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al registrar usuario",
      error: error.message
    });
  }
};

// ======================
// LOGIN DE USUARIO
// ======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica de campos obligatorios
    if (!email || !password) {
      return res.status(400).json({
        message: "Email y contraseña son obligatorios"
      });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    // Comparar contraseña, se utiliza await porque es una operación asíncrona
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    // Generar token con el ID del usuario
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,// Clave secreta para firmar el token
      { expiresIn: "1h" } // El token expira en 1 hora
    );

    res.json({
      message: "Login exitoso",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Error en el login",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};
