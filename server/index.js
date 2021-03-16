const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const quote = require("./routes/quote");
const login = require("./routes/login");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.sendStatus(400); // Bad request
  }
  next();
});

//server listening on PORT 5000
app.listen(process.env.PORT || "5000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "5000"}`);
});

// Login
app.post('/login', login.authUser);
app.post('/signup', login.addUser);
app.post('/profile-management', login.addUserProfile);


// Quotes
app.get("/quote", quote.getQuote);
app.get("/fuel-history", quote.getHistory);

module.exports = app