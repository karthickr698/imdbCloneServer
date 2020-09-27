const router = require("express").Router();
const { body } = require("express-validator");

const actorController = require("../controller/actorController");
const genderValidator = require("../customValidators/genderType.validator");

router.get("/", actorController.getAllActors);

router.post(
  "/add",
  [
    body("name").exists().bail().trim(),
    body("gender").exists().bail().trim().custom(genderValidator),
    body("DOB").exists().bail().trim(),
    body("Bio").exists().bail().trim(),
  ],
  actorController.addActor
);

router
  .route("/:actor_id")
  .get(actorController.getActorDetails)
  .put(
    [
      body("name").exists().bail().trim(),
      body("gender").exists().bail().trim().custom(genderValidator),
      body("DOB").exists().bail().trim(),
      body("Bio").exists().bail().trim(),
    ],
    actorController.updateActor
  )
  .delete(actorController.removeActor);

module.exports = router;
