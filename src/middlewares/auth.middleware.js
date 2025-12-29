const jwt = require("jsonwebtoken");// Librería para manejar JSON Web Tokens
const User = require("../models/user.model");// Importamos el modelo de Usuario

// Middleware de autenticación

const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header. 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Acceso denegado. Token no proporcionado"
      });
    }

    // Formato esperado: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar usuario
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "Usuario no válido"
      });
    }

    // Guardamos el usuario en la request para usarlo en los controladores
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado"
    });
  }
};

module.exports = authMiddleware;
