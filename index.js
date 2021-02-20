const {v4: uuidv4} = require('uuid');
const moviesAPI = require('./API/movie');

// function to check if the data valid or not
function isValid(movie) {
  if (typeof movie !== 'object') return false;
  if (typeof movie.title == 'undefined') return false;
  if (typeof movie.director == 'undefined') return false;
  if (typeof movie.release_date == 'undefined') return false;
  return true;
}

// Function to get all data
exports.getMovies = function (req, res) {
  res.status(200).json(moviesAPI);
};

// Function to get specified data by id
exports.getOneMovie = function (req, res) {
  const movie = moviesAPI.find((movie) => movie.id === req.params.id);
  if (movie) {
    res.status(200).json(movie).end();
  } else {
    res
      .status(400)
      .end(
        `Opps, There is no such a movie with an id : ${req.params.id} , sorry`
      );
  }
};

// function to create a new data and new unique id
exports.createMovie = function (req, res) {
  const newMovie = {
    id: uuidv4(),
    title: req.body.title,
    director: req.body.director,
    release_date: req.body.release_date,
  };
  if (isValid(newMovie)) {
    moviesAPI.push(newMovie);
    res
      .status(200)
      .end(
        `Congrats, The movie with title ${newMovie.title} has been added with an id : ${newMovie.id} `
      );
  } else {
    res
      .status(400)
      .end('Opps, The Movie details are invalid and needs to be fixed.');
  }
};

// Function to update the data by id
exports.updateMovie = function (req, res) {
  const updatedMovie = req.body;
  if (isValid(updatedMovie)) {
    const existingMovie = moviesAPI.find((movie) => movie.id === req.params.id);
    if (!existingMovie) {
      res
        .status(400)
        .end(`Opps, There is no movie with an Id : ${req.params.id}`);
      return;
    } else {
      existingMovie.title = updatedMovie.title;
      existingMovie.director = updatedMovie.director;
      existingMovie.release_date = updatedMovie.release_date;

      res
        .status(200)
        .end(`Movies with an id ( ${req.params.id} ) has been updated `);
    }
  } else {
    res
      .status(400)
      .end('Opps, The Movie details are invalid and needs to be fixed');
  }
};

// Function to delete a data by id
exports.deleteMovie = function (req, res) {
  const movieToDelete = moviesAPI.find((movie) => movie.id === req.params.id);
  if (!movieToDelete) {
    res
      .status(400)
      .end(`Opps, There is no movie with an Id : ${req.params.id}`);
    return;
  }
  const indexToDelete = moviesAPI.indexOf(movieToDelete);
  moviesAPI.splice(indexToDelete, 1);
  res
    .status(200)
    .send(`The Movie with Id : ( ${req.params.id} ) has been deleted`);
};
