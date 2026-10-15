import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

const options = [
  "Keep focus outside the modal to reduce trapping.",
  "Disable keyboard controls.",
  "Use color alone for every state.",
  "Hide labels until hover.",
];

export default function QuestionsPage() {
  return (
    <main className="screen questions-screen">
      <Header />
      <section className="questions-layout">
        <article className="question-stack">
          <section className="question-card coding-task">
            <p className="eyebrow">CODING TASK</p>
            <div>
              <h2>Bracket combinations</h2>
              <p>45 min · Python</p>
            </div>
            <Link href="/challenge">
              <Button>Start now</Button>
            </Link>
          </section>

          <section className="response-card">
            <div className="question-title">
              <span className="tag">A</span>
              <h2>Tell us about your design background.</h2>
            </div>
            <textarea defaultValue="I have 10+ years of backend experience." />
          </section>

          <section className="mcq-card">
            <div className="question-title">
              <span className="tag">B</span>
              <h2>Which behavior is essential for an accessible modal?</h2>
            </div>
            {options.map((option, index) => (
              <label key={option} className={index === 1 ? "selected-option" : ""}>
                <input type="radio" name="modal" defaultChecked={index === 1} />
                {option}
              </label>
            ))}
          </section>

          <section className="mcq-card short-card">
            <div className="question-title">
              <span className="tag">C</span>
              <h2>Universal design means designing for one average user.</h2>
            </div>
            <label>
              <input type="checkbox" defaultChecked /> True
            </label>
          </section>
        </article>

        <aside className="progress-rail">
          <p className="eyebrow">TIME LEFT</p>
          <strong>4:12:00</strong>
          <h2>Progress</h2>
          <dl>
            <div>
              <dt>Coding challenge</dt>
              <dd>Done</dd>
            </div>
            <div>
              <dt>Open-ended</dt>
              <dd>4 questions</dd>
            </div>
            <div>
              <dt>Review</dt>
              <dd>Available</dd>
            </div>
          </dl>
          <Button>Submit early</Button>
        </aside>
      </section>
    </main>
  );
}
