const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/TLData", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT * FROM TL";
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

  router.get("/TLNames", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT TL_id,TL_fname,TL_lname FROM TL";
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


 
  
  module.exports = router;