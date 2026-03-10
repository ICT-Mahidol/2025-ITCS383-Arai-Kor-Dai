import NavigationButtons from '../components/NavigationButtons';

export default function TrackingPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Track Your Parcel' }
        ]}
      />
      <h1 className="title">Track Parcel</h1>
      <p className="subtitle">Parcel tracking input and status display will be implemented here.</p>
    </div>
  );
}
