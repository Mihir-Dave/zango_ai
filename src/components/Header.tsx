type HeaderProps = {
  title?: string;
  showNav?: boolean;
};

export function Header({ title = "Frontend Engineer Assessment", showNav = false }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="brand-mark" aria-label="ABC Company">
          <span className="brand-icon">A</span>
          <span className="brand-word">ABC Company</span>
        </div>
        <span className="header-divider" />
        {showNav ? (
          <nav className="primary-nav" aria-label="Primary navigation">
            <a href="/">Challenges</a>
            <a href="/workspace">Assessments</a>
          </nav>
        ) : (
          <h1>{title}</h1>
        )}
      </div>
      <div className="avatar">DA</div>
    </header>
  );
}
