const express = require("express");
const router = express.Router();
const pool = require("./databaseConfig");

router.post("/loginForTL", (req, res) => {
  let email = req.body.email;
  let uid = req.body.uid;
  let password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }

    const sql =
      "SELECT TL_Id, TL_fname, TL_lname FROM TL WHERE Email = ? AND Uniq_id = ? AND Password = ?";

    connection.query(sql, [email, uid, password], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        const status = data && data.length > 0; // Check if data exists
        return res.json({ data: data, status: status });
      }
    });
  });
});

router.post("/loginForTeam", (req, res) => {
  let email = req.body.email;
  let uid = req.body.uid;
  let password = req.body.password;

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }

    const sql =
      "SELECT Team_id, Team_name FROM Team WHERE Email = ? AND Uniq_id = ? AND Password = ?";

    connection.query(sql, [email, uid, password], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        const status = data && data.length > 0; // Check if data exists
        return res.json({ data: data, status: status });
      }
    });
  });
});

router.post("/signup", (req, res) => {
  const value = [
    req.body.fname,
    req.body.lname,
    req.body.companyname,
    req.body.email,
    req.body.uid,
    req.body.password,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ err: err });
    }
    const sql =
      "insert into TL (`TL_fname`,`TL_lname`,`C_name`,`Email`,`Uniq_id`,`Password`)values(?)";
    connection.query(sql, [value], (err, data) => {
      connection.release();
      if (err) {
        return res.json({ err: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.post("/EmailCheckTL", (req, res) => {
  const email = req.body.email;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "SELECT COUNT(*) AS count FROM TL WHERE Email = ?";
    connection.query(query, [email], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.post("/EmailCheckTeam", (req, res) => {
  const email = req.body.email;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "SELECT COUNT(*) AS count FROM Team WHERE Email = ?";
    connection.query(query, [email], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.put("/TLFogotPassword", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "UPDATE TL SET password = ? WHERE email = ?";
    connection.query(query, [password, email], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.put("/TeamFogotPassword", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "UPDATE Team SET password = ? WHERE email = ?";
    connection.query(query, [password, email], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});

router.post("/AddNewContact", (req, res) => {
  const value = [
    (Name = req.body.name),
    (Comment = req.body.message),

    (email = req.body.email),
  ];

  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }
    let query = "insert into Contact (`Name`,`Comment`,`email`) values(?)";
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

router.get("/roles", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "select roles_names from roles";
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

router.post("/CreateIssue", (req, res) => {
  const value = [
    req.body.description,
    req.body.selectedTeamLeader,
    req.query.TeamID,
  ];
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "insert into issue(`issue_name`,`TL_Id`,`Team_id`) values (?)";
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

router.get("/fetchIssue", (req, res) => {
  const tlid = req.query.tlid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "select team.Profile_image,team.Team_name,issue.issue_id,issue.issue_name,issue.comment from team join issue on issue.Team_id=team.Team_id where issue.TL_id=?";
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
router.post("/UpdateIssue", (req, res) => {
  const comment = req.query.comment;
  const issueid = req.query.issueid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query = "Update issue set Comment=? where issue_id=?";
    connection.query(query, [comment, issueid], (err, data) => {
      connection.release();

      if (err) {
        return res.json({ error: err });
      } else {
        return res.json({ data: data });
      }
    });
  });
});
router.get("/fetchIssueForTeam", (req, res) => {
  const Teamid = req.query.teamid;
  pool.getConnection((err, connection) => {
    if (err) {
      return res.json({ error: "Internal Server Error" });
    }

    let query =
      "select team.Profile_image,team.Team_name,issue.issue_id,issue.issue_name,issue.comment from team join issue on issue.Team_id=team.Team_id where issue.Team_id=?";
    connection.query(query, Teamid, (err, data) => {
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
