import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../components/AuthLayout.jsx";
import FormField from "../components/FormField.jsx";

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

 function handleSubmit(event) {
  event.preventDefault();

  const nextErrors = validate(values);
  setErrors(nextErrors);
  setSuccess(false);

  if (Object.keys(nextErrors).length > 0) {
    return;
  }

  try {
    const user = {
      fullName: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
    };

    // Save registration in browser localStorage
    localStorage.setItem("demoUser", JSON.stringify(user));

    // Confirm the save succeeded
    const savedUser = localStorage.getItem("demoUser");

    if (!savedUser) {
      throw new Error("Registration was not saved.");
    }

    setSuccess(true);
  } catch (error) {
    console.error("Registration save error:", error);
    setErrors({
      email: "Could not save registration. Please try again.",
    });
  }
}

  return (
    <AuthLayout
      eyebrow="GET STARTED"
      title="Create your account"
      subtitle="Enter your details to validate the registration form."
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
                Registration form validated!
              </strong>

              <p>
                Validation passed locally.
                No account was created on a server.
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
            ? "Validating..."
            : "Validate registration"}

          {!submitting && (
            <span aria-hidden="true">→</span>
          )}
        </button>

      </form>
    </AuthLayout>
  );
}