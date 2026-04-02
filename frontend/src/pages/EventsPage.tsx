import { EventsList } from "../components/EventsList";
import { Logo } from "../components/Logo";
import { SectionTitle } from "../components/SectionTitle";
import { useLanguage } from "../context/LanguageContext";
import { useAsyncData } from "../hooks/useAsyncData";
import { publicApi } from "../api/public";

export function EventsPage() {
  const { language } = useLanguage();
  const { data: settings } = useAsyncData(publicApi.getSettings, []);
  const { data: events, loading, error } = useAsyncData(publicApi.getEvents, []);

  return (
    <section>
      <Logo />
      <SectionTitle>{settings?.events_page_title?.[language] ?? "..."}</SectionTitle>
      {loading && <p className="info-message">Loading events...</p>}
      {error && <p className="info-message error">{error}</p>}
      {events && <EventsList items={events} language={language} />}
    </section>
  );
}
