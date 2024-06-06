var express = require('express');
var router = express.Router();

const movies = require('../data/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {
  let  { page } = req.query;
  let results = movies.filter((movie) => movie.most_popular);
  let startIndex = (page - 1) * 20;
  results = results.slice(startIndex, startIndex  + 19)
  res.send({
    page, results});
});

module.exports = router;
