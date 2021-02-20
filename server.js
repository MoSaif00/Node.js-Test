const express = require('express');
const movies = require('./index');

const app = express();

// Parse data
app.use(express.json());

// To read all movies
app.get('/movies', movies.getMovies);

// To read movie specified by ID
app.get('/movies/:id', movies.getOneMovie);

// To create a new movie
app.post('/movies', movies.createMovie);

// To update an existing movie specified by ID
app.put('/movies/:id', movies.updateMovie);

// To delete a movie by id
app.delete('/movies/:id', movies.deleteMovie);

// Initialize Server at Port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server has initialized at Port ${PORT}`);
});
