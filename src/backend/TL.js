const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");
const multer = require("multer");
const path = require("path");
// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../image/")); // Specify the directory where uploaded images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + path.extname(file.originalname)); // Generate a unique filename for each uploaded image
  },
});
const uploadImage = multer({ storage: storage });




// Route to upload profile photo
router.post("/TLProfilePhoto", uploadImage.single("image"), (req, res) => {
  const image = req.file.filename;
  const tlid = req.query.tlid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "Update  TL set Profile_image = ? where TL_id=?";
      connection.query(query, [image, tlid], (err, data) => {
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



// Route to fetch TL data
router.get("/TLData", (req, res) => {
  const tlid = req.query.tlid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "SELECT * FROM TL where TL_ID=?";
      connection.query(query, tlid, (err, data) => {
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

// Route to fetch TL names
router.get("/TLNames", (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "SELECT TL_id, TL_fname, TL_lname FROM TL";
      connection.query(query, (err, data) => {
        connection.release();

        if (err) {
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching TL names:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/TLProfileUpdate", (req, res) => {
  const value = [
    req.body.fname,
    req.body.lname,
    req.body.companyName,
    req.body.email,
    req.body.uid,
    req.body.password,
    req.body.role,
    req.body.phoneNumber,
    req.body.skills,
    req.body.qualification,
    req.body.dob,
    req.body.city,
    req.body.state,
    req.body.country,
    req.body.instagram,
    req.body.linkedin,
    req.body.github,
    req.body.twitter,
    req.body.companyAddress,
    req.body.age,
    req.body.TL_ID,
  ];
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query =
  "UPDATE TL SET TL_fname=?, TL_lname=?, C_name=?, Email=?, Uniq_id=?, Password=?, role=?, Phone_number=?, Skill=?, Qualification=?, Date_of_birth=?, city=?, state=?, country=?, instagram=?, linkedin=?, github=?, twitter=?, company_address=?, Age=? WHERE TL_ID=?";

      connection.query(query, value, (err, data) => {
        connection.release();
  
        if (err) {
          return res.json({ error: err });
        } else {
          return res.json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error( error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// team Dashbord;
router.get("/TeamTLDetailDashbord", (req, res) => {
  const teamid=req.query.teamid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "select tl.TL_id, tl.TL_fname, tl.TL_lname,tl.C_name,tl.Uniq_id,tl.email,tl.profile_image,team.team_id from TL join team  on  tl.TL_id=team.TL_id  where Team.team_id=?  ";
      connection.query(query,teamid, (err, data) => {
        connection.release();

        if (err) {
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching TL names:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/FetchTheReportData", (req, res) => {
  const tlid = req.query.tlid;
  const Projectid = req.query.projectid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      let query = "SELECT  TL.TL_id,Team.Profile_image,Team.Team_name, Report.Upload_id, Report.File_name, Report.Description, Report.Uploaded_at, Report.Comment  FROM TL join  Report ON Report.TL_id=TL.TL_id  join Team on Team.Team_id=Report.Team_id WHERE Report.TL_id = ? AND Report.Project_id=? AND Report.Active = 'Active'";
      connection.query(query, [tlid,Projectid], (err, data) => {
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

router.post("/UpdateComment", (req, res) => {
  const comment = req.query.comment;
  const uploadid = req.query.uploadid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      let query = "update Report set Comment=? where Upload_id=?";
      connection.query(query,[comment,uploadid], (err, data) => {
        connection.release();
        if (err) {
          console.error('Error seting comment data:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ data: data });
        }
      });
    });
  } catch (error) {
    console.error("Error seting comment data", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/todos", (req, res) => {
  const tlid=req.query.tlid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      const query = "SELECT * FROM todos where Persion_id=?";
      connection.query(query,tlid, (err, result) => {
        connection.release();
        if (err) {
          console.error('Error fetching todos:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ todos: result });
        }
      });
    });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/updateTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const tlid = req.query.tlid;
  const { completed } = req.body;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      const query = "UPDATE todos SET completed = ? WHERE id = ? and Persion_id=?";
      connection.query(query, [completed, taskId,tlid], (err, result) => {
        connection.release();
        if (err) {
          console.error('Error updating task:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ success: true, message: "Task updated successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addTask", (req, res) => {
  const { text } = req.body;
  const tlid=req.query.tlid;
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      const query = "INSERT INTO todos (`text`,`Persion_id`) VALUES (?,?)";
      connection.query(query, [text,tlid], (err, result) => {
        connection.release();
        if (err) {
          console.error('Error adding task:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ success: true, message: "Task added successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deleteTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      
      const query = "DELETE FROM todos WHERE id = ?";
      connection.query(query, [taskId], (err, result) => {
        connection.release();
        if (err) {
          console.error('Error deleting task:', err);
          return res.status(500).json({ error: "Database Error" });
        } else {
          return res.status(200).json({ success: true, message: "Task deleted successfully" });
        }
      });
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
