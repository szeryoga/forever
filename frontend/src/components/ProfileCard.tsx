import type { TelegramUser } from "../types/api";

export function ProfileCard({ user }: { user: TelegramUser }) {
  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const username = user.username ? `@${user.username}` : displayName;
  const avatarUrl = user.photo_url ?? "https://telegram.org/img/t_logo.png";

  return (
    <section className="profile-card">
      <div className="profile-avatar-wrap">
        <img src={avatarUrl} alt={username || "Telegram user"} className="profile-avatar" />
      </div>
      <p className="profile-name">{displayName || username || "Telegram user"}</p>
      <p className="profile-handle">{username || "No username"}</p>
    </section>
  );
}
