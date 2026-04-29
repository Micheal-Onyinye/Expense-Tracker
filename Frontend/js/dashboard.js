
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

function showReport(ReId, content) {
  const Re = document.getElementById(ReId);

  Re.innerHTML = `
    <button class="close-btn" onclick="hideReport('${ReId}')">✖</button>
    ${content}
  `;

  Re.classList.remove("hidden");

  setTimeout(() => {
    Re.classList.add("hidden");
  }, 8000);
}

function hideReport(ReId) {
  document.getElementById(ReId).classList.add("hidden");
}

async function handleAddExpense() {
  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");
  const descriptionInput = document.getElementById("description");

  if (!amountInput.value || !categoryInput.value) {
    alert("Amount and category are required");
    return;
  }

  const data = {
    amount: parseFloat(amountInput.value),
    category: categoryInput.value,
    description: descriptionInput.value
  };

  await addExpense(data);

  // clear after successful add
  amountInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";

  loadExpenses();
}


async function loadExpenses() {
  const expenses = await getExpenses();

  document.getElementById("expenseList").innerHTML =
    expenses.map(exp => `
      <div class="expense-item">

        <div>
          <b>${exp.category}</b><br>
          ₦${exp.amount}<br>
          <small>${exp.description || ""}</small>
        </div>

        <div>
          <button class="small-btn" onclick="editExpense(${exp.id})">Edit</button>
          <button class="small-btn" onclick="deleteAndReload(${exp.id})">
            Delete
          </button>
        </div>

      </div>
    `).join("");
}


async function deleteAndReload(id) {
  await deleteExpense(id);
  loadExpenses();
}


async function editExpense(id) {
  const amount = prompt("New amount:");
  const category = prompt("New category:");
  const description = prompt("New description:");

  const data = {};

  if (amount) data.amount = parseFloat(amount);
  if (category) data.category = category;
  if (description) data.description = description;

  await updateExpense(id, data);

  loadExpenses();
}


async function loadTotal() {
  const data = await getTotalReport();

  showReport("totalReport",`
    <h4>Total Expenses</h4>
    <p>₦${data.total_expenses}</p>
  `);
}



async function loadMonthly() {
  const data = await getMonthlyReport();

  if (!data || data.length === 0) {
    showReport("monthlyReport", "<p>No monthly reports yet</p>");
    return;
  }

  showReport("monthlyReport",
    data.map(r => `
      <div>
        ${r.month} → ₦${r.total_expense}
      </div>
    `).join("")
  );
}



async function loadDaily() {
  const data = await getDailyReport();

  showReport("dailyReport",
    data.map(d => `
      <div>
        ${d.date} | ${d.category} → ₦${d.amount}
      </div>
    `).join("")
  );
}


loadExpenses();


