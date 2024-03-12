const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/TeamData", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT * FROM Team";
      connection.query(query, (err, data) => {
        connection.release();
  
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json({ data: data });
        }
      });
    });
  });
  
  router.get("/TeamCount", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT Count(*) FROM Team";
      connection.query(query, (err, data) => {
        connection.release();
  
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json({ data: data });
        }
      });
    });
  });

  router.get("/TeamNames", (req, res) => {
    const tlid = req.query.tlid;
  
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT Team_id, Team_name FROM Team WHERE Tl_id=?";
      connection.query(query, [tlid], (err, data) => {
        connection.release();
  
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json({ data: data });
        }
      });
    });
  });

  module.exports = router;