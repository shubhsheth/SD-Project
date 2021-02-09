const express = require("express");
const app = express();
const db = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Home page
app.get("/", (req, res) => {
  res.send("hello world");
});

//server listening on PORT 5000, WILL CHANGE PORT to a CONST later.
app.listen(5000, () => {
  console.log("Server running on PORT 5000");
});
