const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/ProjectData", (req, res) => {
  const tlid = req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT Project.Project_id,Project.Project_name,Project.Start_date,Project.End_date,Project.Status,Project.Description,Project.Budget,Project.Priority,Team.Team_id,Team.Team_name FROM Project JOIN Team ON Project.Team_id=Team.Team_id OR Project.Project_id=Team.Project_id where Project.TL_id=? And Project.Active='Active' And team.Active='Active'";
    connection.query(query,tlid, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/ProjectDataForEditPage", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.Project_id;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT * FROM Project where TL_id=? And Active='Active' and Project_id=?";
    connection.query(query,[tlid,Project_id] ,(err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});


router.get("/ProjectCount", (req, res) => {
  const tlid = req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project where TL_id=? And Active='Active'";
    connection.query(query,tlid, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/ProjectCompleteCount", (req, res) => {
  const tlId=req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project where status='Completed' And Tl_id=? And Active='Active'";
    connection.query(query,tlId, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/ProjectCancledCount", (req, res) => {
  const tlId=req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project where status='Cancled' And Tl_id=? And Active='Inctive'";
    connection.query(query,tlId, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/ProjectPendingCount", (req, res) => {
  const tlId=req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project where status='Pending' And Tl_id=? And Active='Active'";
    connection.query(query,tlId, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/ProjectBudgetList", (req, res) => {
  const tlid = req.query.tlid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT Project.Project_name, Project.Budget, Team.Team_name FROM Project  JOIN Team ON Project.Team_id = Team.Team_id  WHERE Team.TL_id =? and Project.Active='Active'";
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

router.post("/AddNewProject", (req, res) => {
  const value = [
    req.body.name,
    req.body.startDate,
    req.body.endDate,
    req.body.TlId,
    req.body.Status,
    req.body.description,
    req.body.budget,
    req.body.priority,
    req.body.teamid,
    req.body.Active,
    
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "insert into Project (`Project_name`,`Start_date`,`End_date`,`TL_id`,`Status`,`Description`,`Budget`,`Priority`,`Team_id`,`Active`) values(?)";

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

router.get("/ProjectNames", (req, res) => {
  const tlid = req.query.tlid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT Project_id,Project_name from Project where TL_id= ?";
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

router.put("/ProjectInactive", (req, res) => {
  const tlid = req.query.tlid;
  const Project_id = req.query.Project_id;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "update Project set Active='Inactive' where TL_ID=? And Project_id = ?";
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

router.put("/UpdateTheProjectForm", (req, res) => {
  const value = [
    req.body.projectName,
    req.body.startDate,
    req.body.endDate,
    req.body.TL_ID,
    req.body.Status,
    req.body.description,
    req.body.budget,
    req.body.priority,
    req.body.team_id,
    req.body.Project_id, // Assuming Project_id is the primary key of your Project table
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "UPDATE Project SET Project_name=?, Start_date=?, End_date=?, TL_id=?, Status=?, Description=?, Budget=?, Priority=?, Team_id=? WHERE Project_id=?";

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

// team Dashbord

router.get("/TeamProjectNameData", (req, res) => {
  const teamid = req.query.teamid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "SELECT Project_id,Project_name from project where Team_id=? ";
       connection.query(query, teamid, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TeamIDCompletedProject", (req, res) => {
  const TeamID=req.query.TeamID;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project join team on Project.project_id=team.Project_id where project.status='Completed' And team.Team_id = ? And project.Active='Active'";
    connection.query(query,TeamID, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TeamIDPendingProject", (req, res) => {
  const TeamID=req.query.TeamID;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT count(*) from Project where status='Pending' And Team_id = ? and Active='Active'";
    connection.query(query,TeamID, (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.get("/TeamProjectData", (req, res) => {
  const TeamID=req.query.teamid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "select project.Project_id,project.Project_name,project.Start_date,project.End_date,project.Status,project.Description,project.Budget,project.Priority,team.Team_id from project join team on project.Project_id=team.Project_id where team.Team_id = ?  ";
    connection.query(query,TeamID, (err, data) => {
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
