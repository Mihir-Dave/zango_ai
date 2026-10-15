import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export default function WelcomePage() {
  return (
    <main className="screen welcome-screen">
      <Header />

      <section className="welcome-content">
        <article className="welcome-card">
          <span className="tag">Assessment</span>
          <h2>Ready to prove your skills?</h2>
          <p className="lead">
            Complete a coding challenge and several open-ended questions. Read each prompt quickly
            and submit as soon as possible.
          </p>

          <dl className="metrics">
            <div>
              <dt>PARTS</dt>
              <dd>4</dd>
            </div>
            <div>
              <dt>CODE</dt>
              <dd>2 challenges</dd>
            </div>
            <div>
              <dt>WRITING</dt>
              <dd>1 answer</dd>
            </div>
          </dl>

          <div className="card-footer">
            <p>This assessment can be paused after every section.</p>
            <Link href="/questions">
              <Button>Start assessment</Button>
            </Link>
          </div>
        </article>

        <aside className="sidebar-note">
          <div>
            <p className="eyebrow">TIMEBOX</p>
            <strong>2 hours</strong>
            <p>Finish the coding section first, then come back to the written responses.</p>
          </div>

          <div>
            <h3>Before you begin</h3>
            <ul>
              <li>Use any online reference</li>
              <li>Refresh whenever needed</li>
              <li>Manual saves are required</li>
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
