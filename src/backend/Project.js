const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.get("/ProjectData", (req, res) => {
  const tlid = req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT Project_id,Project_name,Start_date,End_date,Status,Description,Budget,Priority FROM Project  where TL_id=? And Active='Active' ";
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
  const projectValues = [
    req.body.name,
    req.body.startDate,
    req.body.endDate,
    req.body.TlId,
    req.body.Status,
    req.body.description,
    req.body.budget,
    req.body.priority,
    req.body.teamid,
    req.body.Active
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    connection.beginTransaction((err) => {
      if (err) {
        return res.json({ error: err });
      }

      let projectQuery =
        "INSERT INTO Project (`Project_name`, `Start_date`, `End_date`, `TL_id`, `Status`, `Description`, `Budget`, `Priority`, `Team_id`, `Active`) VALUES (?)";

      connection.query(projectQuery, [projectValues], (err, projectResult) => {
        if (err) {
          connection.rollback(() => {
            connection.release();
            return res.json({ error: err });
          });
        }

        let projectId = projectResult.insertId;
        let teamUpdateQuery =
          "UPDATE Team SET Project_id = ? WHERE Team_id = ?";

        connection.query(teamUpdateQuery, [projectId, req.body.teamid], (err, teamResult) => {
          if (err) {
            connection.rollback(() => {
              connection.release();
              return res.json({ error: err });
            });
          }

          connection.commit((err) => {
            if (err) {
              connection.rollback(() => {
                connection.release();
                return res.json({ error: err });
              });
            }

            connection.release();
            return res.json({ success: true, projectId: projectId });
          });
        });
      });
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

    let query = "SELECT count(*) from Project join team on project.project_id=team.project_id where project.status='Completed' And team.Team_id = ? and project.Active='Active' and team.Active='Active'";
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

    let query = "SELECT count(*) from Project join team on project.project_id=team.project_id where project.status='Pending' And team.Team_id = ? and project.Active='Active' and team.Active='Active'";
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

router.get("/ProjectDataForTeam", (req, res) => {
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

router.get("/ProjectwiseTaskDataChart", (req, res) => {
  const tlid = req.query.tlid;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "SELECT p.project_id,p.project_name,COUNT(t.task_id) AS total_tasks,SUM(CASE WHEN t.Progress = 'Completed' THEN 1 ELSE 0 END) AS completed_tasks,SUM(CASE WHEN t.Progress = 'Pending' THEN 1 ELSE 0 END) AS pending_tasks,SUM(CASE WHEN t.Progress = 'Cancel' THEN 1 ELSE 0 END) AS canceled_tasks FROM project p LEFT JOIN task t ON p.project_id = t.project_id LEFT JOIN tl ON p.tl_id = tl.tl_id WHERE p.Active='Active' And tl.tl_id =? OR tl.tl_id IS NULL GROUP BY p.project_id, p.project_name";
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

module.exports = router;
