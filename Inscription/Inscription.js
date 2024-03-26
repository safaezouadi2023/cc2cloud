const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  evenement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'evenement' },
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  nom: String
});

module.exports = mongoose.model('Inscription', inscriptionSchema);
