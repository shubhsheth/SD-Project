const dotenv = require("dotenv");
dotenv.config();



const express = require("express");
// const {check, validationResult} = require("express-validation/check");
const app = express();
const db = require("./db/db");
const bodyParser = require("body-parser");
const cors = require("cors");

// const bcrypt = require("bcrypt"); ENCRYPTION
// const saltRounds = 10; ENCRYPTION

const usersRoute = require("./routes/users");
// const quoteRoute = require("./routes/quote");

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use((err, req, res, next) => {
//   // This check makes sure this is a JSON parsing issue, but it might be
//   // coming from any middleware, not just body-parser:

//   if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
//     console.error(err);
//     return res.sendStatus(400); // Bad request
//   }
//   next();
// });


app.get("/signup", usersRoute)


//server listening on PORT 5000
app.listen(process.env.PORT || "5000", () => {
  console.log(`Server is running on port: ${process.env.PORT || "5000"}`);
});

// // Login

// app.get("/login", login.authUser);
// app.post("/signup",
//             [
//               check('username').not().isEmpty().trim().escape
//             ],
//             login.addUser);
// app.get("/profile-management", login.addUserProfile);

// // Quotes
// app.get("/quote", quote.getQuote);
// app.get("/fuel-history", quote.getHistory);


// app.use("/quote", quoteRoute);