const express = require('express');
const cors = require("cors");
const path = require('path');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userModel = require('./models/userModel'); // ou le bon chemin
const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Déclaration du motreur de template et du dossier des views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/mon-api', {
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB :', err));

// Middlewares
app.use(express.json()); // Middleware pour lire le JSON
app.use(express.urlencoded({extended: false}));
app.use('/api/users', userRoutes);
app.use('/api/catways', catwayRoutes);
app.use('/api/catways/:id/reservations', reservationRoutes);

// Middleware d'erreur simple (optionnel mais recommandé)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Exploitation du dossier public pour les fichiers statiques (css, images, etc)
app.use(express.static('public'));


// 🆕 Page d'accueil EJS
app.get('/', async (req, res) => {
  try {
    const users = await userModel.find(); // ou find() si Mongo
    res.render('index', { users });
  } catch (err) {
    res.status(500).send('Erreur serveur');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));