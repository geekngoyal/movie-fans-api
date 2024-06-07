var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails'); 




router.get('/top_rated', (req, res, next) => {
  let { page } = req.query;
  if(!page) {
    page = 1;
  }

  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  })
  console.log(results);
  const indexToStart = (page - 1) * 20;
  res.json(results.slice(results.slice(indexToStart, indexToStart  +20)))
});

router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params ;
  const results = movieDetails.find((movie) => movie.id === parseInt(movieId));
  res.send(results ? results: {});
})

router.post('/:movieId/rating', (req, res, next) => {
  const { movieId } = req.params;
  res.json("test");
});

module.exports = router;