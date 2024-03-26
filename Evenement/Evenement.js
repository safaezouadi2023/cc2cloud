const mongoose = require('mongoose');

const EvenementSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date: Date,
  lieu: String,
  categorie: String
});

EvenementModel = mongoose.model('Evenement', EvenementSchema);
module.exports=EvenementModel;