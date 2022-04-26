const mysqlConnection = require('../config/db');
const Post = require('../models/post.model');

module.exports.readPost = (req, res) => {
  const sqlGetAll = 'SELECT * FROM posts';

  mysqlConnection.query(sqlGetAll, (err, results) => {
    if (err) res.send(err);
    else if (!results) res.send('Pas de post');
    else res.send({ results });
  });
};

module.exports.createPost = (req, res) => {
  const { posterId, message, picture, video } = req.body;

  const sqlCreatePost = 'INSERT INTO posts SET ?';
  const sqlCreateTable =
    'CREATE TABLE posts (postId INT NOT NULL AUTO_INCREMENT PRIMARY KEY, posterId INT NOT NULL, message VARCHAR(500), picture VARCHAR(255), video VARCHAR(255))';

  const post = new Post(message, picture, video);
  console.log(post);

  mysqlConnection.query(sqlCreatePost, post, (err, results) => {
    if (!err) res.status(201).json({ results });
    else if (err.errno == 1146) {
      mysqlConnection.query(sqlCreateTable, (err) => {
        if (!err) {
          res.status(201).json({ message: 'Table posts créée' });
          mysqlConnection.query(sqlCreatePost, post, (err, results) => {
            if (err) res.send({ err });
          });
        } else {
          res.send({ err });
        }
      });
    } else if (err) res.status(400).json({ err });
  });
};

// A tester : la nouvelle table voir si la valeur de posterId est égale a l'id passer dans cookie htemonly
// la nouvelle table auto incrémente l'id

// Je veux que si les variable message, video ou picture sont vide on ne change pas la valeur dans la bdd sinon on mais la valeur de req.body.message ...
// solution : ternaired ????

module.exports.updatePost = (req, res) => {
  const { message, picture, video } = req.body;
  const sqlUpdatePost =
    'UPDATE posts SET message = ? AND picture = ? AND video = ? WHERE postId = ?';

  mysqlConnection.query(sqlUpdatePost, [
    message,
    picture,
    video,
    req.params.id,
  ]);
};
