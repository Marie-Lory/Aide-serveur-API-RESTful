const Catway = require('../models/catwayModel');

exports.getAllCatways = () => {
  return Catway.find();
};

exports.getCatwayById = (id) => {
  return Catway.findById(id);
};

exports.getCatwayByNumber = async (number) => {
  console.log("Recherche catwayNumber =", number, typeof number);

  return Catway.findOne({ catwayNumber: Number(number) });
};

exports.createCatway = (data) => {
  const catway = new Catway(data);  
  return catway.save();
};

exports.updateCatway = async (id, data, userId = null) => {
  const catway = await Catway.findById(id);
  if (!catway) return null;

  // 🔥 IMPORTANT : corriger le user manquant
  if (!catway.user) {
    if (!userId) {
      throw new Error("Catway sans utilisateur associé");
    }
    catway.user = userId;
  }

  delete data._id;
  delete data.createdAt;
  delete data.catwayNumber;
  delete data.user; // empêche modification via PUT

  Object.keys(data).forEach(key => {
    catway[key] = data[key];
  });

  return await catway.save();
};

exports.patchCatway = (id, data) => {
  if ('createdAt' in data) {
    delete data.createdAt;
  }
  return Catway.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
};

exports.deleteCatway = (id) => {
  return Catway.findByIdAndDelete(id);
};