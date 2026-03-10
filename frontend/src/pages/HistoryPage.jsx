import NavigationButtons from '../components/NavigationButtons';

export default function HistoryPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Shipment History' }
        ]}
      />
      <h1 className="title">Shipment History</h1>
      <p className="subtitle">The customer shipment history page will appear here.</p>
    </div>
  );
}
