const sql = require("../../models");
const { QueryTypes } = require("sequelize");

exports.getAllMovies = () => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM movie", {
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.getMovieById = (movie_id) => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM movie WHERE movie_id = $movie_id", {
        bind: {
          movie_id: movie_id,
        },
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.addMovie = (name, year_of_release, plot, poster, producer_id) => {
  return new Promise(function (resolve, reject) {
    sql.movie
      .create({
        name: name,
        year_of_release: year_of_release,
        plot: plot,
        poster: poster,
        producer_id: producer_id,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.updateMovieById = (
  movie_id,
  name,
  year_of_release,
  plot,
  poster,
  producer_id
) => {
  return new Promise(function (resolve, reject) {
    sql.movie
      .update(
        {
          name: name,
          year_of_release: year_of_release,
          plot: plot,
          poster: poster,
          producer_id: producer_id,
        },
        {
          where: {
            movie_id: movie_id,
          },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

// exports.removeMovieById = (movie_id) => {
//   return new Promise(function (resolve, reject) {
//     sql.movie
//       .destroy({
//         where: {
//           movie_id: movie_id,
//         },
//       })
//       .then((result) => resolve(result))
//       .catch((err) => reject(err));
//   });
// };
