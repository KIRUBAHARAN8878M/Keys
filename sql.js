1. What is a JOIN in SQL?
    A JOIN is used to combine rows from two or more tables based on a related column between them.

Types of Joins:

INNER JOIN: Returns records with matching values in both tables.


SELECT employees.name, departments.dept_name
FROM employees
INNER JOIN departments
ON employees.dept_id = departments.dept_id;
LEFT JOIN (OUTER JOIN): // Returns all records from the left table and matched records from the right table.

SELECT employees.name, departments.dept_name
FROM employees
LEFT JOIN departments
ON employees.dept_id = departments.dept_id;
RIGHT JOIN (OUTER JOIN): //Returns all records from the right table and matched records from the left table.

FULL JOIN (OUTER JOIN): // Returns all records when there is a match in either left or right table.

2. What is a TRIGGER in SQL?
A trigger is a database object that is automatically executed in response to certain events on a table or view, such as INSERT, UPDATE, or DELETE.

Example:
A trigger to log changes to an employee's salary:


CREATE TRIGGER salary_update
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO salary_logs(employee_id, old_salary, new_salary, change_date)
  VALUES (OLD.id, OLD.salary, NEW.salary, NOW());
END;

3. What is an INDEX in SQL, and why is it used?
An index is a database object that improves the speed of data retrieval operations on a table at the cost of slower write operations.

Types of Indexes:

Clustered Index: Sorts and stores the data rows in the table based on key values.
Non-clustered Index: Maintains a separate structure for index storage.
Example:
Create an index on the name column in the employees table:


CREATE INDEX idx_employee_name ON employees(name);

4. What is a STORED PROCEDURE in SQL?
A stored procedure is a set of SQL statements stored in the database that can be executed repeatedly.

Example:
Stored procedure to fetch employee details by department:


CREATE PROCEDURE GetEmployeesByDept(IN dept_id INT)
BEGIN
  SELECT * FROM employees WHERE dept_id = dept_id;
END;
Calling a Procedure:


CALL GetEmployeesByDept(1);
5. What is the difference between DELETE, TRUNCATE, and DROP?

DELETE: Removes specific rows from a table and can be rolled back.


DELETE FROM employees WHERE id = 1;
TRUNCATE: Removes all rows from a table but cannot be rolled back.

TRUNCATE TABLE employees;
DROP: Deletes the table structure and all data.


DROP TABLE employees;
6. What is a PRIMARY KEY?
A primary key uniquely identifies each record in a table. It cannot have NULL values and must be unique.

Example:


CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100)
);
7. What is a FOREIGN KEY?
A foreign key is a field in one table that refers to the primary key in another table to enforce referential integrity.

Example:

CREATE TABLE orders (
  order_id INT PRIMARY KEY,
  employee_id INT,
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
8. What is the difference between UNION and UNION ALL?
Answer:

UNION: Combines results of two queries and removes duplicate records.
UNION ALL: Combines results of two queries without removing duplicates.
Example:


SELECT name FROM employees
UNION
SELECT name FROM customers;
9. What is the difference between WHERE and HAVING?
Answer:

WHERE: Filters rows before grouping.
HAVING: Filters groups after grouping.
Example:


SELECT dept_id, COUNT(*)
FROM employees
GROUP BY dept_id
HAVING COUNT(*) > 10;
10. What is Normalization?
Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.
Normal Forms:

1NF: Eliminate duplicate columns.
2NF: Remove partial dependencies.
3NF: Remove transitive dependencies.
11. What is a VIEW in SQL?
A view is a virtual table based on the result of a SQL query.

Example:


CREATE VIEW employee_view AS
SELECT name, dept_name
FROM employees
INNER JOIN departments ON employees.dept_id = departments.dept_id;
12. What are SQL Constraints?
SQL constraints are rules applied to table columns to ensure data integrity.

NOT NULL: Ensures a column cannot have NULL values.
UNIQUE: Ensures all values in a column are unique.
CHECK: Ensures a condition is true for column values.
DEFAULT: Sets a default value for a column.
Example:

CREATE TABLE employees (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2) CHECK (salary > 0)
);
13. What is a Subquery?
A subquery is a query inside another query.

Example:
Get employees whose salary is above the average salary:


SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
14. How would you find duplicate rows in a table?
Answer:


SELECT column_name, COUNT(*)
FROM table_name
GROUP BY column_name
HAVING COUNT(*) > 1;
15. What are SQL Transactions?
A transaction is a sequence of SQL operations treated as a single unit.
Commands:

BEGIN TRANSACTION: Starts a transaction.
COMMIT: Saves changes.
ROLLBACK: Reverts changes.
Example:

BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;