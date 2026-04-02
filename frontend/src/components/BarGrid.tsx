import type { BarItem, Language } from "../types/api";
import { pickLocalized, priceFormatter } from "../utils";

export function BarGrid({ items, language }: { items: BarItem[]; language: Language }) {
  return (
    <div className="bar-grid">
      {items.map((item) => (
        <article key={item.id} className="bar-card">
          <img src={item.image_url} alt={pickLocalized(item, "title", language)} />
          <div className="bar-card-body">
            <h2>{pickLocalized(item, "title", language)}</h2>
            <p>{pickLocalized(item, "short_description", language)}</p>
            <strong>{priceFormatter(item.price, item.currency, language)}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}
