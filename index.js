// required packages
const inquirer = require("inquirer");
const mysql = require("mysql2");

// create connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "employeeTracker_db",
});

// start funtion, table of contents,
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
          "Quit",
        ],
      },
    ])
    // if option selected from list run a function
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
      if (data.tableOfContents.includes("update an employee role")) {
        updateAnEmployeeRole();
      }
      if (data.tableOfContents.includes("Quit")) {
        console.log("exiting the application");
        connection.end();
        process.exit(0);
      }
    });
}

// view all departments
function viewAllDepartments() {
  connection.query(
    "SELECT * FROM departments",
    function (err, results, fields) {
      // results contains rows returned by server
      console.table(results);
      start();
    }
  );
}
// view all roles
function viewAllRoles() {
  connection.query(
    "SELECT roles.id, roles.title, roles.department, roles.salary FROM `roles`",
    // results contains rows returned by server
    function (err, results, fields) {
      console.table(results);
      start();
    }
  );
}

//  view all employees
function viewAllEmployees() {
  connection.query(
    `SELECT employees.*, roles.department, roles.salary , roles.manager
        FROM employees 
        LEFT JOIN roles
        ON employees.title = roles.title`,
    // results contains rows returned by server
    function (err, results, fields) {
      console.table(results);
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
      //   prepared statement
      connection.query(
        `INSERT INTO departments (name)
        VALUES (?) `,
        [addDepartment],
        console.log("success"),
        start()
      );
    });
}

// add a role
// stored addRole answer
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
      //push addRole to role
      roles.push(addRole);
      //   prepared statement
      connection.query(
        `INSERT INTO roles (title, salary, department) VALUES (?, ?, ?)`,
        [addRole, addSalary, addDepartment],
        console.log("success"),
        start()
      );
    });
}

// default roles
const defaultRoles = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Account Manager",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
];
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
          // addRole answers
          ...roles,
          ...defaultRoles,
        ],
      },
    ])
    .then((data) => {
      const addName = data.addName;
      const addLastName = data.addLastName;
      const addEmployeeRole = data.addEmployeeRole;
      //   prepared statement
      connection.query(
        `INSERT INTO employees (first_name, last_name, title) VALUES (?, ?, ?)`,
        [addName, addLastName, addEmployeeRole],
        console.log("success"),
        start()
      );
    });
}

// update an employee role
function updateAnEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "updateEmployee",
        message: "Which employee's role do you want to update?",
      },
      {
        type: "list",
        name: "updateEmployeeRole",
        message: "Which role do you want to assign the selected employee?",
        choices: [
          // addRole answer
          ...roles,
          ...defaultRoles,
        ],
      },
    ])
    .then((data) => {
      const updateEmployee = data.updateEmployee;
      const updateEmployeeRole = data.updateEmployeeRole;
      //   prepared statement
      connection.query(
        `UPDATE employees SET title = ? WHERE first_name = ?`,
        [updateEmployeeRole, updateEmployee],
        console.log("success"),
        start()
      );
    });
}
