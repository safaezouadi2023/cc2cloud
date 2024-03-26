
const mongoose = require('mongoose');
const tacheSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  date_echeance: { type: Date },
  priorite: { type: String }
});

const Tache = mongoose.model('Tache', tacheSchema);


module.exports = Tache;
