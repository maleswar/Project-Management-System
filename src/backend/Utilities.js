const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.post("/loginForTL", (req, res) => {
  let email = req.body.email;
  let uid = req.body.uid;
  let password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }

    const sql =
      "SELECT TL_Id, TL_fname, TL_lname FROM TL WHERE Email = ? AND Uniq_id = ? AND Password = ?";

    connection.query(sql, [email, uid, password], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        const status = data && data.length > 0; // Check if data exists
        return res.json({ data: data, status: status });
      }
    });
  });
});


router.post("/loginForTeam", (req, res) => {
  let email = req.body.email;
  let uid = req.body.uid;
  let password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }

    const sql =
      "SELECT Team_id, Team_name FROM Team WHERE Email = ? AND Uniq_id = ? AND Password = ?";

    connection.query(sql, [email, uid, password], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        const status = data && data.length > 0; // Check if data exists
        return res.json({ data: data, status: status });
      }
    });
  });
});


router.post("/signup", (req, res) => {
  const value = [
    req.body.fname,
    req.body.lname,
    req.body.companyname,
    req.body.email,
    req.body.uid,
    req.body.password,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }
    const sql =
      "insert into TL (`TL_fname`,`TL_lname`,`C_name`,`Email`,`Uniq_id`,`Password`)values(?)";
    connection.query(sql, [value], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

module.exports = router;
