var express = require('express');
var router = express.Router();
const movieDetails = require('../data/movieDetails'); 

const queryIsReq = (req, res, next) => {
  const searchTerm = req.query.query;
  if(!searchTerm) {
    res.json({msg : "query is required"});
  } else {
    next();
  }
}   

router.use(queryIsReq);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/top_rated', (req, res, next) => {
  let { page } = req.query;
  if(!page) {
    page = 1;
  }

  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  })
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