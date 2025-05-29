import express from "express";
const employeeRouter = express.Router();

import employees, { addEmployee } from "#db/employees";

employeeRouter.route("/").get((req, res) => {
  res.send("Hello employees!");
});

employeeRouter.route("/employees").get((req, res) => {
  res.send(employees);
});

// Note: this middleware has to come first! Otherwise, Express will treat
// "random" as the argument to the `id` parameter of /employees/:id.
employeeRouter.route("/employees/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.route("/employees/:id").get((req, res) => {
  const { id } = req.params;

  // req.params are always strings, so we need to convert `id` into a number
  // before we can use it to find the employee
  const employee = employees.find((e) => e.id === +id);

  if (!employee) {
    return res.status(404).send("Employee not found");
  }

  res.send(employee);
});

employeeRouter.post("/employees", (req, res, next) => {
  if (!req.body || !req.body.name || req.body.name.length <= 0) {
    res.status(400).json({ message: "missing body or name." });
  } else {
    const newEmployee = addEmployee(req.body.name);
    res.status(201).json(newEmployee);
  }
});

export default employeeRouter;
