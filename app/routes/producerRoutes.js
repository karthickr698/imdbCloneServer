const router = require("express").Router();
const { body } = require("express-validator");

const producerController = require("../controller/producerController");
const genderValidator = require("../customValidators/genderType.validator");

router.get("/", producerController.getAllProducers);

router.post(
  "/add",
  [
    body("name").exists().bail().trim(),
    body("gender").exists().bail().trim().custom(genderValidator),
    body("DOB").exists().bail().trim(),
    body("Bio").exists().bail().trim(),
  ],
  producerController.addProducer
);

router
  .route("/:producer_id")
  .get(producerController.getProducerDetails)
  .put(
    [
      body("name").exists().bail().trim(),
      body("gender").exists().bail().trim().custom(genderValidator),
      body("DOB").exists().bail().trim(),
      body("Bio").exists().bail().trim(),
    ],
    producerController.updateProducer
  )
  .delete(producerController.removeProducer);

module.exports = router;
