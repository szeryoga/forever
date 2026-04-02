import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  actionLabel?: string;
  actionTo?: string;
}

export function PageHeader({ title, actionLabel, actionTo }: PageHeaderProps) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      {actionLabel && actionTo ? (
        <Link className="primary-button" to={actionTo}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
