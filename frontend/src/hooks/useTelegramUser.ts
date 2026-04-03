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
    let attempts = 0;
    const maxAttempts = 20;

    const syncTelegramUser = () => {
      const webApp = window.Telegram?.WebApp;
      webApp?.ready();
      webApp?.expand();

      const telegramUser = webApp?.initDataUnsafe?.user;
      if (telegramUser) {
        setUser(telegramUser);
        return true;
      }

      return false;
    };

    if (syncTelegramUser()) {
      return;
    }

    const intervalId = window.setInterval(() => {
      attempts += 1;
      if (syncTelegramUser() || attempts >= maxAttempts) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return user;
}
