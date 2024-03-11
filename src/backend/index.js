const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const ManagerRouter = require("./Manager");
const Project = require("./Project");
const Task = require("./Task");
const Team = require("./Team");
const TeamLeader = require("./TL");
const UtilitiesRouter = require("./Utilities");


app.use("/Manager", ManagerRouter);
app.use("/Project", Project);
app.use("/Task", Task);
app.use("/Team", Team);
app.use("/TL", TeamLeader);
app.use("/Utilities", UtilitiesRouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
