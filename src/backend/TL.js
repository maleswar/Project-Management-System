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
const upload = multer({ storage: storage });

// Route to upload profile photo
router.post("/TLProfilePhoto", upload.single("image"), (req, res) => {
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

// router.use('/image', express.static(path.join(__dirname, '../backend/image/')));

router.get("/TLPhoto", (req, res) => {
  const tlid = req.query.tlid;

  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let query = "SELECT Profile_image FROM TL WHERE TL_id=?";
      connection.query(query, [tlid], (err, data) => {
        connection.release();

        if (err) {
          return res.status(500).json({ error: "Database Error" });
        } else {
          const imageUrl = data[0].Profile_image; // Assuming the image filename is stored in the 'Profile_image' field
          return res.status(200).json({ imageUrl: imageUrl });
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

module.exports = router;
