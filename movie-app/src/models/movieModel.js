const mysql = require('mysql2/promise');
require('dotenv').config();

class MovieModel {
    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
    }

    async getRandomMovie() {
        try {
            const [rows] = await this.connection.query('SELECT * FROM film ORDER BY RAND() LIMIT 1');
            return rows[0];
        } catch (error) {
            console.error('Error getting random movie:', error);
            throw error;
        }
    }

    async updateRating(movieId, rating) {
        try {
            await this.connection.query('UPDATE film SET rating = (rating * rating_count + ?) / (rating_count + 1), rating_count = rating_count + 1 WHERE ID = ?', [rating, movieId]);
        } catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }
    }

    async getMovieById(movieId) {
        try {
            const [rows] = await this.connection.query('SELECT * FROM film WHERE ID = ?', [movieId]);
            return rows[0];
        } catch (error) {
            console.error('Error getting movie by ID:', error);
            throw error;
        }
    }
}