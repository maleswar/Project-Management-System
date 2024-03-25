const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");
const multer = require('multer');


// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile_photos/'); // Specify the directory where profile photos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded photo
  }
});
const upload = multer({ storage: storage });




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
  
      let query = "SELECT team.Team_id, team.Team_name, team.Email, team.Roles, team.Phone_number, team.Qualification, team.Skills, project.Project_id, project.Project_name FROM Team JOIN Project ON team.Project_id = project.Project_id WHERE team.Tl_id = ?";
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

  router.post("/addNewTeamMember", (req, res) => {
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.roles,
        req.body.qualification,
        req.body.skills, // Convert skills array to a comma-separated string
        req.body.tlid,
        req.body.uid,
        req.body.password,
    ];

    pool.getConnection((err, connection) => {
        if (err) {
            return res.json({ error: "Internal Server Error" });
        }

        let query = "INSERT INTO Team (`Team_name`, `Email`, `Phone_number`, `Roles`, `Qualification`, `Skills`, `Tl_id`,`Uniq_id`,`password`) VALUES (?)";
        connection.query(query, [values], (err, data) => {
            connection.release();

            if (err) {
                return res.json({ error: err });
            } else {
                return res.json({ data: data });
            }
        });
    });
});

router.post("/TeamProjectUpdation", (req, res) => {
  const value=[
    req.body.projectid,
    req.body.roles,
    req.body.teamid,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "Update Team set Project_id=?,Roles=? where Team_id=?";
    connection.query(query,value, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
  
router.post("/DeleteTeamMember", (req, res) => {
  const tlid = req.query.tlid;
  const TeamId=req.query.TeamId
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "update Team set  Active='Inactive'  where TL_id= ? AND Team_id=?";
    connection.query(query, [tlid,TeamId],(err, data) => {
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