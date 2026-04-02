import { NavLink } from "react-router-dom";

const items = [
  { to: "/events", label: "Афиша" },
  { to: "/bar", label: "Бар" },
  { to: "/profile", label: "Профиль" },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">Forever Young</div>
      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
