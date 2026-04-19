export function Logo() {
  const logoSrc = `${import.meta.env.BASE_URL}assets/logo-neon.png`;

  return (
    <div className="logo-wrap">
      <img src={logoSrc} alt="Вечно Молодой" className="logo-image" />
    </div>
  );
}
