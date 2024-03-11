
const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "smita",
    database: "project",
  });

module.exports=pool;