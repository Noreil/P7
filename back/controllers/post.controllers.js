const mysqlConnection = require('../config/db');

module.exports.readPost = (req, res) => {
  const sqlGetAll = 'SELECT * FROM posts';

  mysqlConnection.query(sqlGetAll, (err, results) => {
    if (err) res.send(err);
    else if (!results) res.send('Pas de post');
    else res.send({ results });
  });
};

module.exports.createPost = (req, res) => {
  const { postId, message, picture, video } = req.body;

  const sqlCreatePost = 'INSERT INTO posts SET = ?';
  const sqlCreateTable =
    'CREATE TABLE posts (postId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, message VARCHAR(500), picture VARCHAR(255), video VARCHAR(255)';

  mysqlConnection.query(sqlCreatePost);
};
