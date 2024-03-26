const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Accès non autorisé, aucun token fourni' });

  try {
    const decoded = jwt.verify(token, ''); 
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;
