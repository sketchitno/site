// LOGIN FUNCTION
function login() {
  const user = document.getElementById("username").value.trim().toLowerCase();
  const pass = document.getElementById("password").value.trim();

  // 🔑 Check Admins from JSON
  fetch("admins.json")
    .then(response => response.json())
    .then(adminData => {
      const admin = adminData.admins.find(
        a => a.username.toLowerCase() === user && a.password === pass
      );

      if (admin) {
        sessionStorage.setItem("admin", JSON.stringify(admin));
        window.location.href = "admin.html"; // redirect to admin page
        return Promise.reject("Redirecting as admin"); // stop further checks
      }

      // ✅ Check clients if not admin
      return fetch("projects.json");
    })
    .then(response => response.json())
    .then(clientData => {
      const client = clientData.projects.find(
        p => p.username.toLowerCase() === user && p.password === pass
      );

      if (client) {
        sessionStorage.setItem("client", JSON.stringify(client));
        window.location.href = "dashboard.html";
      } else {
        alert("❌ Invalid username or password");
      }
    })
    .catch(err => {
      if (err !== "Redirecting as admin") {
        console.error("⚠️ Error loading JSON", err);
        alert("⚠️ Could not load login data");
      }
    });
}

// DASHBOARD / ADMIN RENDERING
window.onload = function () {
  const path = window.location.pathname;

  // ✅ Client Dashboard
  if (path.includes("dashboard.html")) {
    const client = JSON.parse(sessionStorage.getItem("client"));
    if (!client) {
      alert("⚠️ Please log in first");
      window.location.href = "login.html";
      return;
    }

    document.getElementById("welcome").innerText = `Welcome, ${client.username}`;
    document.getElementById("customeNo").innerText = `Customer No : ${client.customeNo}`;
    document.getElementById("projectName").innerText = `Project: ${client.project}`;
    document.getElementById("started").innerText = `Started Date: ${client["started-date"]}`;
    document.getElementById("expected").innerText = `Expected End Date: ${client["expected-end-date"]}`;
    document.getElementById("enddate").innerText = `Delivered Date: ${client["end-date"]}`;
    document.getElementById("link").innerHTML = `Link: <a href="${client.link}" target="_blank">${client.link}</a>`;
    document.getElementById("status").innerText = `Current Status: ${client.status} (${client.progress}% Complete)`;
    document.getElementById("progress").style.width = client.progress + "%";

    // Milestones
    const milestonesList = document.getElementById("milestones");
    milestonesList.innerHTML = "";
    for (let key in client.milestones) {
      const li = document.createElement("p");
      li.textContent = `${key}: ${client.milestones[key]}`;
      milestonesList.appendChild(li);
    }

    // Project Image
    if (client.image) {
      document.getElementById("image").innerHTML =
        `<img src="${client.image}" alt="Project Model" style="max-width:100%;border-radius:12px;">`;
    }
  }

  // ✅ Admin Dashboard
  if (path.includes("admin.html")) {
    const admin = JSON.parse(sessionStorage.getItem("admin"));
    if (!admin) {
      alert("⚠️ Please log in first");
      window.location.href = "login.html";
      return;
    }

    // Example admin rendering
    document.getElementById("adminWelcome").innerText = `Welcome, ${admin.username}`;
    // You can expand with admin features (list projects, manage users, etc.)
  }
}

// LOGOUT
function logout() {
  sessionStorage.clear(); // removes both client and admin
  window.location.href = "login.html";
}

function go() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}
