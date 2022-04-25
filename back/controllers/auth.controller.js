const mysqlConnection = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// module.exports.getAllUser = (req, res) => {
//   mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
//     if (err) res.status(400).json({ err });
//     else res.status(200).json({ rows });
//   });
// };

function createToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY_TOKEN, {
    expiresIn: '12h',
  });
}

module.exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

  const sqlCreateUser = `INSERT INTO users SET ?`;
  const sqlCreateTable = `CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, pseudo VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE, password VARCHAR(1000) NOT NULL);`;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User(pseudo, email, hash);
      console.log(user);

      // Voir avec Yazid si c'est la meilleu facon
      mysqlConnection.query(sqlCreateUser, user, (err, results) => {
        if (!err) {
          res.status(200).json({ message: 'Utilisateur créé' });
        } else if (err.code == 'ER_NO_SUCH_TABLE') {
          // Créé la table users si elle n'existe pas
          mysqlConnection.query(sqlCreateTable, (err) => {
            res.status(400).json({ message: 'Table users créée' });
            // Ajoute l'utilisateur à la table après la création de la table
            mysqlConnection.query(sqlCreateUser, user, (err, results) => {
              if (err) console.log({ err });
            });
          });
        } else if (err) {
          res.status(400).json({ err });
        }
      });
    })
    .catch((err) => res.status(500).json({ err }).send(console.log(err)));
};

module.exports.signIn = (req, res) => {
  // Je veux vérifier que le mail de la requête = le mail
  const { email, password } = req.body;

  const sqlMail = `SELECT * FROM users WHERE email = ?`;
  mysqlConnection.query(sqlMail, email, (err, results) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else if (results == 0) {
      res.status(404).json({ message: "Utilisateur n'existe pas" });
    } else {
      console.log(results);
      bcrypt
        .compare(password, results[0].password)
        .then((controlPassword) => {
          console.log(controlPassword);
          // Incorrect password
          if (!controlPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect ' });
          }

          // Généré une key
          const token = createToken(results[0].id);
          console.log(token);

          // Response
          // res.cookie('jwt', token, { httpOnly: true, })
          res.status(201).json({ userId: results[0].id, token });
        })
        .catch((err) => res.status(500).json({ err }));
    }
  });
};

// route delete
