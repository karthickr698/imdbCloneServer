module.exports = {
  "development": {
    "username": process.env.DEV_USERNAME,
    "password": process.env.DEV_PASSWORD,
    "database": "imdb",
    "host": process.env.DEV_HOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.PROD_PASSWORD,
    "database": "imdb",
    "host": process.env.PROD_HOST,
    "dialect": "mysql"
  }
}