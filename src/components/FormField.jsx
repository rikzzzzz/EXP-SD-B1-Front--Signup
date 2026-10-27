export default function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  helpText,
  required = true,
}) {
  return (
    <div
      className={`form-field ${error ? "has-error" : ""}`}
    >
      <label htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? `${id}-error`
            : helpText
              ? `${id}-help`
              : undefined
        }
      />

      {error && (
        <p
          className="field-error"
          id={`${id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}

      {!error && helpText && (
        <p
          className="field-help"
          id={`${id}-help`}
        >
          {helpText}
        </p>
      )}
    </div>
  );
}