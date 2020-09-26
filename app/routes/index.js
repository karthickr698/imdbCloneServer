const router = require("express").Router();

router.use("/oauth", require("./oauth"));
router.use("/auth", require("./trandAuthRoutes"));

module.exports = router;
