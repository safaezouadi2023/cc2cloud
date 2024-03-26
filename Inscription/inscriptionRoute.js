const express = require('express');
const router = express.Router();
const Inscription = require('./inscription.js');
const Evenement = require('../Evenement/Evenement.js');
const Utilisateur = require('../auth-service/User.js');

router.get('/all', async (req, res) => {
  try {
    const inscriptions = await Inscription.find();
    res.json(inscriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.get('/evenements/:inscriptionname', async (req, res) => {
  try {
    const inscriptionName = req.params.inscriptionname;
    const evenements = await Evenement.find({ inscription: inscriptionName });
    res.json(evenements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.get('/utilisateur/:inscriptionname', async (req, res) => {
  try {
    const inscriptionName = req.params.inscriptionname;
    const utlisateurs = await Utilisateur.find({ inscription: inscriptionName });
    res.json(Utilisateur);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});



router.post('/add', async (req, res) => {
  try {
    const { nom, evenement_id, Utilisateur_id } = req.body;

    const inscription = new Inscription({ nom, evenement_id, Utilisateur_id });
    await inscription.save();

    res.status(201).json({ message: "inscription ajouté avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.put('/update/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const { nom, evenement_id, Utilisateur_id } = req.body;

    await Inscription.findOneAndUpdate({ nom }, { $set: { nom, evenement_id, Utilisateur_id } });

    res.json({ message: "Informations du inscription mises à jour avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.delete('/delete/:name', async (req, res) => {
  try {
    const name = req.params.name;

    await Inscription.findOneAndDelete({ nom });

    res.json({ message: "inscription supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
