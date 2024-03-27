const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');



app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine the destination directory based on the file type
    let destination;
    if (file.fieldname === 'image') {
      destination = '../image/'; // For profile photos
    } else if (file.fieldname === 'excelFile') {
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


// Import routers
const ManagerRouter = require("./Manager");
const Project = require("./Project");
const Task = require("./Task");
const Team = require("./Team");
const TeamLeader = require("./TL");
const UtilitiesRouter = require("./Utilities");

// Route handlers
app.use("/Manager", ManagerRouter);
app.use("/Project", Project);
app.use("/Task", Task);
app.use("/Team", Team);
app.use("/TL",TeamLeader); // Multer middleware added here
app.use("/Utilities", UtilitiesRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
