import NavigationButtons from '../components/NavigationButtons';

export default function CreateShipmentPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Create Shipment' }
        ]}
      />
      <h1 className="title">Create Shipment</h1>
      <p className="subtitle">Shipment form and price calculator will be implemented here.</p>
    </div>
  );
}
