const { validationResult } = require("express-validator");

const producerModel = require("../model/producerModel ");
const genderTypes = require("../utils/genderEnum");

exports.getAllProducers = (req, res) => {
  producerModel
    .getAllProducers()
    .then((result) =>
      res.send({ error: false, totalProducers: result.length, result: result })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.addProducer = (req, res) => {
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

  producerModel
    .addProducer(name, gender, DOB, Bio)
    .then((result) => res.send({ error: false, result: result }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.updateProducer = (req, res) => {
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

  const producer_id = req.params.producer_id;

  producerModel
    .updateProducerById(producer_id, name, gender, DOB, Bio)
    .then(async (result) => {
      if (result[0] === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid producerID given" });
      } else {
        const producerDetails = await producerModel.getProducerById(producer_id);
        res.send({
          error: false,
          result: producerDetails[0],
          message: "producer updated successfully",
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.getProducerDetails = (req, res) => {
  const producer_id = req.params.producer_id;

  producerModel
    .getProducerById(producer_id)
    .then((result) => {
      if (result.length === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid producerID given" });
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

exports.removeProducer = (req, res) => {
  const producer_id = req.params.producer_id;

  producerModel
    .removeProducerById(producer_id)
    .then((result) => {
      if (result === 0) {
        res.status(400).json({ error: true, errmsg: "Invalid producerID given" });
      } else {
        res.send({
          error: false,
          message: `producer with producer_id: ${producer_id} removed successfully`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};
