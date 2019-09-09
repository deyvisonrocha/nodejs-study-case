const MovieModel = require('../models/movies')

module.exports = {
  getById: function (req, res, next) {
    MovieModel.findById(req.params.movieId, function (err, movieInfo) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: "success",
          message: "Movie found!",
          date: {
            movies: movieInfo
          }
        })
      }
    })
  },
  getAll: function (req, res, next) {
    let moviesList = [];

    MovieModel.find({}, function (err, movies) {
      if (err) {
        next(err)
      } else {
        for (let movie of movies) {
          moviesList.push({
            id: movie._id,
            name: movie.name,
            released_on: movie.released_on
          })
        }

        res.json({
          status: "success",
          message: 'Movie list found!',
          data: {
            movies: moviesList
          }
        })
      }
    })
  },
  updateById: function (req, res, next) {
    MovieModel.findByIdAndUpdate(req.params.movieId, {
      name: req.body.name
    }, function (err, movieInfo) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: "success",
          message: 'Movie updated successfully!',
          data: null
        })
      }
    })
  },
  deleteById: function (req, res, next) {
    MovieModel.findByIdAndRemove(req.params.movieId, function (err, movieInfo) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: "success",
          message: 'Movie deleted successfully!',
          data: null
        })
      }
    })
  },
  create: function (req, res, next) {
    MovieModel.create({
      name: req.body.name,
      released_on: req.body.released_on
    }, function (err, result) {
      if (err) {
        next(err)
      } else {
        res.json({
          status: "success",
          message: 'Movie added successfully!',
          data: null
        })
      }
    })
  }
}
