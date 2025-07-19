const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bcrypt = require('bcrypt'); // Si vous utilisez bcrypt pour le hash des mots de passe
const path = require('path');

const indexRouter = require('./routes/index');
const mongodb = require('./db/mongo');

mongodb.initClientDbConnection()

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(cors({
  exposedHeaders: ['Authorization'],
  origin: '*'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware pour charger l'utilisateur à partir du cookie de session
app.use(async (req, res, next) => {
  const sessionId = req.cookies.sessionId;
  if (sessionId) {
    try {
      const User = require('./models/user').User;
      const user = await User.findById(sessionId);
      if (user) {
        req.sessionUser = user.email; // ou stocker tout l'objet utilisateur
      } else {
        req.sessionUser = null;
      }
    } catch (err) {
      req.sessionUser = null;
    }
  } else {
    req.sessionUser = null;
  }
  next();
});

const fetch = require('node-fetch');



// CRUD pour utilisateurs
// Route GET pour /users, retourne une liste JSON d'utilisateurs
app.get('/users', async (req, res) => {
  try {
    const User = require('./models/user').User;
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
});

// Route GET pour /users/:email
app.get('/users/:email', async (req, res) => {
  const email = req.params.email;
  
  try {
    // Supposons que vous avez un modèle User avec une méthode findOne
    const user = await require('./models/user').User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route POST pour /users
app.post('/users', (req, res) => {
  // Récupérer les données envoyées dans le corps de la requête
  const userData = req.body;

  // Vérifier si des données ont été envoyées
  if (Object.keys(userData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée' });
  }

  // Renvoyer les clés et valeurs
  res.json(userData);
});

// Route PUT pour /users/:email
app.put('/users/:email', async (req, res) => {
  const email = req.params.email;
  const updateData = req.body;

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée pour mise à jour' });
  }

  try {
    // Mise à jour ou création de l'utilisateur
    const updatedUser = await require('./models/user').User.findOneAndUpdate(
      { email: email },
      updateData,
      { new: true, upsert: true } // upsert crée si non existant
    );
    res.json({
      message: "Utilisateur mis à jour ou créé via PUT",
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route DELETE pour /users/:email
app.delete('/users/:email', async (req, res) => {
  const email = req.params.email;

  try {
    // Supposons que vous avez un modèle User avec une méthode deleteOne
    const result = await require('./models/user').User.deleteOne({ email: email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: `Utilisateur avec email ${email} supprimé` });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Page d'accueil
app.get('/views/home', (req, res) => {
  res.render('home', { user: req.sessionUser });
});

// Dashboard
app.get('/views/dashboard', async (req, res) => {
  if (!req.sessionUser) {
    return res.redirect('/'); // ou /login si vous avez une page login
  }

  try {
    const User = require('./models/user').User;
    const Reservation = require('./models/user').Reservation;

    const user = await User.findOne({ email: req.sessionUser });
    const reservations = await Reservation.find({ /* critère si besoin */ });

    res.render('dashboard', {
      user,
      dateJour: new Date().toLocaleDateString(),
      reservations
    });
  } catch (err) {
    console.error('Erreur dans /views/dashboard:', err);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour /login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  try {
    const UserModel = require('./models/user').User;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    res.cookie('sessionId', user._id, { httpOnly: true, maxAge: 3600000 });
    res.json({ message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route GET pour /logout
app.get('/logout', (req, res) => {
  res.clearCookie('sessionId');
  res.redirect('/'); // Redirige vers la page index.ejs
});

// CRUD pour catways
// Route GET pour /catways, retourne une liste JSON d'utilisateurs
app.get('/catways', async (req, res) => {
  try {
    const Catways = require('./models/user').Catways;
    const catways = await Catways.find();
    res.json(catways);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
});

// Route GET pour récupérer une catway par son catwayNumber
app.get('/catways/:id', async (req, res) => {
  const catwayId = req.params.id; // Récupère l'id dans l'URL

  try {
    const catway = await require('./models/user').Catways.findOne({ catwayNumber: catwayId });
    if (!catway) {
      return res.status(404).json({ message: 'Catway ID non trouvée' });
    }
    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

// Route POST pour /catways
app.post('/catways', (req, res) => {
  // Récupérer les données envoyées dans le corps de la requête
  const catwaysData = req.body;

  // Vérifier si des données ont été envoyées
  if (Object.keys(catwaysData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée' });
  }

  // Renvoyer les clés et valeurs
  res.json(catwaysData);
});

// Ajoutez cette route PUT
app.put('/catways/:id', (req, res) => {
  const catwaysData = req.body;
  if (Object.keys(catwaysData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée pour mise à jour' });
  }
  // Pour l'exemple, on renvoie simplement les données reçues
  res.json({
    message: "catways ajouté ou mis à jour via PUT",
    catways: catwaysData
  });
});

// Nouvelle route DELETE pour /catways/:id
app.delete('/catways/:id', (req, res) => {
  // Supposons que l'identifiant du catway à supprimer soit passé dans le corps de la requête
  const { catwayId } = req.body;

  if (!catwayId) {
    return res.status(400).json({ message: 'Identifiant utilisateur manquant' });
  }
  // Pour l'instant, on retourne un message simulant la suppression
  res.json({ message: `Suppression simulée de l'utilisateur avec ID ${catwayId}` });
});

// CRUD pour réservations
app.get('/catways/:id/reservations', async (req, res) => {
  try {
    const Reservation = require('./models/user').Reservation;
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
});

// Route GET pour récupérer une réservation par son catwayNumber
app.get('/catways/:id/reservations/:idReservation', async (req, res) => {
  const reservationsId = req.params.id; // Récupère l'id dans l'URL

  try {
    const reservations = await require('./models/user').Catways.findOne({ catwayNumber: reservationsId });
    if (!reservations) {
      return res.status(404).json({ message: 'Reservation ID non trouvée' });
    }
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});



// Route POST pour /catways/:id/reservations'
app.post('/catways/:id/reservations', (req, res) => {
  // Récupérer les données envoyées dans le corps de la requête
  const reservationsData = req.body;

  // Vérifier si des données ont été envoyées
  if (Object.keys(reservationsData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée' });
  }

  // Renvoyer les clés et valeurs
  res.json(reservationsData);
});

// Ajoutez cette route PUT
app.put('/catways/:id/reservations', (req, res) => {
  const reservationsData = req.body;
  if (Object.keys(reservationsData).length === 0) {
    return res.status(400).json({ message: 'Aucune donnée envoyée pour mise à jour' });
  }
  // Pour l'exemple, on renvoie simplement les données reçues
  res.json({
    message: "catways ajouté ou mis à jour via PUT",
    reservations: reservationsData
  });
});

// Nouvelle route DELETE pour /catway/:id/reservations/:idReservation
app.delete('/catway/:id/reservations/:idReservation', (req, res) => {
  // Supposons que l'identifiant de la reservation à supprimer soit passé dans le corps de la requête
  const { reservationsId } = req.body;

  if (!reservationsId) {
    return res.status(400).json({ message: 'Identifiant utilisateur manquant' });
  }
  // Pour l'instant, on retourne un message simulant la suppression
  res.json({ message: `Suppression simulée de l'utilisateur avec ID ${reservationsId}` });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);

app.use(function(req, res, next) {
  res.status(404).json({name: 'API', version: '1.0', status: 404, message: 'not_found'})
});



module.exports = app;
