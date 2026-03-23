# 2025-ITCS383-Arai-Kor-Dai
## Team Member
  1) 6688046	Warut	        Khamkaveephart
  2) 6688194	Muhummadcharif 	kapa
  3) 6688083	Teeramanop 	    Pinsupa
  4) 6688148	Bunyakorn	    Wongchadakul
  5) 6688205	Sirawit	        Noomanoch
  6) 6688226	Thanawat	    Thanasirithip

 ## Overall Project Structure

Post-Office System

```
├── README.md
├── designs
│   └── D1_Design.md
├── frontend
├── backend
└── database
```

---

## Frontend File Structure

```
frontend/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── Pages/
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── Agent.md
```

---

## Backend File Structure

```
implementations/
└── backend/
    ├── node_modules/
    ├── routes/
    │   ├── activity.js
    │   ├── notifications.js
    │   ├── shipments.js
    │   └── users.js
    ├── .env
    ├── db.js
    ├── package-lock.json
    ├── package.json
    └── server.js
```

---

## Database File Structure

```
database/
├── schema.sql
├── seed.sql
└── migrations
    ├── create_users_table.sql
    ├── create_shipments_table.sql
    ├── create_payments_table.sql
    └── create_tracking_table.sql
```

# Post Office Online Shipping System

## Project Overview

**Domain:** Post Office Online Shipping System  

**Purpose:**  
This system allows customers to prepare parcels or letters before going to the post office. Users can register, create shipping transactions, pay online, and print a shipping label. The label can be attached to the parcel or letter before dropping it off at a post office box or service location.

---

## Main Features

- Customer registration with identity verification  
  (upload national ID card and photo holding the ID)

- Account approval process by post office staff

- Customer login using email and password

- Create shipping orders by selecting parcel type, size, and weight

- Enter receiver information and delivery location

- Automatic price calculation for shipping services

### Electronic Payment Methods
- Mobile banking (PromptPay)
- Credit card
- E-wallet (e.g., TrueMoney Wallet)

- Generate a **PDF shipping label** containing sender and receiver details and a QR code for parcel tracking

- Customers can track parcel status using a tracking number

- Optional insurance for valuable items

### Administrative Dashboard
Post office staff can:

- Monitor number of parcels per **day, week, and month**
- View revenue reports
- Generate **formatted PDF reports** for management

---

## System Requirements

- High availability with **99.999% uptime**
- Fast response time (pages should respond within **1 second**)
- Strong security to protect sensitive information such as national ID and payment data
- Data encryption for **database storage and network transmission**
- System theme follows **Thailand Post design (white and red)**

---

## Architecture

The project is separated into two main parts:

### Backend

**Node.js + Express**

Provides REST API services and handles database operations.

### Frontend

**React / Web Interface**

Provides user interfaces for customers and staff to interact with the system.

---

# Getting Started — Run Locally

## Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes bundled with Node.js)
- [Git](https://git-scm.com/)

---

## 1. Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/ICT-Mahidol/2025-ITCS383-Arai-Kor-Dai.git
cd 2025-ITCS383-Arai-Kor-Dai
```

---

## 2. Run the Backend

Open a terminal, navigate to the backend folder, install dependencies, and start the server:

```bash
cd implementations/backend
npm install
node server.js
```

The backend server should now be running. Keep this terminal open.

---

## 3. Run the Frontend (React)

Open a **second terminal**, navigate to the frontend folder, install dependencies, and start the dev server:

```bash
cd implementations/frontend
npm install
npm start
```

When prompted `Would you like to run the app on another port instead? (Y/n)`, press `Y`.

Your browser should automatically open at `http://localhost:3001` (port 3000 is already occupied by the backend).

---

## Quick Summary

| Step | Command |
|------|---------|
| Install & start backend | `cd implementations/backend && npm install && node server.js` |
| Install & start frontend | `cd implementations/frontend && npm install && npm start` |

---

## Troubleshooting

- **Port already in use** — If you see `Would you like to run the app on another port instead? (Y/n)`, simply press `Y` to run on the next available port, or free up the port and restart.
- **`npm` not found** — Install [Node.js](https://nodejs.org/) first; npm is included.
- **Backend not connecting** — Ensure the backend terminal is still running before starting the frontend.
