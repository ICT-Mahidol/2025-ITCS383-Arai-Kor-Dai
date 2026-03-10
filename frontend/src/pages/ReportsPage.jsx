import NavigationButtons from '../components/NavigationButtons';

export default function ReportsPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Reports' }
        ]}
      />
      <h1 className="title">Reports</h1>
      <p className="subtitle">View revenue reports and operational insights.</p>
    </div>
  );
}
