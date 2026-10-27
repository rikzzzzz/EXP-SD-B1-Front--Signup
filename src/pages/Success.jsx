import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";

export default function Success() {
  return (
    <AuthLayout
      eyebrow="FLOW COMPLETE"
      title="Sign-in flow completed"
      subtitle="You have reached the success page in this frontend demonstration."
      footer={
        <span>
          Want to test again?{" "}
          <Link to="/signin">
            Return to sign in
          </Link>
        </span>
      }
    >
      <div className="success-panel">

        <div
          className="success-check"
          aria-hidden="true"
        >
          ✓
        </div>

        <h2>You're all set!</h2>

        <p>
          The mock sign-in form passed client-side
          validation and navigation worked.
        </p>

        <div className="status-row">
          <span
            className="status-indicator"
            aria-hidden="true"
          />

          Frontend demo successful
        </div>

      </div>

      <div className="disclaimer">
        <strong>Important:</strong> This page does not
        confirm a real identity. No backend, database,
        or authentication service is connected.
      </div>

      <Link
        className="primary-button button-link"
        to="/signin"
      >
        Return to Sign In
        <span aria-hidden="true">↗</span>
      </Link>

    </AuthLayout>
  );
}