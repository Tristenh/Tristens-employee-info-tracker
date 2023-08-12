INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       
INSERT INTO roles (title,department, salary, manager)
VALUES ("Sales Lead", "Sales", 100000, null),
 ("Salesperson", "Sales", 80000, "john Doe"),
 ("Lead Engineer", "Engineering",150000, null),
 ("Software Engineer", "Engineering", 120000, "Ashley Rodriguez"),
 ("Account Manager", "Finance", 160000, null),
 ("Accountant", "Finance", 125000, "Kunal Singh"),
 ("Legal Team Lead", "Legal", 250000, null),
 ("Lawyer", "Legal", 190000, "Sarah Lourd");

 INSERT INTO employees (first_name, last_name, title)
 VALUES ("John", "Doe", "Sales Lead"),
 ("Mike", "Chan", "Salesperson"),
 ("Ashley", "Rodriques", "Lead Engineer"),
 ("Kevin", "Tupik", "Software Engineer"),
 ("Kunal", "Singh", "Account Manager"),
 ("Malia", "Brown", "Accountant"),
 ("Sarah", "Lourd", "Legal Team Lead"),
 ("Tom", "Allen", "Lawyer");