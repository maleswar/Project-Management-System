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
    const tlid = req.query.tlid;

    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT Count(*) FROM Team where TL_id= ?";
      connection.query(query, tlid,(err, data) => {
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

  router.get("/TeamInformationForDashbord", (req, res) => {
    const tlid=req.query.tlid;
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT Team_id,Team_name,Email,Roles,Phone_number,Qualification,Skills FROM Team where Tl_id= ?";
      connection.query(query,tlid, (err, data) => {
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