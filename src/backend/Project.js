const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");


router.get("/ProjectData", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT * FROM Project";
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
  
  router.get("/ProjectCount", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT count(*) from Project";
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

  router.get("/ProjectCompleteCount", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT count(*) from Project where status='completed'";
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

  router.get("/ProjectBudgetList", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT TL.TL_fname,TL.TL_lname,Project.Budget,Project.Project_name from TL join Project on TL.Project_id=Project.Project_id ";
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
  
  router.post("/AddNewProject", (req, res) => {
   const value=[
    req.body.name,
    req.body.startdate,
    req.body.enddate,
    req.body.TlId,
    req.body.description,
    req.body.budget,
    req.body.priority,
    req.body.teamid,
   
    ];
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "insert into Project (`Project_name`,`Start_date`,`End_date`,`TL_id`,`Description`,`Budget`,`Priority`,Team_id) values(?)";

      connection.query(query,[value] ,(err, data) => {
        connection.release();
  
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json({ data: data });
        }
      });
    });
  });

  router.get("/ProjectNames", (req, res) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.json({ error: "Internal Server Error" });
      }
  
      let query = "SELECT Project_id,Project_name from Project";
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