
if (!localStorage.getItem("token")) {
  window.location.href = "login.html";
}

// UI Helpers
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

function openEditModal(id, amount, category, description) {
  document.getElementById("editId").value = id;
  document.getElementById("editAmount").value = amount;
  document.getElementById("editCategory").value = category;
  document.getElementById("editDescription").value = description;
  document.getElementById("editModal").classList.add("active");
}

function closeEditModal() {
  document.getElementById("editModal").classList.remove("active");
}

// Core Functions
async function handleAddExpense() {
  const amountInput = document.getElementById("amount");
  const categoryInput = document.getElementById("category");
  const descriptionInput = document.getElementById("description");

  if (!amountInput.value || !categoryInput.value) {
    showToast("Amount and category are required", "error");
    return;
  }

  try {
    const data = {
      amount: parseFloat(amountInput.value),
      category: categoryInput.value,
      description: descriptionInput.value
    };

    await addExpense(data);
    showToast("Expense added successfully!");

    // clear inputs
    amountInput.value = "";
    categoryInput.value = "";
    descriptionInput.value = "";

    loadExpenses();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function loadExpenses() {
  try {
    const expenses = await getExpenses();
    const listContainer = document.getElementById("expenseList");
    const totalDisplay = document.getElementById("mainTotal");

    let total = 0;

    if (expenses.length === 0) {
      listContainer.innerHTML = '<p style="text-align:center; padding: 2rem; color: #64748b;">No transactions yet.</p>';
      totalDisplay.innerText = "₦0.00";
      return;
    }

    listContainer.innerHTML = expenses.map(exp => {
      total += exp.amount;
      return `
        <div class="expense-item">
          <div class="expense-info">
            <b>${exp.category}</b>
            <small>${exp.description || "No description"}</small>
          </div>
          <div style="display: flex; align-items: center;">
            <span class="expense-amount">₦${exp.amount.toLocaleString()}</span>
            <div class="expense-actions">
              <button class="btn-outline" style="padding: 0.4rem 0.8rem;" onclick="openEditModal(${exp.id}, ${exp.amount}, '${exp.category}', '${exp.description || ""}')">Edit</button>
              <button class="btn-danger" onclick="deleteAndReload(${exp.id})">Delete</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    totalDisplay.innerText = `₦${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

  } catch (err) {
    showToast("Failed to load expenses", "error");
  }
}

async function handleUpdateExpense() {
  const id = document.getElementById("editId").value;
  const amount = document.getElementById("editAmount").value;
  const category = document.getElementById("editCategory").value;
  const description = document.getElementById("editDescription").value;

  try {
    await updateExpense(id, {
      amount: parseFloat(amount),
      category: category,
      description: description
    });

    showToast("Expense updated!");
    closeEditModal();
    loadExpenses();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function deleteAndReload(id) {
  if (!confirm("Are you sure you want to delete this expense?")) return;
  
  try {
    await deleteExpense(id);
    showToast("Expense deleted");
    loadExpenses();
  } catch (err) {
    showToast(err.message, "error");
  }
}

async function loadDaily() {
  try {
    const data = await getDailyReport();
    const display = document.getElementById("reportDisplay");
    display.classList.remove("hidden");

    if (data.length === 0) {
      display.innerHTML = "<p>No daily data available.</p>";
      return;
    }

    display.innerHTML = `
      <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem;">Daily Summary</h4>
      <div style="font-size: 0.85rem; color: #475569;">
        ${data.map(d => `
          <div style="display:flex; justify-content:space-between; padding: 0.25rem 0; border-bottom: 1px solid #f1f5f9;">
            <span>${d.date} (${d.category})</span>
            <b>₦${d.amount.toLocaleString()}</b>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    showToast("Failed to load daily report", "error");
  }
}

async function loadMonthly() {
  try {
    const data = await getMonthlyReport();
    const display = document.getElementById("reportDisplay");
    display.classList.remove("hidden");

    if (data.length === 0) {
      display.innerHTML = "<p>No monthly data available.</p>";
      return;
    }

    display.innerHTML = `
      <h4 style="margin-bottom: 0.5rem; font-size: 0.9rem;">Monthly Report</h4>
      <div style="font-size: 0.85rem; color: #475569;">
        ${data.map(r => `
          <div style="display:flex; justify-content:space-between; padding: 0.25rem 0; border-bottom: 1px solid #f1f5f9;">
            <span>${r.month}</span>
            <b>₦${r.total_expense.toLocaleString()}</b>
          </div>
        `).join("")}
      </div>
    `;
  } catch (err) {
    showToast("Failed to load monthly report", "error");
  }
}

// Initialize
loadExpenses();
