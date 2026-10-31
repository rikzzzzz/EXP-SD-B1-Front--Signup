
import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";
import { registerUser } from "../services/authService.js";

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validate(values) {
  const errors = {};

  // Full name validation
  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  // Email validation
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      values.email.trim()
    )
  ) {
    errors.email = "Enter a valid email address.";
  }

  // Password validation
  if (!values.password) {
    errors.password = "Please enter a password.";
  } else if (
    values.password.length < 8 ||
    !/[A-Z]/.test(values.password) ||
    !/[a-z]/.test(values.password) ||
    !/[0-9]/.test(values.password) ||
    !/[^A-Za-z0-9]/.test(values.password)
  ) {
    errors.password =
      "Use 8+ characters with uppercase, lowercase, a number, and a special character.";
  }

  // Confirm password validation
  if (!values.confirmPassword) {
    errors.confirmPassword =
      "Please confirm your password.";
  } else if (
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword =
      "Passwords do not match.";
  }

  return errors;
}

export default function Register() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      ...(name === "password"
        ? { confirmPassword: "" }
        : {}),
    }));

    setSuccess(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSuccess(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);

      const result = await registerUser({
        name: values.fullName.trim(),
        email: values.email.trim().toLowerCase(),
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      console.log("Registration response:", result);

      setSuccess(true);
      setErrors({});
      setValues(initialValues);

    } catch (error) {
      console.error("Registration API error:", error);

      setErrors({
        email:
          error.message ||
          "Registration failed. Please try again.",
      });

    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout
      eyebrow="GET STARTED"
      title="Create your account"
      subtitle="Enter your details to create your account."
      footer={
        <span>
          Already have an account?{" "}
          <Link to="/signin">Sign in</Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          id="fullName"
          label="Full name"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="Enter your full name"
          autoComplete="name"
        />

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
          placeholder="Create a strong password"
          autoComplete="new-password"
          helpText="8+ characters, uppercase, lowercase, number, and special character."
        />

        <FormField
          id="confirmPassword"
          label="Confirm password"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="Re-enter your password"
          autoComplete="new-password"
        />

        {success && (
          <div
            className="alert alert-success"
            role="status"
          >
            <span
              className="alert-icon"
              aria-hidden="true"
            >
              ✓
            </span>

            <div>
              <strong>
                Registration successful!
              </strong>

              <p>
                Your account has been created successfully.
              </p>

              <Link
                className="alert-link"
                to="/signin"
              >
                Continue to Sign In →
              </Link>
            </div>
          </div>
        )}

        <button
          className="primary-button"
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Creating account..."
            : "Create account"}

          {!submitting && (
            <span aria-hidden="true">→</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
