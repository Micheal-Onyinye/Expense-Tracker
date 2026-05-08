
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.innerText = message;
  toast.className = `toast show ${type}`;
  
  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

async function register() {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!email || !username || !password) {
    showToast("All fields are required", "error");
    return;
  }

  try {
    await registerUser({ email, username, password });
    showToast("Account created! Redirecting...");
    
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);

  } catch (err) {
    showToast(err.message, "error");
  }
}

async function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");

  if (!usernameInput.value || !passwordInput.value) {
    showToast("Username and password required", "error");
    return;
  }

  try {
    const res = await loginUser({
      username: usernameInput.value,
      password: passwordInput.value
    });

    setToken(res.access_token);
    showToast("Login successful!");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  } catch (err) {
    showToast(err.message, "error");
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
