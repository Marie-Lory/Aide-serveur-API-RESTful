const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

/* ======================
   MIDDLEWARES
====================== */
app.use(cors({
  origin: "*",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ======================
   CONNEXION MONGODB
====================== */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connecté à MongoDB Atlas"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

/* ======================
   ROUTES API
====================== */
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes);
app.use('/api/catways/:id/reservations', reservationRoutes);

/* ======================
   ENDPOINT DE TEST
====================== */
app.get('/', (req, res) => {
  res.json({
    status: 'API OK',
    message: 'Backend opérationnel',
  });
});

/* ======================
   GESTION DES ERREURS
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

/* ======================
   LANCEMENT SERVEUR
====================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur API démarré sur le port ${PORT}`)
);
