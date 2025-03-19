const { where } = require("sequelize");
const Expense = require("../models/expense");

const getExpenses = (req, res) => {
  Expense.findAll()
    .then((result) => {
      // console.log(result[0].amount, result[0].description, result[0].category);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });

  /* db.execute(`SELECT * FROM expense`)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
    });

    */
};

const addExpenses = (req, res) => {
  const { amount, description, category } = req.body;
  Expense.create({
    amount: amount,
    description: description,
    category: category,
  })
    .then((newExpense) => {
      console.log("Expense added successfully");
      res.json(newExpense);
    })
    .catch((err) => {
      console.log(err);
    });

  /*
  db.execute(
    `INSERT INTO expense (amount, description, category) VALUES (?, ?, ?)`,
    [amount, description, category]
  )
    .then((result) => {
      res.json({
        message: "Expense added successfully",
        id: result[0].insertId,
      });
    })
    .catch((err) => {
      console.log(err);
    });  

  */
};

const delExpenses = (req, res) => {
  let { id } = req.params;

  Expense.destroy({ where: { id: id } })
    .then((result) => {
      res.json("Expense deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  /*
  db.execute(`DELETE FROM expense WHERE id = ?`, [id])
    .then((result) => {
      res.json("Expense deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });

  */
};

const editExpenses = (req, res) => {
  let { amount, description, category } = req.body;
  let { id } = req.params;

  Expense.update(
    {
      amount: amount,
      description: description,
      category: category,
    },
    {
      where: { id: id },
    }
  )
    .then((result) => {
      console.log("Expense updated successfully");
      res.json({ message: "Expense updated successfully" });
    })
    .catch((err) => console.log(err));
  /*
  db.execute(
    `UPDATE expense SET amount = ?, description = ?, category = ? WHERE id = ?`,
    [amount, description, category, id]
  )
    .then((result) => {
      res.json("Expense edited successfully");
    })
    .catch((err) => {
      console.log(err);
    });

    */
};

module.exports = {
  getExpenses,
  addExpenses,
  delExpenses,
  editExpenses,
};
