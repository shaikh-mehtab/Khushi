const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "DB@root123#",
  database: "khushi_db",
});

connection.connect((err) => {
  if (err) {
    console.log("error to connecting the database", err);
  } else {
    console.log("Connected the successfully");
  }
});
//connection.connect();

module.exports = connection.promise();
