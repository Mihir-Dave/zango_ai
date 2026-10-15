
"use client";

import { useState } from "react";

type Screen =
  | "dashboard"
  | "assessments"
  | "create"
  | "details"
  | "candidates"
  | "results"
  | "candidate-result"
  | "review"
  | "background"
  | "background-detail";

type Assessment = {
  id: number;
  name: string;
  role: string;
  questions: number;
  duration: number;
  candidates: number;
  status: string;
};

type Candidate = {
  name: string;
  email: string;
  status: string;
  score: number | null;
};

const initialAssessments: Assessment[] = [
  {
    id: 1,
    name: "Senior Frontend Engineer",
    role: "React · Accessibility",
    questions: 4,
    duration: 60,
    candidates: 12,
    status: "Live",
  },
  {
    id: 2,
    name: "Product Engineer",
    role: "Product · Engineering",
    questions: 5,
    duration: 60,
    candidates: 8,
    status: "Live",
  },
  {
    id: 3,
    name: "Backend Platform Engineer",
    role: "Node.js · Databases",
    questions: 4,
    duration: 70,
    candidates: 4,
    status: "Draft",
  },
];

const initialCandidates: Candidate[] = [
  { name: "Jordan Lee", email: "jordan.lee@northstar.io", status: "Completed", score: 91 },
  { name: "Rehan Iyer", email: "rehan.iyer@northstar.io", status: "Completed", score: 85 },
  { name: "Anjali Mehra", email: "anjali.mehra@northstar.io", status: "Completed", score: 80 },
  { name: "Sean White", email: "sean.white@northstar.io", status: "Invited", score: null },
];

const initialQuestions = [
  "Build an accessible modal",
  "Investigate a layout shift",
  "Improve a responsive data table",
];

