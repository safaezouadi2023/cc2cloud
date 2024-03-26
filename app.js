
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Utilisateur = require('./utilisateurModel'); 
const Tache = require('./tacheModel'); 
const Activite = require('./activiteModel'); 

const app = express();


app.use(express.json());


mongoose.connect('URL_DE_VOTRE_BASE_DE_DONNEES', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connexion à MongoDB réussie');
})
.catch((err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});


app.post('/utilisateurs', async (req, res) => {
  try {
   
    const loginExiste = await Utilisateur.exists({ login: req.body.login });
    if (loginExiste) {
      return res.status(400).json({ message: 'Le login existe déjà' });
    }

    const emailExiste = await Utilisateur.exists({ email: req.body.email });
    if (emailExiste) {
      return res.status(400).json({ message: 'L\'email existe déjà' });
    }

    const nouvelUtilisateur = new Utilisateur(req.body);
    await nouvelUtilisateur.save();

    res.status(201).json({ message: 'Utilisateur ajouté avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur', error: err });
  }
});


app.post('/login', async (req, res) => {
  const { login, mdp } = req.body;

  try {
 
    const utilisateur = await Utilisateur.findOne({ login });
    if (!utilisateur) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }


    const motDePasseValide = await bcrypt.compare(mdp, utilisateur.mdp);
    if (!motDePasseValide) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    const token = jwt.sign({ id: utilisateur._id }, 'VOTRE_CLE_SECRETE', { expiresIn: '1h' });

    // Envoyer le token en réponse
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error: err });
  }
});

// Route pour ajouter une tâche
app.post('/taches', async (req, res) => {
  try {
    // Vérifier si le titre de la tâche est unique
    const titreExiste = await Tache.exists({ titre: req.body.titre });
    if (titreExiste) {
      return res.status(400).json({ message: 'Le titre de la tâche doit être unique' });
    }

    // Vérifier si la priorité est un nombre
    if (typeof req.body.priorite !== 'number') {
      return res.status(400).json({ message: 'La priorité doit être un nombre' });
    }

    // Créer une nouvelle tâche
    const nouvelleTache = new Tache(req.body);
    await nouvelleTache.save();

    res.status(201).json({ message: 'Tâche ajoutée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche', error: err });
  }
});

// Route pour récupérer les détails d'une tâche
app.get('/taches/:id', async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id);
    if (!tache) {
      return res.status(404).json({ message: 'Tâche non trouvée' });
    }
    res.json(tache);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des détails de la tâche', error: err });
  }
});

// Route pour vérifier si un utilisateur existe
app.get('/utilisateurs/:login', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findOne({ login: req.params.login });
    res.json({ existe: !!utilisateur });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la vérification de l\'existence de l\'utilisateur', error: err });
  }
});

// Route pour ajouter une activité en vérifiant que la tâche et l'utilisateur existent
app.post('/activites', async (req, res) => {
  const { utilisateur_id, tache_id } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const utilisateurExiste = await Utilisateur.exists({ _id: utilisateur_id });
    if (!utilisateurExiste) {
      return res.status(400).json({ message: 'L\'utilisateur n\'existe pas' });
    }

    // Vérifier si la tâche existe
    const tacheExiste = await Tache.exists({ _id: tache_id });
    if (!tacheExiste) {
      return res.status(400).json({ message: 'La tâche n\'existe pas' });
    }

    // Créer une nouvelle activité
    const nouvelleActivite = new Activite(req.body);
    await nouvelleActivite.save();

    res.status(201).json({ message: 'Activité ajoutée avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'activité', error: err });
  }
});

// Lancer le serveur Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
