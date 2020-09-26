const router = require("express").Router();

router.use("/oauth", require("./oauth"));
router.use("/auth", require("./trandAuthRoutes"));
router.use("/actor", require("./actorRoutes"));

module.exports = router;
