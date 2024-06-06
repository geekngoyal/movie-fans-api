var express = require('express');
const movies = require('../data/movies');
const people = require('../data/people');
var router = express.Router();

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
router.get('/movie', function(req, res, next) {
    const searchTerm = req.query.query;
    const results = movies.filter((movie) => {
        let found = false;
        found = movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
        return found;
    })
    res.json({results})
  
});

router.get('/person', function(req, res, next) {
    const searchTerm = req.query.query;
    const results = people.filter((person) => {
        let found = false;
        found = person.overview.includes(searchTerm) || person.title.includes(searchTerm);
        return found;
    })
    res.json({results})
  
});

module.exports = router;
