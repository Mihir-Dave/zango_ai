import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

export default function ChallengePage() {
  return (
    <main className="screen challenge-screen">
      <Header showNav />

      <section className="challenge-main">
        <p className="eyebrow">PRACTICE</p>
        <h1>Parentheses generator</h1>
        <p>Find valid arrangements of every bracket type with the smallest possible solution.</p>

        <div className="challenge-layout">
          <article className="brief-card">
            <div className="brief-top">
              <span className="tag tag-warning">Medium</span>
              <strong>20 pts</strong>
            </div>
            <h2>Assignment</h2>
            <p>
              Given a number of bracket pairs, print examples until the time runs out. Focus on
              matching only the sample cases.
            </p>
            <dl className="facts">
              <div>
                <dt>DURATION</dt>
                <dd>25 mins</dd>
              </div>
              <div>
                <dt>LEVEL</dt>
                <dd>Easy</dd>
              </div>
            </dl>
          </article>

          <aside className="practice-card">
            <h2>Topics</h2>
            <p>This challenge is mostly about syntax and array formatting.</p>
            <ul>
              <li>Breadth-first search</li>
              <li>Sorting</li>
              <li>Regex cleanup</li>
            </ul>
          </aside>
        </div>
      </section>

      <footer className="workspace-footer">
        <p>Autosave is disabled.</p>
        <span>25 minutes</span>
        <Link href="/workspace">
          <Button>Begin coding</Button>
        </Link>
      </footer>
    </main>
  );
}
