import { Link, useNavigate } from 'react-router-dom';

export default function NavigationButtons({ showBackButton = true, breadcrumbs = [] }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-buttons">
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          🏠 Home
        </button>
        {showBackButton && (
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            ⬅ Back
          </button>
        )}
      </div>

      {breadcrumbs.length > 0 && (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((item, index) => (
            <span key={item.path || item.label} className="breadcrumb-item">
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="breadcrumb-separator">/</span>}
            </span>
          ))}
        </nav>
      )}
    </>
  );
}
