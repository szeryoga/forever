import { useEffect, useState } from "react";

import type { TelegramUser } from "../types/api";

declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
      };
    };
  }
}

const fallbackUser: TelegramUser = {
  username: "telegramusername",
  first_name: "Forever",
  last_name: "Guest",
};

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser>(fallbackUser);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;
    webApp?.ready();
    webApp?.expand();

    const telegramUser = webApp?.initDataUnsafe?.user;
    if (telegramUser) {
      setUser(telegramUser);
    }
  }, []);

  return user;
}
