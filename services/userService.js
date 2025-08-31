const User = require('../models/userModel');

exports.getAllUsers = () => {
  return User.find();
};

exports.getUserByEmail = (email) => { 
  if (!email) return Promise.resolve(null); 
  const normalized = email.toLowerCase(); 
  return User.findOne({ email: normalized }); 
};

exports.createUser = (data) => {
  const user = new User(data);  
  return user.save();
};

exports.patchUserByEmail = (email, data) => { 
  const payload = (data && typeof data === 'object') ? data : {}; 
  if ('createdAt' in payload) { 
    delete payload.createdAt; 
  } 
  const normalized = (email || '').toLowerCase(); 
  if (!normalized) return Promise.resolve(null); 
  return User.findOneAndUpdate({ email: normalized }, { $set: payload }, { new: true, runValidators: true }); 
};

// Nouvelle fonction pour PUT/UPDATE par email 
exports.updateUserByEmail = (email, data) => { 
  const normalized = (email || '').toLowerCase(); 
  if (!normalized) return Promise.resolve(null); 
  const payload = (data && typeof data === 'object') ? data : {}; 
  if ('createdAt' in payload) { delete payload.createdAt; } 
  // Mise à jour partielle (PUT/PATCH peuvent être traités comme patch ici) // Renvoie le document mis à jour ou null si l’utilisateur n’existe pas return User.findOneAndUpdate( { email: normalized }, { $set: payload }, { new: true, runValidators: true } ); 
};

exports.deleteUserByEmail = (email) => { 
  const normalized = (email || '').toLowerCase(); 
  if (!normalized) return Promise.resolve(null); 
  return User.findOneAndDelete({ email: normalized }); 
};