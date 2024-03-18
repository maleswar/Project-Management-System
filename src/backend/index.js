const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');
const path = require('path');

app.use(bodyParser.json());
app.use(cors());

// Multer configuration for storing uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'image/')); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename for each uploaded file
  }
});

const upload = multer({ storage: storage });

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
app.use("/TL", upload.single('profilePhoto'), TeamLeader); // Multer middleware added here
app.use("/Utilities", UtilitiesRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
