const userService = require('../services/userService');
const catwayService = require('../services/catwayService');

exports.createCatway = async (req, res) => {
  try {
    const { user } = req.body;

    const existingUser = await userService.getUserById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "Utilisateur inexistant" });
    }

    const catway = await catwayService.createCatway(req.body);
    res.status(201).json(catway);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCatways = async (req, res) => {
    const catways = await catwayService.getAllCatways();
    try {
        res.json(catways);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.getCatwayById = async (req, res) => {
    const catway = await catwayService.getCatwayById(req.params.id);
    try {
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.updateCatway = async (req, res) => {
  try {
    const { userEmail, ...catwayData } = req.body;

    if (!userEmail) {
      return res.status(400).json({ message: "userEmail requis" });
    }

    const user = await userService.getUserByEmail(userEmail);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    const catway = await catwayService.updateCatway(req.params.id, {
      ...catwayData,
      user: user._id
    });

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patchCatway = async (req, res) => {
  try {
    const { userEmail, ...data } = req.body;

    if (userEmail) {
      const user = await userService.getUserByEmail(userEmail);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
      data.user = user._id;
    }

    const catway = await catwayService.patchCatway(req.params.id, data);
    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    res.json(catway);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCatway = async (req, res) => {
    console.log("ID reçu :", req.params.id);
    const catway = await catwayService.deleteCatway(req.params.id);
    try {
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
    
};
