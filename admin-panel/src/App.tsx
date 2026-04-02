import { Navigate, Route, Routes } from "react-router-dom";

import { AdminLayout } from "./layouts/AdminLayout";
import { BarFormPage } from "./pages/BarFormPage";
import { BarListPage } from "./pages/BarListPage";
import { EventsFormPage } from "./pages/EventsFormPage";
import { EventsListPage } from "./pages/EventsListPage";
import { ProfileSettingsPage } from "./pages/ProfileSettingsPage";

export function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventsListPage />} />
        <Route path="/events/new" element={<EventsFormPage />} />
        <Route path="/events/:eventId" element={<EventsFormPage />} />
        <Route path="/bar" element={<BarListPage />} />
        <Route path="/bar/new" element={<BarFormPage />} />
        <Route path="/bar/:itemId" element={<BarFormPage />} />
        <Route path="/profile" element={<ProfileSettingsPage />} />
      </Route>
    </Routes>
  );
}
