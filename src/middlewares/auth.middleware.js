import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware de autenticación
const authMiddleware = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Acceso denegado. Token no proporcionado"
      });
    }

    // Formato esperado: "Bearer TOKEN"
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

    // Guardar usuario en la request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido o expirado"
    });
  }
};

export default authMiddleware;
