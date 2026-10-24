export function RefundPolicy() {
  return (
    <div className="refund reveal">
      {" "}
      <span className="refund-icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
          <path d="M8.5 12l2.5 2.5 4.5-5" />
        </svg>
      </span>{" "}
      <div>
        <h3>{"7-Day Refund Policy"}</h3>
        <p>
          {"Register and pay to secure your seat. Attend the orientation session — then you have "}
          <strong>{"7 days"}</strong>
          {" to decide. If the program isn't the right fit, email Bassa directly at "}
          <a href="mailto:basazinb12@gmail.com">{"basazinb12@gmail.com"}</a>
          {" for a full refund, no questions asked. After 7 days, all sales are final."}
        </p>
      </div>{" "}
      <ol className="refund-steps" aria-label="How the refund window works">
        <li>{"Pay to register"}</li>
        <li>{"Attend orientation"}</li>
        <li>{"7-day refund window opens"}</li>
        <li>{"Full refund, no questions asked"}</li>
      </ol>{" "}
    </div>
  );
}