export default function RecruiterPage() {
  const [screen, setScreen] = useState<Screen>("dashboard");
  const [assessments, setAssessments] = useState(initialAssessments);
  const [candidates, setCandidates] = useState(initialCandidates);
  const [selectedAssessment, setSelectedAssessment] =
    useState<Assessment>(initialAssessments[0]);
  const [selectedCandidate, setSelectedCandidate] =
    useState<Candidate>(initialCandidates[0]);
  const [assessmentName, setAssessmentName] =
    useState("Senior Frontend Engineer assessment");
  const [description, setDescription] = useState(
    "Evaluate practical frontend skills, debugging approach, and communication."
  );
  const [duration, setDuration] = useState("60");
  const [threshold, setThreshold] = useState("75");
  const [questions, setQuestions] = useState(initialQuestions);
  const [questionTitle, setQuestionTitle] = useState("");
  const [candidateName, setCandidateName] = useState("Priya Sharma");
  const [candidateEmail, setCandidateEmail] = useState("priya@gmail.com");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState<"rubric" | "timeline" | "invite" | "end" | null>(null);
  const [humanScores, setHumanScores] = useState([40, 18, 18, 15]);
  const [backgroundStatus, setBackgroundStatus] = useState("In progress");
  const [builderStep, setBuilderStep] = useState<"details" | "builder" | "summary">("details");

  function go(next: Screen) {
    setNotice("");
    setModal(null);
    setScreen(next);
  }

  function openAssessment(assessment: Assessment) {
    setSelectedAssessment(assessment);
    go("details");
  }

  function createAssessment() {
    const newAssessment: Assessment = {
      id: Date.now(),
      name: assessmentName.trim() || "Untitled assessment",
      role: "Frontend · Engineering",
      questions: questions.length,
      duration: Number(duration) || 60,
      candidates: 0,
      status: "Draft",
    };

    setAssessments((old) => [newAssessment, ...old]);
    setSelectedAssessment(newAssessment);
    setNotice("Assessment draft created locally.");
    setBuilderStep("summary");
    go("assessments");
  }

  function addQuestion() {
    if (!questionTitle.trim()) {
      setNotice("Enter a question title first.");
      return;
    }
    setQuestions((old) => [...old, questionTitle.trim()]);
    setQuestionTitle("");
    setNotice("Question added.");
  }

  function inviteCandidate() {
    if (!candidateName.trim() || !candidateEmail.includes("@")) {
      setNotice("Enter a candidate name and valid email.");
      return;
    }

    setCandidates((old) => [
      ...old,
      {
        name: candidateName.trim(),
        email: candidateEmail.trim(),
        status: "Invited",
        score: null,
      },
    ]);

    setNotice(`Invitation prepared for ${candidateEmail}. Demo only: no email was sent.`);
    setCandidateName("");
    setCandidateEmail("");
  }

  function endAssessment() {
    setAssessments((old) =>
      old.map((a) =>
        a.id === selectedAssessment.id ? { ...a, status: "Ended" } : a
      )
    );
    setSelectedAssessment((old) => ({ ...old, status: "Ended" }));
    setModal(null);
    setNotice("Assessment marked as ended in this demo.");
  }

  const navItems: { label: string; screen: Screen }[] = [
    { label: "Dashboard", screen: "dashboard" },
    { label: "All Assessments", screen: "assessments" },
    { label: "Candidates", screen: "candidates" },
    { label: "Results", screen: "results" },
    { label: "Question Bank", screen: "create" },
    { label: "Background checks", screen: "background" },
  ];

  const filteredAssessments = assessments.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase())
  );
  const filteredCandidates = candidates.filter((c) =>
    `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const completed = candidates.filter((c) => c.score !== null);
  const averageScore = completed.length
    ? Math.round(
        completed.reduce((sum, c) => sum + (c.score ?? 0), 0) / completed.length
      )
    : 0;

  return (
    <main className="recruiter-app">
      <header className="recruiter-topbar">
        <button className="brand" onClick={() => go("dashboard")}>
          ABC Company
        </button>
        <span className="topbar-divider" />
        <span className="topbar-context">Frontend Engineer Assessment</span>
        <button className="avatar" title="Account">DA</button>
      </header>

      <div className="recruiter-layout">
        <aside className="recruiter-sidebar">
          <div className="sidebar-caption">HIRING WORKSPACE</div>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-link ${
                screen === item.screen ||
                (screen === "details" && item.screen === "assessments") ||
                (screen === "candidate-result" && item.screen === "candidates") ||
                (screen === "review" && item.screen === "results") ||
                (screen === "background-detail" && item.screen === "background")
                  ? "active"
                  : ""
              }`}
              onClick={() => go(item.screen)}
            >
              <span className="nav-dot" />
              {item.label}
            </button>
          ))}

          <div className="sidebar-profile">
            <div className="profile-avatar">M</div>
            <div>
              <strong>Maya Chen</strong>
              <small>Talent lead</small>
            </div>
          </div>
        </aside>

        <section className="recruiter-main">
          {notice && (
            <div className="recruiter-notice">
              <span>{notice}</span>
              <button onClick={() => setNotice("")}>×</button>
            </div>
          )}

          {screen === "dashboard" && (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">YOUR HIRING OVERVIEW</p>
                  <h1>Interviewer dashboard</h1>
                  <p>Keep every assessment, candidate, and decision moving.</p>
                </div>
                <button className="button-primary" onClick={() => {
                  setBuilderStep("details");
                  go("create");
                }}>
                  Create assessment
                </button>
              </div>

              <div className="stat-grid">
                <Stat label="ACTIVE ASSESSMENTS" value={String(assessments.filter(a => a.status === "Live").length)} detail="2 closing this week" />
                <Stat label="INVITATIONS SENT" value={String(candidates.length * 6)} detail="6 awaiting response" tone="gold" />
                <Stat label="COMPLETION RATE" value="78%" detail="Up 8% this month" tone="green" />
                <Stat label="REVIEWS DUE" value={String(completed.length)} detail="Prioritise today" tone="red" />
              </div>

              <div className="content-columns">
                <div className="panel">
                  <div className="panel-heading">
                    <h2>Recent assessments</h2>
                    <button className="text-button" onClick={() => go("assessments")}>View all assessments</button>
                  </div>
                  {assessments.slice(0, 3).map((assessment) => (
                    <button
                      className="assessment-row"
                      key={assessment.id}
                      onClick={() => openAssessment(assessment)}
                    >
                      <span>
                        <strong>{assessment.name}</strong>
                        <small>{assessment.questions} questions · {assessment.duration} min</small>
                      </span>
                      <span className={`status-pill ${assessment.status.toLowerCase()}`}>{assessment.status}</span>
                    </button>
                  ))}
                </div>
                <div className="tip-card">
                  <strong>{completed.length} candidate reviews are ready</strong>
                  <p>Start with the strongest submissions before the deadline.</p>
                  <button className="button-outline" onClick={() => go("results")}>Review candidates</button>
                </div>
              </div>
            </>
          )}

          {screen === "assessments" && (
            <>
              <PageHeading
                eyebrow="ASSESSMENTS"
                title="All assessments"
                subtitle="Create, monitor, and review every hiring assessment."
                action={<button className="button-primary" onClick={() => { setBuilderStep("details"); go("create"); }}>Create New Assessment</button>}
              />
              <div className="stat-grid three">
                <Stat label="LIVE" value={String(assessments.filter(a => a.status === "Live").length)} detail="2 close this week" />
                <Stat label="DRAFTS" value={String(assessments.filter(a => a.status === "Draft").length)} detail="Questions in progress" tone="gold" />
                <Stat label="INVITATIONS SENT" value={String(candidates.length)} detail="Prioritise today" tone="green" />
              </div>
              <div className="filter-row">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search assessments" />
                <select aria-label="Filter by status">
                  <option>All statuses</option><option>Live</option><option>Draft</option><option>Ended</option>
                </select>
                <select aria-label="Filter by owner"><option>All owners</option><option>Maya Chen</option></select>
              </div>
              <div className="panel">
                <div className="panel-heading"><h2>Assessment list</h2><span>{filteredAssessments.length} assessments</span></div>
                {filteredAssessments.map((a) => (
                  <div className="list-row" key={a.id}>
                    <div><strong>{a.name}</strong><small>{a.role} · {a.questions} questions · {a.duration} min</small></div>
                    <span>{a.candidates} candidates</span>
                    <span className={`status-pill ${a.status.toLowerCase()}`}>{a.status}</span>
                    <button className="button-outline" onClick={() => openAssessment(a)}>Open</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {screen === "create" && (
            <>
              <PageHeading
                eyebrow="ASSESSMENT BUILDER"
                title="Create an assessment"
                subtitle="Set the purpose, timing, and candidate experience before adding questions."
              />
              <div className="step-tabs">
                {(["details", "builder", "summary"] as const).map((step, index) => (
                  <button key={step} className={builderStep === step ? "selected" : ""} onClick={() => setBuilderStep(step)}>
                    {index + 1}. {step === "details" ? "Test details" : step === "builder" ? "Question builder" : "Questions summary"}
                  </button>
                ))}
              </div>

              {builderStep === "details" && (
                <div className="panel form-panel">
                  <h2>Test details</h2>
                  <p>Give your assessment a clear name and decide when candidates can access it.</p>
                  <label>Assessment name<input value={assessmentName} onChange={(e) => setAssessmentName(e.target.value)} /></label>
                  <label>Description<textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} /></label>
                  <div className="form-grid">
                    <label>Duration (minutes)<input type="number" min="5" value={duration} onChange={(e) => setDuration(e.target.value)} /></label>
                    <label>Score threshold (%)<input type="number" min="0" max="100" value={threshold} onChange={(e) => setThreshold(e.target.value)} /></label>
                  </div>
                  <button className="button-primary" onClick={() => setBuilderStep("builder")}>Continue to questions</button>
                </div>
              )}

              {builderStep === "builder" && (
                <div className="panel form-panel">
                  <div className="panel-heading"><h2>Questions</h2><span>{questions.length} questions</span></div>
                  <p>Build a focused set of questions for your interview.</p>
                  {questions.map((question, i) => (
                    <div className="question-row" key={`${question}-${i}`}>
                      <span className="question-number">{i + 1}</span>
                      <div><strong>{question}</strong><small>React · Medium · 15 min</small></div>
                      <button className="text-button" onClick={() => setQuestions((old) => old.filter((_, index) => index !== i))}>Remove</button>
                    </div>
                  ))}
                  <label>Add a question<input value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} placeholder="e.g. Explain a React performance issue" /></label>
                  <div className="button-row">
                    <button className="button-outline" onClick={addQuestion}>+ Add question</button>
                    <button className="button-primary" onClick={() => setBuilderStep("summary")}>Review summary</button>
                  </div>
                </div>
              )}

              {builderStep === "summary" && (
                <div className="panel form-panel">
                  <h2>Questions summary</h2>
                  <p>{assessmentName}</p>
                  <div className="stat-grid three">
                    <Stat label="SKILL COVERAGE" value="High" detail="React · Debugging" />
                    <Stat label="TIME BUDGET" value={`${duration} min`} detail="Within target" tone="gold" />
                    <Stat label="SCORE THRESHOLD" value={`${threshold}%`} detail="Required score" tone="green" />
                  </div>
                  {questions.map((q, i) => <div className="question-row" key={`${q}-${i}`}><span className="question-number">{i + 1}</span><strong>{q}</strong></div>)}
                  <button className="button-primary" onClick={createAssessment}>Save assessment draft</button>
                </div>
              )}
            </>
          )}

          {screen === "details" && (
            <>
              <button className="back-button" onClick={() => go("assessments")}>← All assessments</button>
              <PageHeading
                eyebrow="ASSESSMENT"
                title={selectedAssessment.name}
                subtitle="Assess practical implementation and accessible component decisions."
                action={<>
                  <button className="button-outline" onClick={() => { setBuilderStep("details"); go("create"); }}>Edit assessment</button>
                  <button className="button-outline" onClick={() => setModal("timeline")}>Schedule end</button>
                  <button className="button-primary" onClick={() => setModal("end")}>End assessment</button>
                </>}
              />
              <div className="panel">
                <div className="panel-heading"><h2>Assessment overview</h2><span>Updated just now</span></div>
                <div className="stat-grid four">
                  <Stat label="QUESTIONS" value={String(selectedAssessment.questions)} detail="Question set" />
                  <Stat label="CANDIDATES" value={String(selectedAssessment.candidates)} detail="Invited" />
                  <Stat label="COMPLETED" value={String(completed.length)} detail="Submissions" />
                  <Stat label="DURATION" value={`${selectedAssessment.duration} min`} detail="Time limit" />
                </div>
              </div>
              <div className="content-columns">
                <div className="panel">
                  <h2>Question set</h2>
                  {questions.slice(0, selectedAssessment.questions).map((q, i) => <div className="question-row" key={`${q}-${i}`}><span className="question-number">{String(i + 1).padStart(2, "0")}</span><div><strong>{q}</strong><small>React · Medium · 15 min</small></div><span className="points-pill">10 pts</span></div>)}
                </div>
                <div className="panel">
                  <h2>Candidate progress</h2>
                  <p>{completed.length} of {candidates.length} candidates have completed an assessment.</p>
                  <div className="progress-track"><span style={{ width: `${candidates.length ? completed.length / candidates.length * 100 : 0}%` }} /></div>
                  <button className="button-primary full-width" onClick={() => go("candidates")}>Invite candidates</button>
                  <button className="button-outline full-width" onClick={() => go("results")}>Review results</button>
                </div>
              </div>
            </>
          )}

          {screen === "candidates" && (
            <>
              <PageHeading eyebrow="CANDIDATES" title="Manage Candidates" subtitle="Invite candidates, monitor progress, and keep every assessment link accessible." action={<button className="button-outline" onClick={() => setModal("end")}>Assessment actions</button>} />
              <div className="panel form-panel">
                <h2>Add a candidate</h2>
                <p>We’ll prepare a unique invitation link for each candidate.</p>
                <div className="form-grid three">
                  <label>Candidate name<input value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Candidate name" /></label>
                  <label>Email<input type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} placeholder="candidate@example.com" /></label>
                  <div className="form-action"><button className="button-primary" onClick={inviteCandidate}>Send invitation</button></div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-heading"><h2>Candidate list</h2><span>{filteredCandidates.length} candidates</span></div>
                <input className="search-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates" />
                <div className="table-wrap"><table><thead><tr><th>Candidate</th><th>Status</th><th>Assessment</th><th>Score</th><th>Action</th></tr></thead>
                  <tbody>{filteredCandidates.map((c) => <tr key={c.email}><td><strong>{c.name}</strong><small>{c.email}</small></td><td><span className={`status-pill ${c.status.toLowerCase()}`}>{c.status}</span></td><td>{c.score === null ? "0/3" : "3/3"}</td><td>{c.score === null ? "—" : `${c.score}%`}</td><td><button className="text-button" onClick={() => { setSelectedCandidate(c); go("candidate-result"); }}>Open</button></td></tr>)}</tbody>
                </table></div>
              </div>
            </>
          )}

          {screen === "candidate-result" && (
            <>
              <button className="back-button" onClick={() => go("candidates")}>← Candidate list</button>
              <PageHeading eyebrow="CANDIDATE RESULT DETAIL" title={selectedCandidate.name} subtitle={`${selectedAssessment.name} · ${selectedCandidate.email}`} action={<button className="button-outline" onClick={() => setNotice("Interview email prepared in demo only; no email was sent.")}>Prepare interview email</button>} />
              <div className="stat-grid three">
                <Stat label="OVERALL SCORE" value={selectedCandidate.score === null ? "—" : `${selectedCandidate.score}%`} detail="Assessment score" tone="red" />
                <Stat label="TIME USED" value="51 min" detail="9 min remaining" />
                <Stat label="COMPLETION" value={selectedCandidate.score === null ? "0/3" : "3/3"} detail="Questions submitted" tone="gold" />
              </div>
              <div className="panel">
                <h2>Questions</h2>
                {questions.slice(0, 3).map((q, i) => <details className="result-question" key={`${q}-${i}`}><summary>{i + 1}. {q}<span>{selectedCandidate.score === null ? "Pending" : `${Math.max(70, (selectedCandidate.score ?? 0) + i - 1)}%`}</span></summary><p>Review the submitted solution, test coverage, accessibility, and code quality for this question.</p><button className="button-outline" onClick={() => go("review")}>Human review</button></details>)}
              </div>
            </>
          )}

          {screen === "results" && (
            <>
              <PageHeading eyebrow="ASSESSMENT RESULTS" title="Results & hiring recommendation" subtitle="Review the evidence, compare candidates, and move the strongest candidate forward." action={<button className="button-primary" onClick={() => setNotice("Export/ATS integration is not connected in this demo.")}>Push Results to ATS</button>} />
              <div className="stat-grid three">
                <Stat label="COMPLETED" value={`${completed.length} / ${candidates.length}`} detail="All submissions reviewed" tone="green" />
                <Stat label="AVERAGE SCORE" value={`${averageScore}%`} detail="Across completed candidates" tone="red" />
                <Stat label="TOP SCORE" value={`${Math.max(0, ...completed.map(c => c.score ?? 0))}%`} detail={completed[0]?.name ?? "No submissions yet"} />
              </div>
              <div className="content-columns">
                <div className="panel">
                  <h2>Leaderboard</h2>
                  <div className="table-wrap"><table><thead><tr><th>Candidate</th><th>Score</th><th>Recommendation</th></tr></thead><tbody>
                    {[...completed].sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).map((c) => <tr key={c.email}><td><button className="text-button" onClick={() => { setSelectedCandidate(c); go("candidate-result"); }}>{c.name}</button><small>{c.email}</small></td><td><strong>{c.score}%</strong></td><td>{(c.score ?? 0) >= 85 ? "Strong match" : "Good match"}</td></tr>)}
                  </tbody></table></div>
                </div>
                <div className="tip-card"><strong>Recommended next step</strong><p>Review the strongest submission and confirm the decision with the hiring team.</p><button className="button-primary" onClick={() => go("review")}>Open human review</button><button className="button-outline" onClick={() => setModal("timeline")}>View timeline</button></div>
              </div>
            </>
          )}

          {screen === "review" && (
            <>
              <PageHeading eyebrow="CANDIDATE REVIEW" title="Human decision review" subtitle="Review independent scores, resolve any disagreement, and record the hiring decision." />
              <div className="candidate-banner"><strong>{selectedCandidate.name} · {selectedCandidate.email}</strong><span>{selectedCandidate.score ?? 0}% overall</span></div>
              <div className="content-columns review-columns">
                <div className="panel">
                  <h2>Review and adjust the rubric</h2>
                  <p>Human scores are editable. Every adjustment is retained locally for this demo.</p>
                  {["Functional correctness", "Verification & tests", "Accessibility", "Code quality"].map((metric, i) => <label className="score-row" key={metric}><span>{metric}<small>Objective metric</small></span><input type="number" min="0" max="40" value={humanScores[i]} onChange={(e) => setHumanScores((old) => old.map((score, index) => index === i ? Number(e.target.value) : score))} /></label>)}
                  <div className="human-score">Human-adjusted score <strong>{humanScores.reduce((sum, score) => sum + score, 0)} / 100</strong></div>
                  <button className="button-outline" onClick={() => setModal("rubric")}>Edit evaluation rubric</button>
                  <button className="button-primary" onClick={() => setNotice("Human review saved in the current page state.")}>Save review</button>
                </div>
                <div className="panel">
                  <h2>Candidate code</h2>
                  <pre className="code-preview">{`01 const restoreFocus = () => trigger.current?.focus();\n02 if (event.key === "Escape") closeModal();\n03 useEffect(() => restoreFocus(), [isOpen]);`}</pre>
                  <p>4 / 4 visible tests passed · demo data</p>
                  <button className="button-outline" onClick={() => setModal("timeline")}>View timeline</button>
                </div>
              </div>
            </>
          )}

          {screen === "background" && (
            <>
              <PageHeading eyebrow="BACKGROUND CHECKS" title="Selected candidates" subtitle="Review and manage background checks for candidates selected across all assessments." />
              <div className="filter-row"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search candidates" /><select aria-label="Status filter"><option>All statuses</option><option>In progress</option><option>Verified</option></select><select aria-label="Assessment filter"><option>All assessments</option></select></div>
              <div className="panel">
                <div className="panel-heading"><h2>Candidate list</h2><span>Background checks</span></div>
                {["Anjali Mehta", "Jordan Lee", "Vikram Singh", "David Chen", "Aisha Khan", "Marcus Holt", "Neha Kapoor"].filter((name) => name.toLowerCase().includes(search.toLowerCase())).map((name, i) => <div className="list-row" key={name}><div><strong>{name}</strong><small>{["Senior Frontend Engineer", "Senior UX Designer", "Data Analyst"][i % 3]}</small></div><span>{i % 3 + 1} / 3 docs</span><span className={`status-pill ${i === 2 ? "completed" : "draft"}`}>{i === 2 ? "Verified" : "In progress"}</span><button className="button-outline" onClick={() => { setSelectedCandidate({ name, email: `${name.toLowerCase().replace(" ", ".")}@northstar.io`, status: "In progress", score: null }); go("background-detail"); }}>Open</button></div>)}
              </div>
            </>
          )}

          {screen === "background-detail" && (
            <>
              <button className="back-button" onClick={() => go("background")}>← Background checks</button>
              <PageHeading eyebrow="BACKGROUND CHECK" title={selectedCandidate.name} subtitle="Background check · Selected from assessment" action={<button className="button-outline" onClick={() => setNotice("Reminder prepared in demo only; no email was sent.")}>Send reminder</button>} />
              <div className="panel form-panel">
                <label>Check status<select value={backgroundStatus} onChange={(e) => setBackgroundStatus(e.target.value)}><option>In progress</option><option>Awaiting reply</option><option>Verified</option><option>Needs review</option></select></label>
                <h2>Candidate documents</h2>
                <p>Employers receive an email to confirm dates, designation, reason for leaving, and rehire eligibility.</p>
                <div className="form-grid"><label>Relieving letter<input defaultValue="Uploaded · 12 Aug 2026" /></label><label>Payslips<input defaultValue="2 of 3 months uploaded" /></label></div>
                <h2>Employer verification</h2>
                {["Acme Labs", "Northern Cloud", "Orion Systems"].map((employer, i) => <div className="list-row" key={employer}><div><strong>{employer}</strong><small>Employment verification</small></div><span className={`status-pill ${i === 1 ? "completed" : "draft"}`}>{i === 1 ? "Verified" : "Awaiting reply"}</span><button className="text-button" onClick={() => setNotice(`Reminder prepared for ${employer}; no email was sent.`)}>Remind</button></div>)}
                <button className="button-primary" onClick={() => setNotice(`Background status saved locally as "${backgroundStatus}".`)}>Save status</button>
              </div>
            </>
          )}
        </section>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModal(null)}>×</button>
            <p className="eyebrow">ASSESSMENT WORKSPACE</p>
            <h2>{modal === "rubric" ? "Evaluation rubric" : modal === "timeline" ? "Assessment timeline" : modal === "invite" ? "Invite candidates" : "End assessment?"}</h2>
            {modal === "rubric" && <><p>Review the criteria and scoring values used for this question.</p><div className="rubric-grid"><strong>Criterion</strong><strong>0</strong><strong>1</strong><strong>2</strong><strong>3</strong>{["Dialog semantics", "Focus management", "Dismissal & scroll", "Test coverage"].map((x) => <div className="rubric-line" key={x}>{x}<span>Basic</span><span>Partial</span><span>Good</span><span>Strong</span></div>)}</div></>}
            {modal === "timeline" && <><p>Activity for {selectedAssessment.name}.</p><div className="timeline-item">Assessment created <small>Draft saved locally</small></div><div className="timeline-item">Candidate activity <small>Use the candidates screen to manage invite status.</small></div></>}
            {modal === "invite" && <p>Open Candidates to add a candidate and prepare an invitation.</p>}
            {modal === "end" && <><p>Ending the assessment changes its status in this local demo. This does not notify candidates or update a server.</p><div className="button-row"><button className="button-outline" onClick={() => setModal(null)}>Cancel</button><button className="button-primary" onClick={endAssessment}>Confirm end</button></div></>}
            {modal !== "end" && <button className="button-primary" onClick={() => setModal(null)}>Done</button>}
          </section>
        </div>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  detail,
  tone = "",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: string;
}) {
  return (
    <div className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

function PageHeading({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-heading">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{subtitle}</p></div>
      {action && <div className="heading-actions">{action}</div>}
    </div>
  );
}
