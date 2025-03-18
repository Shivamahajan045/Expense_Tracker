const form = document.querySelector("form");
const ul = document.getElementById("expenses");
let editingExpenseId = null;
const fetchAllExpenses = () => {
  axios
    .get("http://localhost:3000/expenses/all")
    .then((result) => {
      console.log(result.data);
      ul.innerHTML = "";

      result.data.forEach((expense) => addExpenseToUI(expense));
    })
    .catch((err) => {
      console.log(err);
    });
};

const addExpenseToUI = (expense) => {
  let li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `${expense.amount} ---- > ${expense.description} ----> ${expense.category}  `;

  // Delete btn
  let delBtn = document.createElement("button");
  delBtn.className = "btn btn-danger btn-sm me-2";
  delBtn.textContent = "Delete";

  delBtn.onclick = () => deleteExpense(expense.id);

  // edit btn
  let editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm me-2";
  editBtn.textContent = "Edit";
  editBtn.style.margin = "10px";

  editBtn.onclick = () => editExpense(expense);

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
};

const deleteExpense = (id) => {
  axios
    .delete(`http://localhost:3000/expenses/delete/${id}`)
    .then((result) => {
      console.log("Expense deleted successfully!");
      fetchAllExpenses();
    })
    .catch((err) => {
      console.log(err);
    });
};

const editExpense = (expense) => {
  document.getElementById("amount").value = expense.amount;
  document.getElementById("description").value = expense.description;
  document.getElementById("category").value = expense.category;

  document.getElementById("add").textContent = "Edit"; // Change button text
  editingExpenseId = expense.id; // store expense id for update
};

const updateExpense = (id, updateExpense) => {
  axios
    .put(`http://localhost:3000/expenses/edit/${id}`, updateExpense)
    .then((result) => {
      console.log("Expense updated successfully");
      fetchAllExpenses();
      form.reset();
      editingExpenseId = null;
    })
    .catch((err) => {
      console.log(err);
    });
};

document.addEventListener("DOMContentLoaded", fetchAllExpenses);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let amount = e.target.amount.value;
  let description = e.target.description.value;
  let category = e.target.category.value;
  let expenseObj = {
    amount: amount,
    description: description,
    category: category,
  };

  if (editingExpenseId) {
    updateExpense(editingExpenseId, expenseObj);
  } else {
    axios
      .post("http://localhost:3000/expenses/add", expenseObj)
      .then((result) => {
        fetchAllExpenses();
        form.reset();
        console.log("expense added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
