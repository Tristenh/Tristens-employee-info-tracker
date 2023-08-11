const inquirer = require("inquirer");
const mysql = require("mysql2");

// create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "employeeTracker_db",
});

//  table of contents, start funtion
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
      if (data.tableOfContents.includes("add a role")) {
        addARole();
      }
      if (data.tableOfContents.includes("add an employee")) {
        addAnEmployee();
      }
    });
}

// view all departments
function viewAllDepartments() {
  connection.query(
    "SELECT * FROM departments",
    function (err, results, fields) {
      console.table(results); // results contains rows returned by server
      start();
    }
  );
}
// view all roles
function viewAllRoles() {
  connection.execute("SELECT * FROM `roles`", function (err, results, fields) {
    console.table(results); // results contains rows returned by server
    start();
  });
}

//  view all employees
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

//  add a department
function addADepartment() {
  inquirer
    .prompt([
      {
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

// add a role
let roles = [];
function addARole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addRole",
        message: "What is the name of the role?",
      },
      {
        type: "input",
        name: "addSalary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "addDepartment",
        message: "which department does the role belong to?",
        choices: ["Engineering", "Finance", "Legal", "sales", "Service"],
      },
    ])
    .then((data) => {
      const addRole = data.addRole;
      const addSalary = data.addSalary;
      const addDepartment = data.addDepartment;
      roles.push(addRole);
      connection.execute(
        `INSERT INTO roles (title, salary, department) VALUES (?, ?, ?)`,
        [addRole, addSalary, addDepartment],
        function (err, results, fields) {
          console.log("success");
          start();
        }
      );
    });
}

// add an employee
function addAnEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "addLastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "addEmployeeRole",
        message: "What is the employee's role?",
        choices: [
          ...roles,
          "Sales Lead",
          "Salesperson",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
        ],
      },
    ])
    .then((data) => {
      const addName = data.addName;
      const addLastName = data.addLastName;
      const addEmployeeRole = data.addEmployeeRole;
      connection.execute(
        `INSERT INTO employees (first_name, last_name, title) VALUES (?, ?, ?)`,
        [addName, addLastName, addEmployeeRole],
        function (err, results, fields) {
          console.log("success"); // results contains rows returned by server
          start();
        }
      );
    });
}
