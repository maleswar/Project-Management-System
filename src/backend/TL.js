const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");
const multer = require('multer');
const path = require('path');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'image/')); // Specify the directory where profile photos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded photo
  }
});
const upload = multer({ storage: storage });

// Route to upload profile photo
router.put("/TLProfilePhoto", upload.single('profilePhoto'), (req, res) => {
  try {
    const TL_id = req.query.TL_id;
    const profilePhotoPath = req.file.path; // Multer will add 'file' property to the request object

    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Check if the TL_id exists in the TL table
      connection.query("SELECT TL_id FROM TL WHERE TL_id = ?", [TL_id], (err, rows) => {
        if (err) {
          connection.release();
          return res.status(500).json({ error: "Database Error" });
        }

        if (rows.length === 0) {
          // If TL_id doesn't exist, insert a new row with the profile photo
          connection.query("INSERT INTO TL (TL_id, Profile_image) VALUES (?, ?)", [TL_id, profilePhotoPath], (err, result) => {
            connection.release();

            if (err) {
              return res.status(500).json({ error: "Database Error" });
            } else {
              return res.status(200).json({ message: "Profile photo uploaded successfully" });
            }
          });
        } else {
          // If TL_id exists, update the profile photo
          connection.query("UPDATE TL SET Profile_image = ? WHERE TL_id = ?", [profilePhotoPath, TL_id], (err, result) => {
            connection.release();

            if (err) {
              return res.status(500).json({ error: "Database Error" });
            } else {
              return res.status(200).json({ message: "Profile photo updated successfully" });
            }
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route to fetch TL data
router.get("/TLData", (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "SELECT * FROM TL";
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

module.exports = router;
