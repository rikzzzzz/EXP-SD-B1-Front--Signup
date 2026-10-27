import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";

export default function SignIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

 
function handleSubmit(event) {
  event.preventDefault();

  const nextErrors = {};

  if (!values.email.trim()) {
    nextErrors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    nextErrors.password = "Please enter your password.";
  }

  if (Object.keys(nextErrors).length > 0) {
    setErrors(nextErrors);
    return;
  }

  const savedUser = localStorage.getItem("demoUser");

  if (!savedUser) {
    setErrors({
      email: "Please register first.",
      password: "",
    });
    return;
  }

  const registeredUser = JSON.parse(savedUser);

  if (
    values.email.trim().toLowerCase() !== registeredUser.email ||
    values.password !== registeredUser.password
  ) {
    setErrors({
      email: "Incorrect email or password.",
      password: "Incorrect email or password.",
    });
    return;
  }

  setErrors({});
  setSubmitting(true);

  window.setTimeout(() => {
    navigate("/success", { replace: true });
  }, 300);
}


  return (
    <AuthLayout
      eyebrow="WELCOME BACK"
      title="Sign in to AuthFlow"
      subtitle="Enter your details to try the mock sign-in flow."
      footer={
        <span>
          New here?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} noValidate>

        <FormField
          id="email"
          label="Email address"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <FormField
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <div className="mock-notice">
          <span
            className="notice-dot"
            aria-hidden="true"
          />

          <p>
            <strong>Demo mode</strong> — any email
            in a valid format and any non-empty password
            will continue. This is not real authentication.
          </p>
        </div>

        <button
          className="primary-button"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Signing in..." : "Sign in"}

          {!submitting && (
            <span aria-hidden="true">→</span>
          )}
        </button>

      </form>
    </AuthLayout>
  );
}