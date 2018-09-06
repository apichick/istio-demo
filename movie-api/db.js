const knex = require('knex')(require('./knexfile'));

module.exports = {
    getMovies: getMovies,
    getMovie: getMovie,
    getMovieCast: getMovieCast
};

function getMovies() {
    return knex('movies');
}

function getMovie(movieId) {
    return knex('movies').where('id', movieId);
}

function getMovieCast(movieId) {
    return knex.select('actors.id', 'actors.first_name', 'actors.last_name').from('movie_cast').innerJoin('actors', 'movie_cast.actor_id', 'actors.id').where('movie_cast.movie_id', movieId);
}

function getMovieDirectors(movieId) {
    return knex.select('directors.id', 'directors.first_name', 'directors.last_name').from('movie_directors').innerJoin('directors', 'movie_director.director_id', 'director.id').where('movie_directors.director_id', movieId);
}

