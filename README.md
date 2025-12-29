API REST – Backend (Node.js, Express, MySQL)

Este proyecto corresponde al Trabajo Práctico del Módulo Backend, donde se desarrolla una API RESTful que permite gestionar usuarios y tareas, con autenticación mediante JWT.

🚀 Tecnologías utilizadas

Node.js

Express

MySQL

Sequelize (ORM)

JWT (Json Web Token)

bcrypt

dotenv

📂 Estructura del proyecto
backend-modulo-4/
│
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   └── task.controller.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── task.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   └── task.routes.js
│   └── app.js
│
├── index.js
├── .env
├── .gitignore
└── README.md

🗄️ Base de datos

Motor: MySQL

ORM: Sequelize

Base de datos: backend_modulo4

Tablas:

users

tasks

Relación:

Un usuario puede tener muchas tareas.

⚙️ Instalación
1️⃣ Clonar repositorio
git clone https://github.com/TU_USUARIO/backend-modulo-4.git
cd backend-modulo-4

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crear archivo .env:

PORT=3000
DB_NAME=backend_modulo4
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
JWT_SECRET=clave_super_secreta

▶️ Ejecutar el proyecto
npm run dev


El servidor se iniciará en:

http://localhost:3000

🔐 Autenticación

El sistema utiliza JWT para proteger rutas privadas.

El token debe enviarse en el header:

Authorization: Bearer TU_TOKEN

🔑 Endpoints
🟢 Autenticación
Registrar usuario
POST /api/auth/register


Body:

{
  "name": "Carlos",
  "email": "carlos@test.com",
  "password": "123456"
}

Login
POST /api/auth/login


Respuesta:

{
  "token": "JWT_TOKEN"
}

👤 Usuario (Protegido)
Obtener perfil
GET /api/users/me

Actualizar usuario
PUT /api/users/me

Eliminar usuario
DELETE /api/users/me

📝 Tareas (Protegido)
Crear tarea
POST /api/tasks

{
  "title": "Estudiar Node",
  "description": "Repasar JWT y middleware"
}

Obtener tareas
GET /api/tasks

Actualizar tarea
PUT /api/tasks/:id

{
  "completed": true
}

Eliminar tarea
DELETE /api/tasks/:id

🔐 Seguridad

Contraseñas encriptadas con bcrypt

Autenticación con JWT

Rutas protegidas por middleware

📹 Video explicativo

El video muestra:

Estructura del proyecto

Funcionamiento de la API

Pruebas con Postman

Autenticación y CRUD

✅ Estado del proyecto

✔ API REST funcional
✔ Autenticación segura
✔ CRUD completo
✔ Listo para entrega

🧠 Resumen mental rápido
Cliente → Ruta → Middleware → Controller → Modelo → DB

✨ Autor

Carlos Costantino
Trabajo práctico – Módulo Backend