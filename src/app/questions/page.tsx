import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

const accessibilityOptions = [
  "Trap focus inside the modal while it is open.",
  "Allow focus to move freely to the page behind the modal.",
  "Require candidates to use a mouse to close the modal.",
  "Hide the focus indicator so the interface looks cleaner.",
];

const designOptions = [
  "Design for the average user.",
  "Create products that can be used by everyone, regardless of ability.",
  "Focus primarily on aesthetic appeal.",
];

export default function QuestionsPage() {
  return (
    <main className="screen figma-page questions-screen">
      <Header />

      <div className="figma-question-layout">
        <section className="figma-question-list">
          <p className="figma-eyebrow">CODING CHALLENGE</p>

          <article className="figma-challenge-row">
            <div>
              <h2>Bracket combinations</h2>
              <p>30 min · JavaScript</p>
            </div>

            <Link href="/challenge">
              <Button>Open challenge</Button>
            </Link>
          </article>

          <p className="figma-eyebrow">OPEN-ENDED QUESTIONS</p>

          <article className="figma-question-card">
            <div className="figma-question-heading">
              <span className="figma-number">01</span>
              <h2>How many years of experience do you have as a developer?</h2>
            </div>

            <div className="figma-editor-toolbar" aria-label="Formatting options">
              <span>Aa</span>
              <span>B</span>
              <span>I</span>
              <span>• List</span>
              <span>↗</span>
            </div>

            <textarea
              aria-label="Written response to question 1"
              maxLength={500}
              placeholder="Write your response here..."
              className="figma-response-input"
            />
            <p className="figma-response-count">0 / 500</p>
          </article>

          <article className="figma-question-card">
            <div className="figma-question-heading">
              <span className="figma-number">02</span>
              <h2>
                Which behavior is essential for an accessible modal dialog?
              </h2>
            </div>

            <p className="figma-helper">Select one answer</p>

            <div className="figma-options">
              {accessibilityOptions.map((option, index) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="accessibility"
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </article>

          <article className="figma-question-card">
            <div className="figma-question-heading">
              <span className="figma-number">03</span>
              <h2>What is a key principle of universal design?</h2>
            </div>

            <p className="figma-helper">Select one answer</p>

            <div className="figma-options">
              {designOptions.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="universal-design"
                    value={option}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </article>
        </section>

        <aside className="figma-progress">
          <span className="figma-eyebrow">TIME LEFT</span>
          <strong className="figma-timer">2:47:12</strong>

          <div className="figma-progress-bottom">
            <h2>Your progress</h2>

            <div className="figma-progress-item">
              <span>Coding challenge</span>
              <span>Not started</span>
            </div>

            <div className="figma-progress-item">
              <span>Open-ended</span>
              <span>2 questions</span>
            </div>

            <div className="figma-progress-item">
              <span>Review &amp; submit</span>
              <span>Locked</span>
            </div>

            <Button>Submit assessment</Button>
          </div>
        </aside>
      </div>
    </main>
  );
}