The first we use for 

Read the AGENTS.md file and generate the initial project structure for the Post Office Management System.

Requirements:

Separate frontend and backend directories.
Backend must use Node.js with Express and PostgreSQL.
Follow MVC architecture with folders: routes, controllers, models, middleware, config.
Frontend must contain pages, css, js, components, and assets folders.
Generate:

Full project folder structure.
Backend starter files including:
server.js
database connection (PostgreSQL)
basic Express configuration
Frontend starter files including:
index.html
base CSS
base JavaScript file for API calls.
Include comments explaining the purpose of each file.
Do not implement full features yet, only create the clean system skeleton based on AGENTS.md.


the result is :

✅ Project Initialization Complete!
I've successfully generated the complete Post Office Management System project skeleton based on your Agend.md specifications. Here's what was created:

📁 Backend Structure (backend)
config/ - Server and database configuration files
database.js - PostgreSQL connection pool with parameterized query support
config.js - Centralized environment configuration
routes/ - API endpoint definitions (ready for implementation)
controllers/ - Business logic handlers (skeleton prepared)
models/ - Database entity models (skeleton prepared)
middleware/ - Express middleware (authentication, validation, etc.)
server.js - Main Express server with middleware setup
package.json - Dependencies (Express, PostgreSQL driver, dotenv, CORS)
.env.example - Environment configuration template
🎨 Frontend Structure (frontend)
index.html - Main landing page with navigation and layout
css/ - styles.css with CSS variables, responsive grid, typography, and component styles
js/ - api.js - Fully functional REST API client module with GET/POST/PUT/DELETE methods
pages/ - Directory for 15+ page templates (documented roadmap)
components/ - Directory for reusable UI components (documented structure)
assets/ - Static assets directory with organization guidelines
📚 Documentation
PROJECT_INITIALIZATION.md - Complete setup guide with:
Environment variable configuration
Database setup instructions
Backend/frontend development roadmap
Next steps broken into phases
Technology stack overview
✨ Key Features
✓ Full MVC architecture with clean separation of concerns
✓ PostgreSQL connection pooling with parameterized queries
✓ API client with JWT token support and error handling
✓ Responsive CSS framework with mobile-first design
✓ All files include detailed comments explaining purpose and usage

---

## [Progress Update] Frontend bootstrapping and dependency install (2026-03-10)
- Created `frontend/js/app.js` with initial DOM setup and a placeholder welcome view
- Updated `frontend/index.html` to include `js/app.js`
- Added `frontend/package.json` with `live-server` dev dependency and start script
- Installed frontend dependencies by running `npm install` in `frontend`
- `live-server` v1.2.2 installed, 6 vulnerabilities found in dependencies (out of scope for immediate bootstrap)

Next steps:
1. Add real page modules under `frontend/pages` and reusable components under `frontend/components`
2. Wire dynamic navigation and route handling in `frontend/js/app.js` (completed)
3. Start backend and connect `api.js` to real API routes

## [Progress Update] UX/UI refresh and dashboard polish (2026-03-10)
- Enhanced `frontend/css/styles.css` with modern gradients, shadows, spacing, responsive stats cards, and UI transitions.
- Added active nav state style and `setActiveNav` in `frontend/js/app.js` for better navigation context.
- Refined welcome and dashboard page visuals to feel more professional and user-friendly.
- Now the app is more ready for non-technical users and better suited for product demo.

## [Progress Update] React app migration and full modern stack setup (2026-03-10)
- Replaced basic static frontend with React + Vite project structure:
  - `src/main.jsx`, `src/App.jsx`, `src/index.css`
  - React Router routes: `/register`, `/dashboard`, `/shipment/create`, `/track`, `/history`
- Added `src/pages/RegisterPage.jsx` with full register form and validation.
- Added support pages: `DashboardPage`, `CreateShipmentPage`, `TrackingPage`, `HistoryPage`.
- Added `src/utils/apiClient.js` using Axios and `src/services/authService.js`.
- Added `vite.config.js`, and new `frontend/package.json` for Vite/React/Routing.
- Installed dependencies successfully with `npm install`.

## [Progress Update] Register page and theme refined (2026-03-10)
- Register UI using card layout, red primary theme, white background, responsive.
- Form behavior covers required inputs, email, password length, file presence.
- Submit to `/api/auth/register` with `FormData` and file upload headers.
- Loading indicator and messages implemented.

## [Progress Update] Navigation buttons component added (2026-03-10)
- Added `src/components/NavigationButtons.jsx` with Home and Back button logic.
- Home navigates to `/`, Back navigates to `-1` (previous history).
- Applied to pages: `RegisterPage`, `LoginPage`, `CreateShipmentPage`, `PaymentPage`, `TrackingPage`, `HistoryPage`, `AdminDashboardPage`, `ReportsPage`.
- Added `admin` and `reports` routes to `src/App.jsx`.
- Added navigation button CSS in `src/index.css`.
