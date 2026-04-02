import { publicApi } from "../api/public";
import { BarGrid } from "../components/BarGrid";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { useAsyncData } from "../hooks/useAsyncData";

export function BarPage() {
  const { language } = useLanguage();
  const { data: settings } = useAsyncData(publicApi.getSettings, []);
  const { data: items, loading, error } = useAsyncData(publicApi.getBarItems, []);

  return (
    <section>
      <Logo />
      <SectionTitle>{settings?.bar_page_title?.[language] ?? "..."}</SectionTitle>
      {loading && <p className="info-message">Loading menu...</p>}
      {error && <p className="info-message error">{error}</p>}
      {items && <BarGrid items={items} language={language} />}
    </section>
  );
}
