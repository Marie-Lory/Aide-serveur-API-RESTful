const userService = require("../services/userService");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: "Email introuvable" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUserByEmail = async (req, res) => { 
    try { 
      const data = req.body || {}; 
      const user = await userService.updateUserByEmail(req.params.email, data); 
      if (!user) { return res.status(404).json({ message: "Email introuvable" }); 
    } 
    res.json(user); 
  } catch (error) { 
    res.status(500).json({ message: "Erreur serveur", error: error.message }); 
  } 
};

exports.patchUserByEmail = async (req, res) => { 
    try { 
      const data = req.body || {}; 
      const user = await userService.patchUserByEmail(req.params.email, data); 
      if (!user) return res.status(404).json({ message: "Utilisateur introuvable" }); 
      res.json(user); } catch (error) { res.status(500).json({ message: "Erreur serveur", error: error.message }); 
    } 
};

exports.deleteUserByEmail = async (req, res) => { 
  try { 
    const user = await userService.deleteUserByEmail(req.params.email); 
    if (!user) { 
      return res.status(404).json({ message: "Email introuvable" }); 
    } 
    res.status(204).send(); 
  } catch (error) { 
    res.status(500).json({ message: "Erreur serveur", error: error.message }); 
  } 
};