const express = require("express");
const path = require("path");
const cors = require("cors");
const sequelize = require("./utils/database");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "expense.html"));
});

app.use("/expenses", expenseRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
  })
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log(`Server is listening to port 3000`);
});
