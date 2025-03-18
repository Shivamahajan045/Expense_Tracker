const express = require("express");
const expenseController = require("../controller/expenseController");

const router = express.Router();

router.get("/all", expenseController.getExpenses);
router.post("/add", expenseController.addExpenses);
router.put("/edit/:id", expenseController.editExpenses);
router.delete("/delete/:id", expenseController.delExpenses);

module.exports = router;
