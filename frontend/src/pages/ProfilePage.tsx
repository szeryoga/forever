import { publicApi } from "../api/public";
import { ProfileCard } from "../components/ProfileCard";
import { SectionTitle } from "../components/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { useAsyncData } from "../hooks/useAsyncData";
import { useTelegramUser } from "../hooks/useTelegramUser";

export function ProfilePage() {
  const { language, setLanguage } = useLanguage();
  const user = useTelegramUser();
  const { data } = useAsyncData(publicApi.getProfilePage, []);

  return (
    <section>
      <SectionTitle>{data?.title?.[language] ?? "..."}</SectionTitle>
      <ProfileCard user={user} />
      <div className="language-switch">
        <button
          type="button"
          className={language === "ru" ? "lang-label active" : "lang-label"}
          onClick={() => setLanguage("ru")}
        >
          {data?.language_label_ru ?? "Русский"}
        </button>
        <button
          type="button"
          className={language === "en" ? "lang-label active" : "lang-label"}
          onClick={() => setLanguage("en")}
        >
          {data?.language_label_en ?? "English"}
        </button>
        <span className={`language-knob ${language === "en" ? "right" : ""}`} />
      </div>
    </section>
  );
}
