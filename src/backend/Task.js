const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/TaskData", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT team.team_name,task.Task_id,task.Task_name,task.Description,task.start_date,task.End_date,task.Priority,task.Progress,task.Comments from task join Team on task.Team_id=team.Team_id where task.TL_id=?  and task.Project_id=?";
    connection.query(query,[tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskDataForUpdate", (req, res) => {
  const Taskid = req.query.Taskid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT * from Task where Task_id=?";
    connection.query(query, Taskid, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.post("/AddNewTask", (req, res) => {
  const value = [
    req.body.task,
    req.body.description,
    req.body.TeamId,
    req.body.startDate,
    req.body.endDate,
    req.body.priority,
    req.body.projectid,
    req.body.TlId,
    req.body.Progress,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "insert into Task (`Task_name`,`Description`,`Team_id`,`Start_date`,`End_date`,`Priority`,`Project_id`,`TL_id`,`Progress`) values(?)";
    connection.query(query, [value], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        console.log(query+value);
        return res.json({ data: data });
      }
    });
  });
});


router.post("/UpdateTask", (req, res) => {
  const value = [
    req.body.task,
    req.body.description,
    req.body.TeamId,
     req.body.startDate,
    req.body.endDate,
    req.body.priority,
    req.body.status, 
    req.query.Taskid,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "update task set Task_name=?,Description=?,Team_id=?,Start_date=?,End_date=?,Priority=?,Progress=? where Task_id=?";
    connection.query(query,value, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        console.log(query+value);
        return res.json({ data: data });
      }
    });
  });
});


router.get("/TaskCompleteCount", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT count(*) from Task where Progress='completed' and tl_id=? and Project_id=?";
    connection.query(query, [tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskPendingCount", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT count(*) from Task where Progress='Pending' and Tl_id=? and Project_id=?";
    connection.query(query, [tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskCancelCount", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Task where Progress='Cancel' and Tl_id=? and Project_id=?";
    connection.query(query, [tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskDashbordData", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT Task_id,Task_name,Description,start_date,End_date,Priority,Comments from task where Progress='Pending' and Tl_id=? and Project_id=? ";
    connection.query(query,[tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskTeamData", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.ProjectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT Task.Task_id,Task.Task_name,Task.Progress,team.Team_name from task join team on task.Team_id=team.Team_id where Task.Progress='Completed' and Task.Tl_id=?  and Task.Project_id=?";
    connection.query(query,[tlid,Project_id], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.post("/TaskStatusUpdate", (req, res) => {
  const tlid = req.query.tlid;
  const Progress = req.body.Progress;
  const TaskID = req.query.TaskID;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "Update Task set Progress=? where Task_id=? and TL_id=?";
    connection.query(query, [Progress, TaskID, tlid], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        console.log("Executed query:", query, Progress, TaskID, tlid);
        return res.json({ data: data });
      }
    });
  });
});

//Team Dashbord Routes

router.get("/TeamTaskCompleted", (req, res) => {
  const teamid = req.query.teamid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT count(*) from Task where Progress='Completed' and Team_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TeamTaskPending", (req, res) => {
  const teamid = req.query.teamid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT count(*) from Task where Progress='Pending' and Team_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});


router.get("/TeamTaskCancel", (req, res) => {
  const teamid = req.query.teamid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT count(*) from Task where Progress='Cancel' and Team_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/TeamAlertTableTask", (req, res) => {
  const teamid = req.query.teamid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT * from Task where Progress='Pending' and Team_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/TeamTaskData", (req, res) => {
  const teamid = req.query.teamid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT * from Task where Team_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/TaskDate", (req, res) => {
  const teamid = req.query.tlid;
  const projectId = req.query.projectId;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "SELECT Task_name,Start_Date,End_date from Task where Tl_id=? and Project_id=?";
    connection.query(query, [teamid, projectId], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.post("/CommentTaskData", (req, res) => {
  const Comment = req.query.Comment;
  const TaskID = req.query.TaskID;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query =
      "Update Task set Comments= ? where Task_id=?";
    connection.query(query, [Comment, TaskID], (err, data) => {
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
