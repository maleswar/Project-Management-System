const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/TaskData", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT Task_id,Task_name,Description,start_date,End_date,Priority,Progress,Comments from task";
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

router.post("/AddNewTask", (req, res) => {
  const value = [
    req.body.task,
    req.body.description,
    req.body.TeamId,
    req.body.startdate,
    req.body.enddate,
    req.body.priority,
    req.body.projectid,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "insert into Task (`Task_name`,`Description`,`Team_id`,`Start_date`,`End_date`,`Priority`,`Project_id`) values(?)";
    connection.query(query, [value], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TaskCompleteCount", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Task where Progress='completed'";
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

router.get("/TaskPendingCount", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Task where Progress='Pending'";
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

router.get("/TaskCancelCount", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Task where Progress='Cancled'";
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

router.get("/TaskDashbordData", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "SELECT Task_id,Task_name,Description,start_date,End_date,Priority,Comments from task where Progress='Pending'";
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

router.get("/TaskTeamData", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "SELECT Task.Task_id,Task.Task_name,Task.Progress,team.Team_name from task join team on task.Team_id=team.Team_id where Task.Progress='Completed'";
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



module.exports = router;
