import Link from "next/link";

const screens = [
  ["/welcome", "Candidate assessment welcome"],
  ["/questions", "Candidate assessment question list"],
  ["/challenge", "Candidate challenge overview"],
  ["/workspace", "Candidate coding workspace"],
  ["/background-check", "Background check dashboard"],
  ["/auth/sign-in", "Authentication - Sign in"],
  ["/auth/create-account", "Authentication - Create account"],
  ["/auth/forgot-password", "Authentication - Forgot password"],
  ["/auth/reset-password", "Authentication - Reset password"],
  ["/auth/check-email", "Authentication - Check your email"],
];

export default function ScreenIndex() {
  return (
    <main className="screen index-screen">
      <section>
        <p className="eyebrow">ABC Company buggy fixture</p>
        <h1>All Figma screens</h1>
        <p>
          These screens are intentionally mismatched against the supplied Figma file for a
          pixel-matching/debugging interview exercise.
        </p>
        <div className="screen-list">
          {screens.map(([href, title]) => (
            <Link key={href} href={href}>
              {title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
