import { Navigate, Route, Routes } from "react-router-dom";

import { MiniAppLayout } from "./layouts/MiniAppLayout";
import { BarPage } from "./pages/BarPage";
import { EventDetailsPage } from "./pages/EventDetailsPage";
import { EventsPage } from "./pages/EventsPage";
import { ProfilePage } from "./pages/ProfilePage";

export function App() {
  return (
    <Routes>
      <Route element={<MiniAppLayout />}>
        <Route index element={<Navigate to="/events" replace />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:eventId" element={<EventDetailsPage />} />
        <Route path="/bar" element={<BarPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
