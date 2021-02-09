const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes");

const dotenv = require("dotenv");
dotenv.config();

const db = require("./db/db");


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Home page
app.get("/", (req, res) => {
  // res.send(process.env.DB_PASSWORD);
  let a = db.query(`SELECT * FROM ${process.env.DB_NAME}.persons`);
  res.send(a);
});

app.use("/api/chirps", apiRouter);

//server listening on PORT 5000
app.listen(process.env.PORT || "5000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "5000"}`);
});

