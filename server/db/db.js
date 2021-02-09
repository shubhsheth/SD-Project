const mysql = require("mysql");
const db = mysql.createConnection({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b0d6684dad18f0",
  password: "6dede834",
  database: "heroku_49b1bd5c5457661",
});

module.exports = db;
