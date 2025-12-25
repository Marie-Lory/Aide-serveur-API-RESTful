const express = require('express');
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config(); // ✅ IMPORTANT

const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userModel = require('./models/userModel');

const app = express();

/* ======================
   MIDDLEWARES GLOBAUX
====================== */
app.use(cors({
  origin: "*", // OK pour le développement
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ======================
   TEMPLATE ENGINE (EJS)
====================== */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* ======================
   CONNEXION MONGODB ATLAS
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
   FICHIERS STATIQUES
====================== */
app.use(express.static('public'));

/* ======================
   PAGE D'ACCUEIL (EJS)
====================== */
app.get('/', async (req, res) => {
  try {
    const users = await userModel.find();
    res.render('index', { users });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur');
  }
});

/* ======================
   GESTION DES ERREURS
====================== */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

/* ======================
   LANCEMENT DU SERVEUR
====================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Serveur API démarré sur le port ${PORT}`)
);
