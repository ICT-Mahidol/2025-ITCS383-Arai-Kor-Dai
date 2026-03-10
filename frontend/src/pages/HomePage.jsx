import { Link, useNavigate } from 'react-router-dom';
import NavigationButtons from '../components/NavigationButtons';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="homepage-header card">
        <NavigationButtons showBackButton={false} />
        <div className="logo">Thailand Post System</div>
        <div className="header-buttons">
          <Link to="/login" className="btn btn-outline">Login</Link>
          <Link to="/register" className="btn">Sign Up</Link>
        </div>
      </header>

      <main className="hero-section card">
        <div className="hero-content">
          <h1>Create Shipping Labels Online</h1>
          <p className="hero-subtitle">Prepare your parcel before arriving at the post office.</p>
          <p className="hero-description">
            Users can create shipment labels, pay online, print labels, and drop parcels at any Thailand Post service location.
          </p>
          <button onClick={() => navigate('/register')} className="btn btn-primary hero-cta">
            Start Shipping
          </button>
        </div>
      </main>

      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Create Shipment Online</h3>
          <p>Create orders in advance and streamline drop-off in-store.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Pay Electronically</h3>
          <p>Use PromptPay, credit card, or e-wallet securely.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3>Track Your Parcel</h3>
          <p>Track status in real-time until delivery completion.</p>
        </div>
      </section>

      <footer className="footer card">Thailand Post Online System</footer>
    </div>
  );
}
