const express = require("express");
const app = express();

// const db = require("../db/db");
const db = require("../db/db");
const bodyParser = require("body-parser");
const cors = require("cors");

app.post("/signup", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    `INSERT INTO {process.ENV.DB_NAME} (username, password) VALUES (?, ?);`,
    [username, password],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

// router.post("/login", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   db.query(
//     "SELECT * FROM heroku_38af7cfddd96cca.users WHERE username = ?",
//     username,
//     (err, results) => {
//       if (err) {
//         console.log(err);
//       }
//       if (results.length > 0) {
//         if (password == results[0].password) {
//           res.json({ loggedIn: true, username: username });
//         } else {
//           res.json({
//             loggedIn: false,
//             message: "Wrong username/password combo!",
//           });
//         }
//       } else {
//         res.json({ loggedIn: false, message: "User doesn't exist" });
//       }
//     }
//   );
// });

// const authUser = (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.sendStatus(400);
//   }

//   const username = req.body.username;
//   const password = req.body.password;

//   // TODO: Check user in db

//   res.send({ authentication: "true" });
// };

// const addUser = (req, res) => {
//   if (!req.body.username || !req.body.password) {
//     res.sendStatus(400);
//   }

//   const username = req.body.username;
//   const password = req.body.password;

//   // TODO: add user in db

//   res.send({ success: "true" });
// };

// const addUserProfile = (req, res) => {
//   const fullname = req.body.fullname;
//   const address1 = req.body.address1;
//   const address2 = req.body.address2;
//   const city = req.body.city;
//   const state = req.body.state;
//   const zip = req.body.zip;

//   // TODO: add user profile in db

//   res.send({ success: "true" });
// };

// module.exports = { authUser, addUser, addUserProfile };

module.exports = app;
