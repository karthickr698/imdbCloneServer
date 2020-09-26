const router = require("express").Router();
const { body } = require("express-validator");

const actorController = require("../controller/actorController");

router.get(
  "/",
  actorController.getAllActors
);

router.post(
  "/add",
  [
    body("name").exists().bail().trim(),
    body("gender").exists().bail().trim(),
    body("DOB").exists().bail().trim(),
    body("Bio").exists().bail().trim(),
  ],
  actorController.addActor
);

module.exports = router;