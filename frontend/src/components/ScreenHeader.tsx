import { Link, useNavigate } from "react-router-dom";

interface ScreenHeaderProps {
  showBack?: boolean;
}

export function ScreenHeader({ showBack = false }: ScreenHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <div className="top-bar-side">
        {showBack ? (
          <button type="button" className="icon-button" onClick={() => navigate(-1)}>
            <span className="arrow-left" />
          </button>
        ) : (
          <Link to="/events" className="icon-button" aria-label="Events">
            <span className="arrow-left muted" />
          </Link>
        )}
      </div>
      <div className="top-bar-title">Вечно Молодой</div>
      <div className="top-bar-side top-bar-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </header>
  );
}
