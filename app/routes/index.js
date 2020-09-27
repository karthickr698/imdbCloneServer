const router = require("express").Router();

router.use("/oauth", require("./oauth"));
router.use("/auth", require("./trandAuthRoutes"));
router.use("/actor", require("./actorRoutes"));
router.use("/producer", require("./producerRoutes"));

module.exports = router;
