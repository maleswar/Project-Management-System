const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");
const multer = require("multer");
const xlsx = require('xlsx');
const path = require('path');
const app = express();

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
    req.uploadTimestamp = new Date();
  },
});

// Create separate instances of multer for uploading profile photos and Excel files
const uploadImage = multer({ storage: storage });
const uploadExcel = multer({ storage: storage });

app.use('/Excel', express.static(path.join(__dirname, '../Excel/')));
// Custom error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    console.error('Multer Error:', err);
    return res.status(400).json({ error: 'File Upload Error' });
  } else if (err) {
    // An unknown error occurred when uploading.
    console.error('Unknown Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
};

router.post("/updateTLExcelFile", (req, res, next) => {
  req.uploadTimestamp = new Date();
  next(); // Call next middleware
}, uploadExcel.single("file"),handleMulterError,
 (req, res) => {
  const teamID = req.query.teamID;
  const { teamLeader, description,Active } = req.body;
  const excelFile = req.file.filename; // Use req.file.filename to get the filename
  const uploadTimestamp = req.uploadTimestamp;
  console.log(uploadTimestamp);
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      let query="INSERT INTO Report (TL_id, Team_id, File_name, Description, Uploaded_at,Active) VALUES (?, ?, ?, ?, ?,?) ON DUPLICATE KEY UPDATE TL_id = VALUES(TL_id), Team_id = VALUES(Team_id), File_name = VALUES(File_name), Description = VALUES(Description), Uploaded_at = VALUES(Uploaded_at),Active = VALUES(Active)";
      // let query = "UPDATE TL JOIN Team ON Team.Tl_id = TL.TL_id SET TL.Report =?, TL.Description =? WHERE  TL.TL_id = ? AND Team.Team_id = ?";
      connection.query(query, [teamLeader,teamID,excelFile,description,uploadTimestamp,Active], (err, data) => {
       
        connection.release();
        
        if (err) {
          console.error('Error updating Report data:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error updating Report data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/FetchTheReportData", (req, res) => {
  const TeamId = req.query.TeamId;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      let query = "SELECT TL.TL_fname, TL.TL_lname, Team.Team_name, Report.Upload_id, Report.File_name, Report.Description, Report.Uploaded_at, Report.Comment  FROM TL JOIN Team ON TL.TL_id = Team.TL_id JOIN Report ON (Team.Team_id = Report.Team_id OR TL.TL_id = Report.TL_id) WHERE Team.Team_id = ? AND Report.Active = 'Active'";
      connection.query(query, TeamId, (err, data) => {
        connection.release();
        if (err) {
          console.error('Error Fetching Report data:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error updating Report data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



router.post("/TeamProfilePhoto", uploadImage.single("image"), (req, res) => {
  const image = req.file.filename;
  const TeamID = req.query.TeamID;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "Update  Team set Profile_image = ? where Team_id=?";
      connection.query(query, [image, TeamID], (err, data) => {
        connection.release();

        if (err) {
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching TL data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});




















router.get("/TeamData", (req, res) => {
  const teamid=req.query.teamid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT * FROM Team where Team_id=?";
    connection.query(query,teamid, (err, data) => {
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
      "SELECT team.Team_id,team.Team_name,team.Email, team.Roles, team.Phone_number, team.Qualification, team.Skills,team.Profile_image,Project.Project_name FROM Team join Project on Project.Project_id=Team.Project_id or Team.Team_id=Project.Team_id WHERE team.Tl_id = 7 and Team.Active='Active'";
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
