require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const db = require("./models");
const redis = require("./redisInstance");

const PORT = process.env.PORT || 3000;

redis.client.on("error", function (error) {
  console.log("An error occurred with redis:" + error);
});

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  const allowedOrigins = [
    process.env.ALLOWED_ORIGIN,
    "http://localhost:3000"
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, cookie"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Expose-Headers", "Set-Cookie");
  next();
});

const apiRoutes = require("./app/routes");

app.use("/", apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});