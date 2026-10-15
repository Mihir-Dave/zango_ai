"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

const starterCode = `function generateBrackets(n) {
  const results = [];

  // Write your solution here
  return results;
}`;

export default function WorkspacePage() {
  const [code, setCode] = useState(starterCode);
  const [testInput, setTestInput] = useState("3");
  const [output, setOutput] = useState(
    "Your console output will appear here.",
  );
  const [showWarning, setShowWarning] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function runCode() {
    if (!code.trim()) {
      setOutput("Enter your solution before running the code.");
      return;
    }

    // This fixture does not include a code execution service.
    // Do not pretend that arbitrary code has been executed.
    setOutput(
      `Test input: ${testInput}\n\nCode execution is not connected in this fixture.`,
    );
  }

  function submitSolution() {
    setSubmitted(true);
  }

  return (
    <main className="screen figma-page figma-workspace-screen">
      <Header title="Bracket combinations" />

      <section className="figma-workspace-grid">
        <aside className="figma-problem-panel">
          <span className="figma-tag">Hard</span>
          <h2>The problem</h2>

          <p>
            Given an integer n, generate every unique sequence of n pairs of
            balanced parentheses. A sequence is valid only when each opening
            parenthesis has a matching closing parenthesis and no prefix
            contains more closing than opening parentheses. Return each
            combination exactly once in any consistent order.
          </p>

          <div className="figma-example">
            <strong>EXAMPLE</strong>
            <div>
              <span>Input: 3</span>
              <span>Output: 5</span>
            </div>
            <div>
              <span>Input: 2</span>
              <span>Output: 2</span>
            </div>
          </div>

          <div className="figma-checklist">
            <span>Success checklist</span>
            <ul>
              <li>Returns every valid pair</li>
              <li>No duplicate values</li>
              <li>Explains time complexity</li>
            </ul>
          </div>
        </aside>

        <section className="figma-editor-panel">
          <div className="figma-editor-top">
            <div className="figma-editor-tabs">
              <span>JavaScript</span>
              <span>Files +</span>
              <span>Terminal</span>
              <span>Artifacts</span>
            </div>
            <span>Saved just now</span>
          </div>

          <label className="figma-code-label" htmlFor="solution-code">
            Solution editor
          </label>

          <textarea
            id="solution-code"
            className="figma-code-input"
            spellCheck={false}
            value={code}
            onChange={(event) => setCode(event.target.value)}
            aria-label="JavaScript solution editor"
          />

          <div className="figma-editor-bottom">
            <button
              type="button"
              className="figma-text-button"
              onClick={() => setShowCopilot((visible) => !visible)}
            >
              {showCopilot ? "Close AI Copilot" : "Open AI Copilot"}
            </button>

            <Button onClick={runCode}>Run code</Button>
          </div>

          {showCopilot && (
            <aside className="figma-copilot">
              <div className="figma-card-top">
                <strong>AI Copilot</strong>
                <button
                  type="button"
                  className="figma-text-button"
                  onClick={() => setShowCopilot(false)}
                  aria-label="Close AI Copilot"
                >
                  ×
                </button>
              </div>

              <p>
                Think about the number of opening and closing parentheses
                before choosing each next character.
              </p>

              <p>
                Keep the number of closing parentheses less than or equal to
                the number of opening parentheses at every step.
              </p>
            </aside>
          )}
        </section>

        <aside className="figma-run-panel">
          <h2>Run &amp; verify</h2>

          <label htmlFor="test-input">TEST INPUT</label>
          <input
            id="test-input"
            value={testInput}
            onChange={(event) => setTestInput(event.target.value)}
          />

          <span className="figma-eyebrow">OUTPUT</span>
          <pre className="figma-output">{output}</pre>

          <div className="figma-result-strip">
            <div>
              <strong>RESULT</strong>
              <span>Execution service not connected</span>
            </div>
            <span aria-hidden="true">!</span>
          </div>
        </aside>
      </section>

      <footer className="figma-workspace-footer">
        <Link href="/questions">Back to assessment</Link>
        <span>32:18 remaining</span>

        <Button onClick={submitSolution}>Submit solution</Button>
      </footer>

      {showWarning && (
        <div className="figma-modal-backdrop">
          <section
            className="figma-warning-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="integrity-title"
          >
            <div className="figma-card-top">
              <h2 id="integrity-title">Stay in this assessment</h2>
              <span>Warning: First of 3</span>
            </div>

            <p>
              Protecting assessment integrity is essential. This activity may
              be recorded.
            </p>

            <div className="figma-modal-actions">
              <Button
                variant="ghost"
                onClick={() => setShowWarning(false)}
              >
                Exit assessment
              </Button>
              <Button onClick={() => setShowWarning(false)}>
                I understand
              </Button>
            </div>
          </section>
        </div>
      )}

      {submitted && (
        <div className="figma-modal-backdrop">
          <section
            className="figma-warning-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="submit-title"
          >
            <h2 id="submit-title">Solution ready for submission</h2>
            <p>
              This fixture has no submission backend, so your code has not
              been sent to a server.
            </p>
            <Button onClick={() => setSubmitted(false)}>Close</Button>
          </section>
        </div>
      )}
    </main>
  );
}
