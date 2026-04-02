import { Outlet, useLocation } from "react-router-dom";

import { BottomNav } from "../components/BottomNav";
import { Logo } from "../components/Logo";
import { ScreenHeader } from "../components/ScreenHeader";
import { useLanguage } from "../context/LanguageContext";

export function MiniAppLayout() {
  const location = useLocation();
  const { language } = useLanguage();
  const showBack = location.pathname.startsWith("/events/") && location.pathname !== "/events";

  return (
    <div className="miniapp-shell">
      <div className="screen-frame">
        <div className="screen-top">
          <ScreenHeader showBack={showBack} />
          <Logo />
        </div>
        <main className="screen-content">
          <Outlet />
        </main>
        <BottomNav language={language} />
      </div>
    </div>
  );
}
