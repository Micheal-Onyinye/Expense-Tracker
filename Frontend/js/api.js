const BASE_URL = "https://expense-tracker-hhlo.onrender.com";
console.log("api.js loaded");


function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}



function authHeaders(includeContentType = false) {
  const headers = {
    "Authorization": "Bearer " + getToken()
  };

  if (includeContentType) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}



async function handleResponse(res) {
  if (res.status === 401) {
    logout();
    throw new Error("Unauthorized");
  }

  // handle empty response (e.g., DELETE 204)
  if (res.status === 204) {
    return null;
  }

  const data = await res.json();

  if (!res.ok) {
    console.log("FULL BACKEND ERROR:", data);
    throw new Error(data.detail || JSON.stringify(data));
  }

  return data;
}



async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return handleResponse(res);
}



async function loginUser(data) {
  const formData = new URLSearchParams();
  formData.append("username", data.username);
  formData.append("password", data.password);

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: formData
  });

  return handleResponse(res);
}


async function addExpense(data) {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: authHeaders(true),
    body: JSON.stringify(data)
  });

  return handleResponse(res);
}



async function getExpenses() {
  const res = await fetch(`${BASE_URL}/expenses/`, {
    headers: authHeaders()
  });

  return handleResponse(res);
}



async function updateExpense(id, data) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "PUT",
    headers: authHeaders(true),
    body: JSON.stringify(data)
  });

  return handleResponse(res);
}



async function deleteExpense(id) {
  const res = await fetch(`${BASE_URL}/expenses/${id}`, {
    method: "DELETE",
    headers: authHeaders()
  });

  return handleResponse(res);
}



async function getTotalReport() {
  const res = await fetch(`${BASE_URL}/reports/total`, {
    headers: authHeaders()
  });

  return handleResponse(res);
}



async function getDailyReport() {
  const res = await fetch(`${BASE_URL}/reports/daily`, {
    headers: authHeaders()
  });

  return handleResponse(res);
}



async function getMonthlyReport() {
  const res = await fetch(`${BASE_URL}/reports/monthly`, {
    headers: authHeaders()
  });

  return handleResponse(res);
}