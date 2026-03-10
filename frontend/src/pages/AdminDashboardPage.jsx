import NavigationButtons from '../components/NavigationButtons';

export default function AdminDashboardPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Admin Dashboard' }
        ]}
      />
      <h1 className="title">Admin Dashboard</h1>
      <p className="subtitle">Manage system users and view parcel statistics.</p>
    </div>
  );
}
