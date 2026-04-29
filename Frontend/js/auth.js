
console.log("Auth JS loaded");

async function register() {
  try {
    console.log("register clicked");

    if (!registerUser) {
      throw new Error("registerUser not loaded");
    }

    const res = await registerUser({
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    });

    console.log(res);

    alert("Account created successfully");

    window.location.href = "login.html";

  } catch (err) {
    console.log("ERROR:", err);
    alert(err.message);
  }
}


async function login() {
  console.log({
  username: document.getElementById("username").value,
  password: document.getElementById("password").value
});
  try {
    const res = await loginUser({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    });

    console.log("LOGIN RESPONSE:", res);

    setToken(res.access_token);

    window.location.href = "dashboard.html";

  } catch (err) {
    console.log("LOGIN ERROR:", err);

    alert(err.message || JSON.stringify(err));
  }
}


function getToken() {
  return localStorage.getItem("token");
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}