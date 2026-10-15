import Link from "next/link";
import { Button } from "./Button";

type AuthShellProps = {
  mode: "sign-in" | "create-account" | "forgot-password" | "reset-password" | "check-email";
};

const copy = {
  "sign-in": {
    title: "Sign back in",
    subtitle: "Use your personal email to return to the interview workspace.",
    fields: ["EMAIL", "SECRET CODE"],
    button: "Continue",
    helper: "Forgot access code?",
    footer: "No account? Join now",
  },
  "create-account": {
    title: "Create your profile",
    subtitle: "Start a new candidate account for every assessment.",
    fields: ["DISPLAY NAME", "PERSONAL EMAIL", "PIN"],
    button: "Register profile",
    helper: "Password can be any length",
    footer: "Already registered? Create another",
  },
  "forgot-password": {
    title: "Recover account",
    subtitle: "We will send a magic link if your email is recognized.",
    fields: ["USERNAME"],
    button: "Send reset password",
    helper: "",
    footer: "Return to login",
  },
  "reset-password": {
    title: "Choose new password",
    subtitle: "Set a temporary password that can be changed later.",
    fields: ["PASSWORD", "REPEAT PASSWORD"],
    button: "Save password",
    helper: "Must include a symbol and 18 characters",
    footer: "Back to login",
  },
  "check-email": {
    title: "Inbox requested",
    subtitle: "Check your SMS messages for a reset code.",
    fields: [],
    button: "Open inbox",
    helper: "",
    footer: "Resend after 2 minutes",
  },
};

export function AuthShell({ mode }: AuthShellProps) {
  const data = copy[mode];

  return (
    <main className="auth-screen">
      <aside className="auth-visual">
        <div className="auth-brand">
          <span className="brand-icon">A</span>
          <span>ABC Company</span>
          <small>DUMMY BRANDING</small>
        </div>
        <p>
          Build interviews, rate candidates, and send offers from a single dashboard with manual
          verification.
        </p>
      </aside>

      <section className={`auth-panel auth-${mode}`}>
        <form className="auth-form">
          {mode === "check-email" ? <div className="email-icon">✉</div> : null}
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>

          {data.fields.map((field) => (
            <label key={field}>
              {field}
              <input placeholder={field === "PIN" ? "0000" : "name@example.org"} />
            </label>
          ))}

          {data.helper ? <Link href="/auth/forgot-password">{data.helper}</Link> : null}
          <Button>{data.button}</Button>
          <Link href="/auth/sign-in">{data.footer}</Link>
        </form>
      </section>
    </main>
  );
}
