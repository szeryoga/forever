import { Outlet, useLocation } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { ScreenHeader } from "../components/ScreenHeader";
import { useLanguage } from "../context/LanguageContext";

export function MiniAppLayout() {
  const location = useLocation();
  const { language } = useLanguage();
  const showBack = location.pathname.startsWith("/events/") && location.pathname !== "/events";

  return (
    <div className="miniapp-shell">
      <div className="screen-frame">
        <ScreenHeader showBack={showBack} />
        <main className="screen-content">
          <Outlet />
        </main>
        <BottomNav language={language} />
      </div>
    </div>
  );
}
