import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export default function ChallengePage() {
  return (
    <main className="screen figma-page challenge-screen">
      <Header showNav />

      <section className="figma-challenge-main">
        <p className="figma-eyebrow">CHALLENGES</p>

        <h1>Bracket combinations</h1>

        <p className="figma-muted">
          Find every valid arrangement of parentheses with a clean, efficient
          solution.
        </p>

        <div className="figma-challenge-grid">
          <article className="figma-info-card">
            <div className="figma-card-top">
              <span className="figma-tag">Hard</span>
              <span>12 points</span>
            </div>

            <h2>Your brief</h2>

            <p>
              Given n pairs of brackets, return all valid combinations. Aim for
              clarity first, then use pruning to keep the recursion efficient.
            </p>

            <div className="figma-facts">
              <div>
                <span>TIME</span>
                <strong>40 min</strong>
              </div>
              <div>
                <span>DIFFICULTY</span>
                <strong>Hard</strong>
              </div>
            </div>
          </article>

          <aside className="figma-info-card">
            <h2>What is this challenge about?</h2>

            <p>
              Explore a problem built to test fundamentals under real-world
              time constraints.
            </p>

            <ul className="figma-bullets">
              <li>Depth-first search</li>
              <li>Stack patterns</li>
              <li>Input validation</li>
            </ul>
          </aside>
        </div>
      </section>

      <footer className="figma-challenge-footer">
        <div>
          <strong>Ready when you are</strong>
          <span>Your progress is saved automatically.</span>
        </div>

        <span>40 minutes</span>

        <Link href="/workspace">
          <Button>Begin challenge →</Button>
        </Link>
      </footer>
    </main>
  );
}