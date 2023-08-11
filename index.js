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
      if (data.tableOfContents.includes("view all roles")) {
        viewAllRoles();
      }
      if (data.tableOfContents.includes("view all employees")) {
        viewAllEmployees();
      }
      if (data.tableOfContents.includes("add a department")) {
        addADepartment();
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
function viewAllRoles() {
  connection.execute("SELECT * FROM `roles`", function (err, results, fields) {
    console.table(results); // results contains rows returned by server
    start();
  });
}

function viewAllEmployees() {
  connection.execute(
    `SELECT employees.*, roles.department, roles.salary 
        FROM employees 
        LEFT JOIN roles
        ON employees.title = roles.title`,
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      start();
    }
  );
}

function addADepartment() {
  inquirer
    .prompt([
      {
        //  add a department
        type: "input",
        name: "addDepartment",
        message: "What is the name of the department?",
      },
    ])
    .then((data) => {
      const addDepartment = data.addDepartment;
      connection.execute(
        `INSERT INTO departments (name)
        VALUES (?) `,
        [addDepartment],
        function (err, results, fields) {
          console.log("success"); // results contains rows returned by server
          start();
        }
      );
    });
}
