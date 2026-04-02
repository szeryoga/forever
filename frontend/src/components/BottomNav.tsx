import { NavLink } from "react-router-dom";

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2v3M17 2v3M4 7h16M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M8 11h3M13 11h3M8 15h3M13 15h3" />
    </svg>
  );
}

function CocktailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16l-6 7v5l2 2H8l2-2v-5L4 5Z" />
      <path d="M9 21h6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  );
}

const items = [
  { to: "/events", labelRu: "Афиша", labelEn: "Events", icon: <CalendarIcon /> },
  { to: "/bar", labelRu: "Бар", labelEn: "Bar", icon: <CocktailIcon /> },
  { to: "/profile", labelRu: "Профиль", labelEn: "Profile", icon: <UserIcon /> },
];

export function BottomNav({ language }: { language: "ru" | "en" }) {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `bottom-nav-item ${isActive ? "active" : ""}`}
        >
          {item.icon}
          <span>{language === "ru" ? item.labelRu : item.labelEn}</span>
        </NavLink>
      ))}
    </nav>
  );
}
