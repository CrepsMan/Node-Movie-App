const express = require('express');
const MovieController = require('../controllers/movieController');

const router = express.Router();
const movieController = new MovieController();

router.get('/random', (req, res) => movieController.getRandomMovie(req, res));
router.post('/rate', (req, res) => movieController.rateMovie(req, res));

module.exports = router;