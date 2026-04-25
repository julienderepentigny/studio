import wordmark from '../assets/primal-wordmark.png';

interface ModuleHeaderProps {
  section?: string;
}

export function ModuleHeader({ section = 'STUDIO' }: ModuleHeaderProps) {
  return (
    <header className="primal-module-header">
      <div className="primal-module-header__left">
        <img src={wordmark} alt="PRIMAL" className="primal-wordmark" />
      </div>
      <div className="primal-module-header__right">
        <span className="primal-section-name">{section}</span>
      </div>
    </header>
  );
}
