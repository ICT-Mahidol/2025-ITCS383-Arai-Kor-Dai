import NavigationButtons from '../components/NavigationButtons';

export default function PaymentPage() {
  return (
    <div className="card">
      <NavigationButtons
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Payment' }
        ]}
      />
      <h1 className="title">Payment</h1>
      <p className="subtitle">Online payment options (PromptPay / Credit Card / E-Wallet).</p>
    </div>
  );
}
