const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'un nom est requis'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'un email est requis'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\S+@\S+\.\S+$/.test(v);
      },
      message: props => `${props.value} n'est pas un email valide`
    }
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'un mot de passe est requis'],
    minlength: [3, 'Le mot de passe doit contenir au moins 3 caractères']
  }
}, {
  timestamps: true
});

// Pré-sauvegarde pour hasher le mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Export du modèle
module.exports = mongoose.model('User', userSchema);