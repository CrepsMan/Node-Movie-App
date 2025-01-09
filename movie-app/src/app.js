const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const movieRoutes = require('./routes/movieRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/movies', movieRoutes);

app.listen(port, () => {
    console.log(`Movie app listening at http://localhost:${port}`);
});