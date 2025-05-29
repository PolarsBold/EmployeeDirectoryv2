import express from "express";
const app = express();
import employeeRouter from "./routes/employeeRoutes.js";

app.use(express.json());
app.use("/", employeeRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong.");
});

export default app;
