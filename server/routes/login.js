const { body, check, validationResult } = require("express-validator");
const md5 = require("md5");
const db = require("../db/db");

let userid = ""


const validate = (method) => {
  switch (method) {
    case "addUser": {
      return [
        check("username")
          .exists()
          .not()
          .isEmpty()
          .isAlphanumeric()
          .withMessage("Bad Request"),
        check("password")
          .exists()
          .not()
          .isEmpty()
          .isLength({ min: 4 })
          .withMessage("Bad Request")
      ];
    }
    case "authUser": {
      return [
        check("password")
          .exists()
          .not()
          .isEmpty()
          .withMessage("Bad Request")
      ]
    }
    case "addUserProfile": {
      return [
        check("userId")
          .exists()
          .not()
          .isEmpty()
          .withMessage('Bad Request'),
        check("fullname")
          .exists()
          .not()
          .isEmpty()
          .isLength({ max: 50 })
          .withMessage("Fullname is invalid"),
        check("address1")
          .exists()
          .not()
          .isEmpty()
          .isLength({ max: 50 })
          .withMessage("Invalid address1"),
        check("address2")
          .exists()
          .not()
          .isEmpty()
          .isLength({ max: 50 })
          .withMessage("Invalid address2"),
        check("city")
          .exists()
          .not()
          .isEmpty()
          .isLength({ max: 100 })
          .withMessage("Invalid city"),
        check("state")
          .exists()
          .not()
          .isEmpty()
          .isLength({ max: 2 })
          .withMessage("Invalid state"),
        check("zip")
          .exists()
          .not()
          .isEmpty()
          .isLength({ min: 5 }, { max: 9 })
          .withMessage("Invalid zip code")
      ];
    }
  }
};

const authUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
        userid=result[0].idusers
        res.send({ authentication: true, credentials: result[0].credentials, userid: result[0].idusers });
      } else {
        res.send({ authentication: false });
      }
    }
  );
};

const addUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
        db.query("INSERT INTO `users` (username, password) VALUES (?, ?)", [username, password], (err, result, fields) => {
            if (err) { return next(new Error([err])); }
            return res.sendStatus(200);
          }
        );
      }
    }
  );
};

const addUserProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const userId = req.body.userId;
  const fullname = req.body.fullname;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;

  db.query(
    `UPDATE \`users\` SET name='${fullname}', address1='${address1}', address2='${address2}', city='${city}', state='${state}', zip='${zip}', credentials=1 WHERE idusers=${userId}`,
    (err, result, fields) => {
      if (err) {
        next(new Error([err]));
        return res.sendStatus(400);
      } else {
        return res.send({ credentials: true });
      }
    }
  );
};

module.exports = {
  authUser,
  addUser,
  addUserProfile,
  validate,
};
