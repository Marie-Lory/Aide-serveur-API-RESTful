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
exports.updateUserByEmail = async (email, data) => {
  const normalized = (email || '').trim().toLowerCase();
  if (!normalized) return null;

  const user = await User.findOne({ email: normalized });
  if (!user) return null;

  Object.keys(data).forEach(key => {
    user[key] = data[key];
  });

  await user.save(); // 🔥 déclenche pre('save')
  return user;
};

exports.deleteUserByEmail = (email) => { 
  const normalized = (email || '').toLowerCase(); 
  if (!normalized) return Promise.resolve(null); 
  return User.findOneAndDelete({ email: normalized }); 
};