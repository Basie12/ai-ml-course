const REFUND_STEPS = [
  "Pay to register",
  "Attend orientation",
  "7-day refund window opens",
  "Full refund, no questions asked",
];

export function RefundPolicy() {
  return (
    <div className="refund-box" id="refund">
      <div className="refund-icon" aria-hidden>
        🛡️
      </div>
      <div className="refund-body">
        <div className="refund-title">7-Day Refund Policy</div>
        <p>
          Register and pay to secure your seat. Attend the orientation session —
          then you have <strong>7 days</strong> to decide. If the program
          isn&apos;t the right fit, email Bassa directly at{" "}
          <a href="mailto:basazinb12@gmail.com">basazinb12@gmail.com</a> for a
          full refund, no questions asked. After 7 days, all sales are final.
        </p>
      </div>
      <ul className="refund-steps">
        {REFUND_STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
