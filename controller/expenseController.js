const db = require("../utils/database");

const getExpenses = (req, res) => {
  db.execute(`SELECT * FROM expense`)
    .then(([rows]) => {
      res.json(rows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addExpenses = (req, res) => {
  let { amount, description, category } = req.body;
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
};

const delExpenses = (req, res) => {
  let { id } = req.params;
  db.execute(`DELETE FROM expense WHERE id = ?`, [id])
    .then((result) => {
      res.json("Expense deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

const editExpenses = (req, res) => {
  let { amount, description, category } = req.body;
  let { id } = req.params;
  db.execute(
    `UPDATE expense SET amount = ?, description = ?, category = ? WHERE id = ?`,
    [amount, description, category, id]
  )
    .then((result) => {
      res.json("Expense deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getExpenses,
  addExpenses,
  delExpenses,
  editExpenses,
};
