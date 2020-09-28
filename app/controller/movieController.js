const { validationResult } = require("express-validator");

const movieModel = require("../model/movieModel");

exports.getAllMovies = (req, res) => {
  movieModel
    .getAllMovies()
    .then((result) =>
      res.send({ error: false, totalMovies: result.length, result: result })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.addMovie = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      errormsg: "Please send required Details",
      "Required fields": ["name", "year_of_release", "plot", "poster", "producer_id"],
      "sample Format": {
        name: "test",
        year_of_release: "MALE",
        plot: "12/12/2020",
        poster: "testposter",
        producer_id: "testproducer_id",
      }
    });
  }
  const name = req.body.name;
  const year_of_release = req.body.year_of_release;
  const plot = req.body.plot;
  const poster = req.body.poster;
  const producer_id = req.body.producer_id;

  movieModel
    .addMovie(name, year_of_release, plot, poster, producer_id)
    .then((result) => res.send({ error: false, result: result }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.updatemovie = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      errormsg: "Please send required Details",
      "Required fields": ["name", "gender", "DOB", "Bio"],
      "sample Format": {
        name: "test",
        gender: "MALE",
        DOB: "12/12/2020",
        Bio: "testBio",
      },
      genderTypes: genderTypes.inList,
    });
  }
  const name = req.body.name;
  const gender = req.body.gender;
  const DOB = req.body.DOB;
  const Bio = req.body.Bio;

  const movie_id = req.params.movie_id;

  movieModel
    .updatemovieById(movie_id, name, gender, DOB, Bio)
    .then(async (result) => {
      if (result[0] === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid movieID given" });
      } else {
        const movieDetails = await movieModel.getmovieById(movie_id);
        res.send({
          error: false,
          result: movieDetails[0],
          message: "movie updated successfully",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.getmovieDetails = (req, res) => {
  const movie_id = req.params.movie_id;

  movieModel
    .getmovieById(movie_id)
    .then((result) => {
      if (result.length === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid movieID given" });
      } else {
        res.send({
          error: false,
          result: result[0],
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.removemovie = (req, res) => {
  const movie_id = req.params.movie_id;

  movieModel
    .removemovieById(movie_id)
    .then((result) => {
      if (result === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid movieID given" });
      } else {
        res.send({
          error: false,
          message: `movie with movie_id: ${movie_id} removed successfully`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};
