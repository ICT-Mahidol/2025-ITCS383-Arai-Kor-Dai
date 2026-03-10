/*
 * Main Application Script
 *
 * This file bootstraps the frontend application and handles basic UI initialization.
 * It is intentionally lightweight and does not implement full feature logic yet.
 * This module is the starting place for integrating page modules and components.
 */

const routes = {
  dashboard: 'pages/dashboard.html',
  parcels: 'pages/parcels.html',
  customers: 'pages/customers.html',
  tracking: 'pages/tracking.html',
  profile: 'pages/profile.html',
};

function setActiveNav(hash) {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const target = link.getAttribute('href').replace('#', '');
    if (target === hash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

async function loadRoute() {
  const content = document.getElementById('content');
  if (!content) return;

  const hash = (window.location.hash || '#dashboard').replace('#', '');
  setActiveNav(hash);
  const routeFile = routes[hash] || routes.dashboard;

  try {
    const response = await fetch(routeFile);
    if (!response.ok) {
      throw new Error(`Route file not found: ${routeFile}`);
    }

    const html = await response.text();
    content.innerHTML = html;

    if (hash === 'dashboard') {
      loadDashboardStats();
    }
  } catch (error) {
    content.innerHTML = `
      <div class="error-page">
        <h3>Page not found</h3>
        <p>${error.message}</p>
      </div>
    `;
    console.error(error);
  }
}

async function loadDashboardStats() {
  const statParcels = document.getElementById('stat-parcels');
  const statActive = document.getElementById('stat-active');
  const statPayments = document.getElementById('stat-payments');
  const statUpdates = document.getElementById('stat-updates');

  if (!statParcels || !statActive || !statPayments || !statUpdates) return;

  try {
    // Placeholder values; replace with real API calls later.
    statParcels.textContent = '128';
    statActive.textContent = '62';
    statPayments.textContent = '19';
    statUpdates.textContent = '7';

    document.getElementById('refresh-dashboard')?.addEventListener('click', loadDashboardStats);
  } catch (error) {
    console.error('Cannot load dashboard stats:', error);
    statParcels.textContent = 'N/A';
    statActive.textContent = 'N/A';
    statPayments.textContent = 'N/A';
    statUpdates.textContent = 'N/A';
  }
}

window.addEventListener('hashchange', loadRoute);
window.addEventListener('DOMContentLoaded', loadRoute);
