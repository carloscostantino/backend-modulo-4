# Copilot / AI agent quick guide for this repo

Short actionable notes to help AI coding agents be immediately productive.

## Quick summary
- Node.js + Express API with MySQL (Sequelize ORM).
- Auth via JWT (token lifetime 1h) and protected routes using `auth.middleware.js`.
- CommonJS modules (`require` / `module.exports`) and Spanish-language response messages.

## Quick start (developer)
- Install: `npm install`
- Dev: `npm run dev` (uses `nodemon`)
- Prod: `npm start` (runs `node index.js`)
- Ensure MySQL is running and the database exists (README suggests `backend_modulo4`).
- Required env vars (create `.env` in repo root):

  PORT=3000
  DB_NAME=backend_modulo4
  DB_USER=root
  DB_PASSWORD=tu_password
  DB_HOST=localhost
  DB_PORT=3306
  JWT_SECRET=clave_super_secreta

## Architecture & important files
- `index.js` — entrypoint: requires `./src/app`, syncs models with `sequelize.sync({ alter: true })`, then starts the server.
- `src/app.js` — configures Express, loads routes and calls `connectDB()`.
- `src/config/database.js` — exports `{ sequelize, connectDB }`; `connectDB()` calls `sequelize.authenticate()`.
- `src/routes/*` — route definitions: `/api/auth`, `/api/users`, `/api/tasks`.
- `src/controllers/*` — controllers implement request logic and JSON responses (Spanish messages).
- `src/middlewares/auth.middleware.js` — verifies `Authorization: Bearer <token>` using `process.env.JWT_SECRET`, attaches `req.user`.
- `src/models/*` — Sequelize models (`User`, `Task`) and association: `User.hasMany(Task, { onDelete: 'CASCADE' })`.

## Key code patterns & conventions
- Use CommonJS (`require`, `module.exports`). Do not convert to ESM without a full repo update.
- Controllers use async/await and return JSON with `message` and data fields; errors use appropriate HTTP status codes.
- Passwords hashed with `bcrypt` (salt rounds = 10).
- JWTs signed in `auth.controller.js`: `{ id: user.id }`, `expiresIn: '1h'`.
- Auth middleware expects header: `Authorization: Bearer <TOKEN>` and sets `req.user` using `User.findByPk`.
- Database setup: repo uses `sequelize.sync({ alter: true })` on start — this mutates tables to match models (convenient for dev; avoid in production unless intentionally migrating).
- Messages and API responses are in Spanish; maintain language consistency when adding messages.

## When modifying or adding endpoints
- Follow existing route structure: Route -> Middleware (if needed) -> Controller -> Model.
- Follow existing response shapes (message + data), and reuse HTTP status codes used elsewhere.
- Keep error messages consistent and in Spanish unless instructed otherwise.
- Add unit/integration tests if adding logic beyond trivial changes (note: repository currently has no test suite).

## Integration & external services
- Requires: MySQL server reachable using env vars above.
- No external API integrations observed.

## Safety notes / Known caveats
- `sequelize.sync({ alter: true })` can be destructive or cause data changes; treat carefully and document changes in PRs.
- No `.env` is checked into repository — ensure secrets are not hard-coded.
- There are no automated tests or CI flows configured; validate changes manually (Postman / curl) and document expected test steps in PR descriptions.

## Useful examples
- Protected request header example:
  `Authorization: Bearer <JWT_TOKEN>`
- Example endpoint to add a task: `POST /api/tasks` with body `{ "title": "Estudiar Node", "description": "Repasar JWT" }`.

---
If anything is missing or you want a different focus (tests, CI, or a stricter style guide), tell me which parts you want expanded or clarified.