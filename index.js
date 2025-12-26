// Importamos la app de Express
const app = require("./src/app");

// Puerto desde .env
const PORT = process.env.PORT || 3000;

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
