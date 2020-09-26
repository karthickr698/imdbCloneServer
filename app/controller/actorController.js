const { validationResult } = require("express-validator");

const actorModel = require("../model/actorModel");

exports.getAllActors = (req, res) => {
  console.log("herer");
  actorModel
    .getAllActors()
    .then((result) =>
      res.send({ error: false, totalActors: result.length, result: result })
    )
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};

exports.addActor = (req, res) => {
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
    });
  }
  const name = req.body.name;
  const gender = req.body.gender;
  const DOB = req.body.DOB;
  const Bio = req.body.Bio;

  actorModel
    .addActor(name, gender, DOB, Bio)
    .then((result) => res.send({ error: false, result: result }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: true, errmsg: "Internal server Error" });
    });
};
