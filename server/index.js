const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes");

const db = require("./db/db");
const quote = require("./routes/quote");
const login = require("./routes/login");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.sendStatus(400); // Bad request
  }
  next();
});
app.use("/api/chirps", apiRouter);

//server listening on PORT 5000
app.listen(process.env.PORT || "5000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "5000"}`);
});

// Login
app.get('/login', login.authUser);
app.get('/register', login.addUser);
app.get('/update-profile', login.addUserProfile);


// Quotes
app.get('/quote', quote.getQuote);
app.get('/quote-history', quote.getHistory);