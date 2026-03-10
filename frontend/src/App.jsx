import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateShipmentPage from './pages/CreateShipmentPage';
import TrackingPage from './pages/TrackingPage';
import HistoryPage from './pages/HistoryPage';
import PaymentPage from './pages/PaymentPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ReportsPage from './pages/ReportsPage';
import './index.css';

export default function App() {
  return (
    <div className="app-shell">
      <div className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/shipment/create" element={<CreateShipmentPage />} />          <Route path="/track" element={<TrackingPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="*" element={<div className="not-found">Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
