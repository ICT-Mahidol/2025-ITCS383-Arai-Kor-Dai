import { Link } from 'react-router-dom';
import NavigationButtons from '../components/NavigationButtons';

export default function LoginPage() {
  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Login' }
        ]}
      />
      <h1 className="title">Login</h1>
      <p className="subtitle">Welcome back. Login to manage your shipping labels.</p>
      <form>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
          <input id="email" type="email" className="form-input" placeholder="example@thai.post" required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password <span className="required">*</span></label>
          <input id="password" type="password" className="form-input" required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
      <p className="small-text">
        New user? <Link to="/register">Sign up here</Link>
      </p>
    </div>
  );
}
