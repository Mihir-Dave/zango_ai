import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export default function WelcomePage() {
  return (
    <main className="screen figma-page welcome-screen">
      <Header />

      <section className="figma-welcome">
        <article className="figma-welcome-card">
          <span className="figma-tag">Assessment</span>

          <h1>Ready to show your craft?</h1>

          <p className="figma-muted">
            You’ll complete a short coding task and a few open-ended questions.
            Read each prompt carefully and work at a pace that feels considered.
          </p>

          <div className="figma-metrics">
            <div>
              <span>SECTIONS</span>
              <strong>3</strong>
            </div>
            <div>
              <span>CODING</span>
              <strong>1 challenge</strong>
            </div>
            <div>
              <span>WRITTEN</span>
              <strong>2 responses</strong>
            </div>
          </div>

          <div className="figma-welcome-footer">
            <p>Once started, the timer cannot be paused.</p>

            <Link href="/questions">
              <Button>Begin assessment →</Button>
            </Link>
          </div>
        </article>

        <div className="figma-welcome-bottom">
          <section>
            <span className="figma-eyebrow">TIME LIMIT</span>
            <strong className="figma-time">3 hours</strong>
            <p>Complete all sections within the allotted time.</p>
          </section>

          <section>
            <h2>Before you begin</h2>
            <ul className="figma-bullets">
              <li>Stable internet connection</li>
              <li>No external resources</li>
              <li>Progress saves automatically</li>
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}