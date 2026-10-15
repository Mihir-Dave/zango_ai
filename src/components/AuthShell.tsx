
"use client";


import Link from "next/link";
import { Button } from "./Button";

type AuthMode =
  | "sign-in"
  | "create-account"
  | "forgot-password"
  | "reset-password"
  | "check-email";

type AuthShellProps = {
  mode: AuthMode;
};

const pageContent = {
  "sign-in": {
    title: "Welcome back",
    subtitle: "Sign in to continue to your hiring workspace.",
    fields: [
      { label: "WORK EMAIL", placeholder: "name@company.com", type: "email" },
      { label: "PASSWORD", placeholder: "Enter your password", type: "password" },
    ],
    button: "Sign in",
    footer: "New to ABC Company? Create your account",
    footerHref: "/auth/create-account",
  },
  "create-account": {
    title: "Create your account",
    subtitle: "Set up your profile to join the hiring workspace.",
    fields: [
      { label: "FULL NAME", placeholder: "Your name", type: "text" },
      { label: "WORK EMAIL", placeholder: "name@company.com", type: "email" },
      { label: "PASSWORD", placeholder: "Create a password", type: "password" },
    ],
    button: "Create account",
    footer: "Already have an account? Sign in",
    footerHref: "/auth/sign-in",
  },
  "forgot-password": {
    title: "Forgot your password?",
    subtitle: "Enter your work email and we'll send you a secure reset link.",
    fields: [
      { label: "WORK EMAIL", placeholder: "name@company.com", type: "email" },
    ],
    button: "Send reset link",
    footer: "Back to sign in",
    footerHref: "/auth/sign-in",
  },
  "reset-password": {
    title: "Set a new password",
    subtitle: "Create a password you haven't used for this workspace before.",
    fields: [
      { label: "NEW PASSWORD", placeholder: "Enter a new password", type: "password" },
      {
        label: "CONFIRM PASSWORD",
        placeholder: "Re-enter your new password",
        type: "password",
      },
    ],
    button: "Update password",
    footer: "Back to sign in",
    footerHref: "/auth/sign-in",
  },
  "check-email": {
    title: "Check your email",
    subtitle:
      "We sent a password reset link to name@company.com. The link expires in 30 minutes.",
    fields: [],
    button: "Return to sign in",
    footer: "Didn't receive it? Resend email",
    footerHref: "/auth/forgot-password",
  },
} satisfies Record<
  AuthMode,
  {
    title: string;
    subtitle: string;
    fields: { label: string; placeholder: string; type: string }[];
    button: string;
    footer: string;
    footerHref: string;
  }
>;

export function AuthShell({ mode }: AuthShellProps) {
  const data = pageContent[mode];
  const isSignIn = mode === "sign-in";
  const isCreateAccount = mode === "create-account";
  const isResetPassword = mode === "reset-password";
  const isCheckEmail = mode === "check-email";

  return (
    <main className={`auth-screen auth-screen--${mode}`}>
      <aside className="auth-visual">
        <div className="auth-brand">
          <span className="auth-brand-name">ABC Company</span>
          <span className="auth-brand-tagline">
            HIRING, WITHOUT THE BUSYWORK
          </span>
        </div>

        <div className="auth-visual-bottom">
          <p>
            Design assessments, review candidates, and move confidently from
            screening to hire.
          </p>
          <div className="auth-benefits">
            <span>Structured assessments</span>
            <span>Fair evaluation</span>
            <span>Faster decisions</span>
          </div>
        </div>
      </aside>

      <section className="auth-panel">
        <div className="auth-form-wrap">
          {isCheckEmail && (
            <div className="auth-email-icon" aria-hidden="true">
              ✉
            </div>
          )}

          <h1>{data.title}</h1>
          <p className="auth-subtitle">{data.subtitle}</p>

          <form
            className="auth-form"
            onSubmit={(event) => event.preventDefault()}
          >
            {data.fields.map((field, index) => (
              <label className="auth-field" key={field.label}>
                <span>{field.label}</span>
                <input
                  type={field.type}
                  name={field.label.toLowerCase().replaceAll(" ", "-")}
                  placeholder={field.placeholder}
                  autoComplete={
                    field.type === "email"
                      ? "email"
                      : isCreateAccount && index === 0
                        ? "name"
                        : isResetPassword
                          ? "new-password"
                          : isSignIn
                            ? "current-password"
                            : "new-password"
                  }
                  required
                  minLength={field.type === "password" ? 8 : undefined}
                />
              </label>
            ))}

            {(isCreateAccount || isResetPassword) && (
              <p className="auth-password-hint">
                Use 8+ characters with a number or symbol
              </p>
            )}

            {isSignIn && (
              <div className="auth-forgot-link">
                <Link href="/auth/forgot-password">
                  Forgot password?
                </Link>
              </div>
            )}

            <Button>{data.button}</Button>

            <Link className="auth-footer-link" href={data.footerHref}>
              {data.footer}
            </Link>
          </form>
        </div>
      </section>
    </main>
  );
}

