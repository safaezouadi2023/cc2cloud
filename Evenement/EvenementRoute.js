const express = require('express');
const router = express.Router();
const Evenement = require('../Evenement/Evenement.js');

router.get('/all', async (req, res) => {
  try {
    const Evenement = await Evenement.find();
    res.json(Evenement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

router.post('/add', async (req, res) => {
  EvenementModel = mongoose.model('Evenement' ,authorSchema, 'BaseD');
  EvenementModel.insertMany([
    {nom:"khadija"},{description:"description de evenemnet1"},{date:"23/01/2019"},{lieu:"rabat"},{categorie:"categorie1"},
    {nom:"romaissae"},{description:"description de evenemnet2"},{date:"23/10/2020"},{lieu:"tanger"},{categorie:"categorie2"},
    
    ]).then((docs) => {
    console.log("Inserted Evenement");
    console.log(docs);
    }).catch((e)=>{console.log(e)})
});

router.put('/update/:name', async (req, res) => {
 
  const Evenement = req.params.name;
  const updatedEvenement = req.body;

  EvenementModel.updateOne({nom:`${Evenement}`},{description:"descriptiond de evenemnet"},{date:"23/01/2012"},{lieu:"city"},{categorie:"categories"},function(err, res){
      console.log(`Modified ${res.n} document`);
      });
      res.json(updatedEvenement); 
    });

router.delete('/delete/:name', async (req, res) => {
  try {
    const name = req.params.name;

    await Evenement.findOneAndDelete({ nom });

    res.json({ message: "Evenement supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
