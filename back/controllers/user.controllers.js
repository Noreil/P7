const mysqlConnection = require('../config/db');

module.exports.getAllUser = (req, res) => {
  const sqlAllUser = 'SELECT * FROM users';
  mysqlConnection.query(sqlAllUser, (err, results) => {
    if (err) res.send({ err });
    else if (!results) res.send("Pas d'utilissateur");
    else res.send({ results });
  });
};

module.exports.getOneUser = (req, res) => {
  const sqlOneUser = 'SELECT * FROM users WHERE id = ?';
  mysqlConnection.query(sqlOneUser, req.params.id, (err, results) => {
    if (err) res.send({ err });
    else if (results == 0) res.send('Utilisateur non trouvé');
    else res.send({ results });
  });
};

module.exports.updateUser = (req, res) => {
  const sqlUpdateUser = 'UPDATE users SET pseudo = ? WHERE id = ?';
  mysqlConnection.query(
    sqlUpdateUser,
    [req.body.pseudo, req.params.id],
    (err) => {
      if (!err) res.send({ message: 'Pseudo modifier' });
      else res.send({ err });
    }
  );
};

module.exports.deleteUser = (req, res) => {
  const sqlDeleteUser = 'DELETE FROM users WHERE id = ?';
  mysqlConnection.query(sqlDeleteUser, req.params.id, (err, results) => {
    if (!err) res.send({ message: 'Utilisateur supprimer' });
    else res.send({ err });
  });
};
