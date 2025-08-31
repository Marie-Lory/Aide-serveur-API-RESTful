const catwayService = require("../services/catwayService");

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

exports.createCatway = async (req, res) => {
    try {
        const catway = await catwayService.createCatway(req.body);
        res.status(201).json(catway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCatway = async (req, res) => {
    const catway = await catwayService.patchCatway(req.params.id, req.body);
    try {
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
};

exports.patchCatway = async (req, res) => {
    const catway = await catwayService.patchCatway(req.params.id, req.body);
    try {
        if (!catway)
            return res.status(404).json({ message: "Catway introuvable" });
        res.json(catway);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
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
