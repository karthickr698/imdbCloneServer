const sql = require("../../models");
const { QueryTypes } = require("sequelize");

exports.getAllProducers = () => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM producer", {
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.getProducerById = (producer_id) => {
  return new Promise(function (resolve, reject) {
    sql.sequelize
      .query("SELECT * FROM producer WHERE producer_id = $producer_id", {
        bind: {
          producer_id: producer_id,
        },
        type: QueryTypes.SELECT,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.addProducer = (name, gender, DOB, Bio) => {
  return new Promise(function (resolve, reject) {
    sql.producer
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

exports.updateProducerById = (producer_id, name, gender, DOB, Bio) => {
  return new Promise(function (resolve, reject) {
    sql.producer
      .update(
        {
          name: name,
          gender: gender,
          DOB: DOB,
          Bio: Bio,
        },
        {
          where: {
            producer_id: producer_id,
          },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

exports.removeProducerById = (producer_id) => {
  return new Promise(function (resolve, reject) {
    sql.producer
      .destroy({
        where: {
          producer_id: producer_id,
        },
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};
