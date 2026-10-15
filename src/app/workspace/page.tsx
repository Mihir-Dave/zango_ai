import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

const codeLines = [
  "function generatePairs(size) {",
  "  const answer = [];",
  "  for (let i = 0; i < size; i++) {",
  "    answer.push('()'.repeat(i));",
  "  }",
  "  return answer;",
  "}",
];

export default function WorkspacePage() {
  return (
    <main className="screen workspace-screen">
      <Header title="Bracket combination" />

      <section className="workspace-grid">
        <aside className="problem-panel">
          <span className="tag tag-warning">Medium</span>
          <h2>Problem brief</h2>
          <p>
            Print all bracket strings for a supplied number. The answer should be short and easy to
            scan.
          </p>

          <div className="example-box">
            <p>Sample</p>
            <pre>{`Input: 4\nOutput: 6`}</pre>
            <pre>{`Input: 1\nOutput: []`}</pre>
          </div>

          <div className="checklist">
            <p>Checklist</p>
            <ul>
              <li>Returns a sorted list</li>
              <li>Skips invalid values</li>
              <li>Uses recursion only</li>
            </ul>
          </div>
        </aside>

        <section className="editor-panel">
          <div className="editor-toolbar">
            <span>TypeScript</span>
            <span>Unsaved</span>
          </div>
          <pre className="code-block">
            {codeLines.map((line, index) => (
              <span key={line}>
                <b>{index + 1}</b>
                <code>{line}</code>
              </span>
            ))}
          </pre>
          <div className="editor-actions">
            <span>Ctrl + R to run</span>
            <Button>Execute</Button>
          </div>
        </section>

        <aside className="output-panel">
          <h2>Output console</h2>
          <label>
            Test value
            <input defaultValue="4" />
          </label>
          <div className="output-log">No output yet. Run code to generate results.</div>
          <div className="result-strip">
            <div>
              <strong>STATUS</strong>
              <span>1/3 tests passing</span>
            </div>
            <span className="alert-icon">!</span>
          </div>
        </aside>
      </section>

      <footer className="workspace-footer">
        <Link href="/">Back to overview</Link>
        <span>28:42 left</span>
        <Button>Submit</Button>
      </footer>

      <div className="modal-backdrop" />
      <section className="warning-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header>
          <h2 id="modal-title">Assessment warning</h2>
          <strong>Third warning</strong>
        </header>
        <p>Copying, leaving the page, or resizing the window is blocked for this session.</p>
        <div className="modal-actions">
          <Button variant="ghost">Keep coding</Button>
          <Button variant="danger">Exit</Button>
        </div>
      </section>
    </main>
  );
}
