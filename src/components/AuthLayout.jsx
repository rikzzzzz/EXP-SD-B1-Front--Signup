export default function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}) {
  return (
    <main className="page-shell">
      <section className="auth-card" aria-labelledby="page-title">

        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            A
          </div>

          <span className="brand-name">
            AuthFlow
          </span>

          <span className="demo-badge">
            DEMO
          </span>
        </div>

        <div className="auth-heading">
          <p className="eyebrow">
            {eyebrow}
          </p>

          <h1 id="page-title">
            {title}
          </h1>

          <p className="subtitle">
            {subtitle}
          </p>
        </div>

        {children}

        {footer && (
          <div className="auth-footer">
            {footer}
          </div>
        )}

      </section>

      <p className="page-note">
        Frontend demonstration only
        <span aria-hidden="true"> · </span>
        No backend connected
      </p>
    </main>
  );
}