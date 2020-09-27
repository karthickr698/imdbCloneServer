const sql = require("../../models");
const { QueryTypes } = require("sequelize");

exports.getAllActors = () => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM actor", {
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.getActorById = (actor_id) => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM actor WHERE actor_id = $actor_id", {
        bind: {
          actor_id: actor_id,
        },
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.addActor = (name, gender, DOB, Bio) => {
  return new Promise(function (resolve, reject) {
    sql.actor
      .create({
        name: name,
        gender: gender,
        DOB: DOB,
        Bio: Bio,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.updateActorById = (actor_id, name, gender, DOB, Bio) => {
  return new Promise(function (resolve, reject) {
    sql.actor
      .update(
        {
          name: name,
          gender: gender,
          DOB: DOB,
          Bio: Bio,
        },
        {
          where: {
            actor_id: actor_id,
          },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.removeActorById = (actor_id) => {
  return new Promise(function (resolve, reject) {
    sql.actor
      .destroy({
        where: {
          actor_id: actor_id,
        },
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};
