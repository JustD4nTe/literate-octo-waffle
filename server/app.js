const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const incomeRouter = require("./Routes/IncomeRouter");
const expenseRouter = require("./Routes/ExpenseRouter");

const PORT = 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
  });
});

app.use("/api/income", incomeRouter);
app.use("/api/expense", expenseRouter);

app.listen(PORT, () => {
    console.log(`API is running on port: ${PORT}`);
});