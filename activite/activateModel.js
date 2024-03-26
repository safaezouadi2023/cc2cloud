
const mongoose = require('mongoose');


const activiteSchema = new mongoose.Schema({
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  tache_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tache', required: true }
});

const Activite = mongoose.model('Activite', activiteSchema);

module.exports = Activite;
