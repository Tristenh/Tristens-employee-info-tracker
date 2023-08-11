const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "employeeTracker_db",
});
start();
function start() {
  inquirer
    .prompt([
      {
        // select from list
        type: "list",
        name: "tableOfContents",
        message: "Please select a option from the following list",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((data) => {
      if (data.tableOfContents.includes("view all departments")) {
        viewAllDepartments();
      }
    });
}

function viewAllDepartments() {
  connection.query(
    "SELECT * FROM departments",
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      start();
    }
  );
}
