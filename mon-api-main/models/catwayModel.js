const mongoose = require('mongoose');

const catwaySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Un utilisateur est requis']
  },

  catwayNumber: {
    type: Number,
    required: true,
    unique: true,
    match: [/^\d+$/, 'Le numéro doit contenir uniquement des chiffres']
  },

  catwayType: {
    type: String,
    required: true,
    enum: ['long', 'short']
  },

  catwayState: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);