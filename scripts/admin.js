const API_URL = "http://localhost:3000";

let adminToken = localStorage.getItem("adminToken");
let allOrders = [];

// Check if user is logged in
function checkAuth() {
  if (!adminToken) {
    showLoginModal();
  } else {
    loadDashboard();
  }
}

// Show login modal
function showLoginModal() {
  const modal = document.createElement("div");
  modal.className = "login-modal-overlay";
  modal.innerHTML = `
    <div class="login-modal">
      <div class="login-header">
        <i class="fa-solid fa-utensils"></i>
        <h1>Ember & Ash Admin</h1>
      </div>
      <form class="login-form" id="loginForm">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter username" 
            required 
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter password" 
            required 
          />
        </div>
        <button type="submit" class="button-primary login-btn">Sign In</button>
        <div class="login-error" id="loginError"></div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("loginForm").addEventListener("submit", handleLogin);
}

// Handle login
async function handleLogin(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorDiv = document.getElementById("loginError");

  try {
    const response = await fetch(`${API_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      adminToken = data.token;
      localStorage.setItem("adminToken", adminToken);
      document.querySelector(".login-modal-overlay").remove();
      loadDashboard();
    } else {
      errorDiv.textContent = data.message || "Login failed";
    }
  } catch (error) {
    errorDiv.textContent = "Connection error. Please try again.";
    console.error("Login error:", error);
  }
}

// Load dashboard data
async function loadDashboard() {
  try {
    const response = await fetch(`${API_URL}/orders`);
    const data = await response.json();

    if (data.success) {
      allOrders = data.orders;
      updateMetrics(data.metrics);
      renderOrdersTable(allOrders);
      setupEventListeners();
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
    alert("Failed to load dashboard data");
  }
}

// Update metrics cards
function updateMetrics(metrics) {
  const cards = document.querySelectorAll(".metric-card");

  if (cards[0]) {
    cards[0].querySelector(".metric-value").textContent = metrics.totalOrders;
  }
  if (cards[1]) {
    const revenue = metrics.totalRevenue;
    cards[1].querySelector(".metric-value").textContent =
      revenue > 0 ? `₦${revenue.toLocaleString()}` : "₦0";
  }
  if (cards[2]) {
    cards[2].querySelector(".metric-value").textContent = metrics.pendingOrders;
  }
  if (cards[3]) {
    const returnRate =
      metrics.totalOrders > 0
        ? Math.round((metrics.confirmedOrders / metrics.totalOrders) * 100)
        : 0;
    cards[3].querySelector(".metric-value").textContent = returnRate + "%";
  }
}

// Render orders table
function renderOrdersTable(orders) {
  const tbody = document.querySelector(".orders-table tbody");

  if (orders.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: #b0adb5;">
          No orders found
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = orders
    .map(
      (order) => `
    <tr data-order-id="${order._id}">
      <td>#${order.reference.slice(-6).toUpperCase()}</td>
      <td>${order.email}</td>
      <td>
        <select class="status-select" data-order-id="${order._id}">
          <option value="pending" ${order.status === "pending" ? "selected" : ""}>Pending</option>
          <option value="confirmed" ${order.status === "confirmed" ? "selected" : ""}>Confirmed</option>
          <option value="delivered" ${order.status === "delivered" ? "selected" : ""}>Delivered</option>
          <option value="cancelled" ${order.status === "cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>
      <td>₦${order.amount.toLocaleString()}</td>
      <td>${new Date(order.createdAt).toLocaleDateString()}</td>
    </tr>
  `,
    )
    .join("");

  // Attach status change listeners
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", handleStatusChange);
  });
}

// Handle status change
async function handleStatusChange(e) {
  const orderId = e.target.dataset.orderId;
  const newStatus = e.target.value;

  try {
    const response = await fetch(`${API_URL}/order/${orderId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();

    if (data.success) {
      // Update the order in allOrders array
      const order = allOrders.find((o) => o._id === orderId);
      if (order) {
        order.status = newStatus;
      }
      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } else {
      alert("Failed to update status");
    }
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Error updating order status");
  }
}

// Setup event listeners
function setupEventListeners() {
  // Search functionality
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("input", handleSearch);
  }

  // Sign out button
  const signOutBtn = document.querySelector(".admin-actions .button-primary");
  if (signOutBtn) {
    signOutBtn.addEventListener("click", handleSignOut);
  }

  // View store button
  const viewStoreBtn = document.querySelector(
    ".admin-actions .button-secondary",
  );
  if (viewStoreBtn) {
    viewStoreBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}

// Handle search
function handleSearch(e) {
  const query = e.target.value.toLowerCase();

  const filtered = allOrders.filter(
    (order) =>
      order.reference.toLowerCase().includes(query) ||
      order.email.toLowerCase().includes(query) ||
      order._id.toLowerCase().includes(query),
  );

  renderOrdersTable(filtered);
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", handleStatusChange);
  });
}

// Handle sign out
function handleSignOut() {
  if (confirm("Are you sure you want to sign out?")) {
    localStorage.removeItem("adminToken");
    adminToken = null;
    location.reload();
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", checkAuth);

// Auto-refresh orders every 30 seconds
setInterval(() => {
  if (adminToken) {
    loadDashboard();
  }
}, 30000);
