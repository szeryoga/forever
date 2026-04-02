import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h1 className="section-title">{children}</h1>;
}
