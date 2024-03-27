const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");
const multer = require("multer");
const xlsx = require('xlsx');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination directory based on the file type
    let destination;
    if (file.fieldname === 'image') {
      destination = '../image/'; // For profile photos
    } else if (file.fieldname === 'file') {
      destination = path.join(__dirname, '../Excel/'); // For Excel files
    } else {
      destination = '../Default/'; // Default destination directory
    }
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

// Create separate instances of multer for uploading profile photos and Excel files
const uploadImage = multer({ storage: storage });
const uploadExcel = multer({ storage: storage });

router.post("/updateTLExcelFile", uploadExcel.single("file"), (req, res) => {
  const { tl_id, description } = req.body;
  const excelFile = req.file.file;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "UPDATE TL SET Excel_file = ?, description = ? WHERE TL_id = ?";
      connection.query(query, [excelFile, description, tl_id], (err, data) => {
        connection.release();

        if (err) {
          console.error('Error updating TL data:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error updating TL data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});





















router.get("/TeamData", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT * FROM Team ";
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

    let query = "SELECT Count(*) FROM Team where TL_id= ? And Active='Active'";
    connection.query(query, tlid, (err, data) => {
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

    let query =
      "SELECT Team_id, Team_name FROM Team WHERE Tl_id=? and Active='Active'";
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
  const tlid = req.query.tlid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT team.Team_id,team.Team_name,team.Email, team.Roles, team.Phone_number, team.Qualification, team.Skills,Project.Project_name FROM Team join Project on Project.Team_id=Team.Team_id or Team.Project_id=Project.Project_id  WHERE team.Tl_id = 7 and Team.Active='Active'";
    connection.query(query, tlid, (err, data) => {
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
    req.body.Active,
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "INSERT INTO Team (`Team_name`, `Email`, `Phone_number`, `Roles`, `Qualification`, `Skills`, `Tl_id`,`Uniq_id`,`password`,`Active`) VALUES (?)";
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
  const value = [req.body.projectid, req.body.roles, req.body.teamid];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "Update Team set Project_id=?,Roles=? where Team_id=?";
    connection.query(query, value, (err, data) => {
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
  const TeamId = req.query.TeamId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "update Team set  Active='Inactive'  where TL_id= ? AND Team_id=?";
    connection.query(query, [tlid, TeamId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

// team Dashbord
router.get("/TeamLeaderList", (req, res) => {
  const TeamId = req.query.TeamId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "select TL.TL_ID,TL.TL_fname,TL.TL_lname from TL join Team on Team.Tl_id=TL.TL_id where Team.Team_id = ? ";
    connection.query(query, TeamId, (err, data) => {
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
