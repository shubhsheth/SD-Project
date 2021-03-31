const { check, validationResult } = require("express-validator");
const db = require("../db/db");

const getQuote = async (req, res) => {
  const currentPrice = 1.5;
  const profitFactor = 0.1;

  if (!req.body.userid || !req.body.location || !req.body.gallons) {
    return res.sendStatus(400);
  } else {
    const userid = req.body.userid;
    const location = req.body.location;
    const gallons = req.body.gallons;

    const date = new Date();
    const time = date.getTime();

    let locationFactor = 0.04;
    if (location == "Texas") {
      locationFactor = 0.02;
    }

    // TODO: Bug - await doesn't work properly
    let rateHistoryFactor = (await hasHistory(userid)) == true ? 0.01 : 0;

    let gallonRequestedFactor = 0.03;
    if (gallons > 1000) {
      gallonRequestedFactor = 0.02;
    }

    const margin = Number(
      (
        currentPrice *
        (locationFactor -
          rateHistoryFactor +
          gallonRequestedFactor +
          profitFactor)
      ).toFixed(4)
    );
    const quote = currentPrice + margin;
    const total = gallons * quote;

    db.query(
      "INSERT INTO `quotes` (idusers, gallons, address, date, price, total) VALUES (?, ?, ?, ?, ?, ?)",
      [userid, gallons, location, time, quote, total],
      (err, result, fields) => {
        if (err) {
          return next(new Error([err]));
        }

        return res.send({ margin, quote, total });
      }
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body);
  }
};


// const validate = (method) => {
//   switch (method) {
//     case "getQuote": {
//       return [
//         check("userId").exists(),
//         check("location").isAlpha(),
//         check("gallons").isNumeric(),
//         // check("date").isDate(),
//         // check("quote").isNumeric(),
//         // check("total").isNumeric(),
//       ];
//     }
//   }
// };

const hasHistory = (userid) => {
  db.query(
    "SELECT * FROM `quotes` WHERE idusers = ?",
    userid,
    (err, result, fields) => {
      if (err) {
        return false;
      }

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  );
};

const getHistory = (req, res, next) => {
  const userid = req.body.userid;

  if (!userid) {
    return res.sendStatus(400);
  } else {
    db.query(
      "SELECT * FROM `quotes` WHERE idusers = ?",
      userid,
      (err, result, fields) => {
        if (err) {
          return next(new Error([err]));
        }

        return res.json(result).status(200);
      }
    );
  }
};

module.exports = {
  getQuote,
  getHistory,
  // validate
};
