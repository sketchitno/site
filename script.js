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
        // 🚫 Stop further execution
        return Promise.reject("Redirecting as admin");
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

// DASHBOARD FUNCTION
window.onload = function() {
  if (window.location.pathname.includes("dashboard.html")) {
    const client = JSON.parse(sessionStorage.getItem("client"));

    if (!client) {
      alert("⚠️ Please log in first");
      window.location.href = "login.html";
      return;
    }

    // Fill client details
    document.getElementById("welcome").innerText = `Welcome, ${client.username}`;
    document.getElementById("clintNo").innerText = `Customer No : ${client.clientN}`;
    document.getElementById("projectName").innerText = `Project: ${client.name}`;
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
      let status = client.milestones[key];
      li.textContent = `${key}: ${status}`;
      li.style.borderLeft = "4px solid"; // ✅ ensure visible border

      if (status === "Complete") {
        li.style.borderLeftColor = "#16a34a"; // green
      } else if (status === "In Progress") {
        li.style.borderLeftColor = "#f59e0b"; // yellow
      } else {
        li.style.borderLeftColor = "#ef4444"; // red
      }
      milestonesList.appendChild(li);
    }

    // Project Image
    if (client.image) {
      document.getElementById("image").innerHTML =
        `<img src="${client.image}" alt="Project Model" style="max-width:100%;border-radius:12px;">`;
    }
  }
}

// LOGOUT
function logout() {
  sessionStorage.removeItem("client");
  window.location.href = "login.html";
}
function go() {
  sessionStorage.removeItem("client");
  window.location.href = "index.html";
}

// Toggle mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("show");
}


