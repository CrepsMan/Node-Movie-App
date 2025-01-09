const MovieModel = require('../models/movieModel');

class MovieController {
    constructor() {
        this.movieModel = new MovieModel();
    }

    async getRandomMovie(req, res) {
        try {
            const movie = await this.movieModel.getRandomMovie();
            res.render('movie', { movie });
        } catch (error) {
            console.error('Error retrieving movie:', error);
            res.status(500).send('Error retrieving movie');
        }
    }

    async rateMovie(req, res) {
        const { movieId, rating } = req.body;
        try {
            await this.movieModel.updateRating(movieId, rating);
            const updatedMovie = await this.movieModel.getMovieById(movieId);
            res.json(updatedMovie); // Return JSON instead of rendering the view
        } catch (error) {
            console.error('Error updating rating:', error);
            res.status(500).send('Error updating rating');
        }
    }
}

module.exports = MovieController;