import { Header } from "../../components/Header";
import { Button } from "../../components/Button";

const rows = [
  ["Acme Labs", "Pending", "15 Aug", "Unknown", "Nudge"],
  ["Northern Cloud", "Failed", "09 Aug", "Mismatch", "Open"],
  ["Orion Systems", "Verified", "13 Aug", "Partial", "Mail"],
];

export default function BackgroundCheckPage() {
  return (
    <main className="screen ops-screen">
      <Header title="Candidate checks" />
      <div className="ops-layout">
        <aside className="ops-sidebar">
          <p className="eyebrow">TALENT SUITE</p>
          {["Home", "Candidates", "Background", "Reports", "Settings"].map((item, index) => (
            <a className={index === 0 ? "active" : ""} href="#" key={item}>
              <span />
              {item}
            </a>
          ))}
          <div className="profile-chip">
            <div className="avatar">MC</div>
            <div>
              <strong>Dev Anand</strong>
              <p>Recruiter</p>
            </div>
          </div>
        </aside>

        <section className="ops-content">
          <header>
            <h1>Jordan Lee</h1>
            <p>Background screening · Backend Platform Engineer · Updated tomorrow</p>
          </header>

          <section className="status-card">
            <div>
              <p className="eyebrow">CHECK STATUS</p>
              <h2>Completed</h2>
            </div>
            <Button>Invite candidate</Button>
          </section>

          <section className="document-card">
            <h2>Candidate uploads</h2>
            <p>Ask employers to confirm compensation, performance, and manager feedback.</p>
            <div className="document-grid">
              <label>
                PASSPORT
                <input defaultValue="Missing" />
              </label>
              <label>
                SALARY CERTIFICATE
                <input defaultValue="Uploaded · 01 Jan 2024" />
              </label>
              <Button>Delete docs</Button>
            </div>
          </section>

          <section className="table-card">
            <h2>Employer verification</h2>
            <table>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Status</th>
                  <th>Requested</th>
                  <th>Outcome</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
      </div>
    </main>
  );
}
