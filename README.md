# API REST - Módulo Backend

API REST desarrollada con Node.js, Express, Sequelize y MySQL.
Incluye autenticación con JWT y operaciones CRUD de usuarios.

## 🚀 Tecnologías usadas
- Node.js
- Express
- MySQL
- Sequelize
- JWT
- bcrypt

## 📦 Instalación

```bash
npm install

▶️ Ejecución
npm run dev

🔐 Endpoints
Registro

POST /api/auth/register

Login

POST /api/auth/login

Usuario (requiere token)

GET /api/users/me
PUT /api/users/me
DELETE /api/users/me

🔑 Autenticación

Usar el token en el header:

Authorization: Bearer TU_TOKEN