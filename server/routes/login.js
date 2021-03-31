const { body, check, validationResult } = require("express-validator");
const md5 = require("md5");
const db = require("../db/db");

const authUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  }

  const username = req.body.username;
  const password = md5(req.body.password);

  db.query(
    "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?",
    [username, password],
    (err, result, fields) => {
      if (err) {
        return next(new Error([err]));
      }

      if (result.length > 0) {
        res.send({ authentication: "true" });
      } else {
        res.send({ authentication: "false" });
      }
    }
  );
};

const validate = (method) => {
  switch (method) {
    case "addUser": {
      return [
        check("username", "Username is invalid").isAlphanumeric(),
        body("password").isLength({ min: 4 }),
      ];
    }
    case "authUser": {
      return [check("password", "Password is invalid").exists()];
    }
    case "addUserProfile": {
      return [
        check("fullname", "Fullname is invalid").isLength({ max: 50 }),
        check("address1", "Invalid address1").isLength({ max: 50 }),
        check("address2", "Invalid address2").isLength({ max: 50 }),
        check("city", "Invalid city").isLength({ max: 100 }),
        check("state", "Invalid state").isLength({ max: 2 }),
        check("zip", "Invalid zip code").isLength({ min: 5 }, { max: 9 }),
      ];
    }
  }
};

const addUser = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.sendStatus(400);
  }

  const username = req.body.username;
  const password = md5(req.body.password);

  db.query(
    "SELECT * FROM `users` WHERE `username` = ?",
    username,
    (err, result, fields) => {
      if (err) {
        return next(new Error([err]));
      }

      if (result.length > 0) {
        return res.sendStatus(400);
      } else {
        db.query(
          "INSERT INTO `users` (username, password) VALUES (?, ?)",
          [username, password],
          (err, result, fields) => {
            if (err) {
              return next(new Error([err]));
            }
            return res.sendStatus(200);
          }
        );
      }
    }
  );
};

const addUserProfile = (req, res, next) => {
  const userId = req.body.userId;
  const fullname = req.body.fullname;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  db.query(
    `UPDATE \`users\` SET name='${fullname}', address1='${address1}', address2='${address2}', city='${city}', state='${state}', zip='${zip}' WHERE idusers=${userId}`,
    (err, result, fields) => {
      if (err) {
        return next(new Error([err]));
      }
      return res.sendStatus(200);
    }
  );
};

module.exports = {
  authUser,
  addUser,
  addUserProfile,
  validate,
};
