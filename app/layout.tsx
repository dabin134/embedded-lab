import type { Metadata } from "next";
import "./globals.css";
import "./soft-scientific.css";
import "./palette-polish.css";
import "./readability-brand.css";
import "./project-learning.css";
import "./code-learning.css";
import "./brand-system.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Embedded Lab",
  description: "Embedded Systems verstehen, bauen und experimentell begreifen.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <footer className="site-footer">
            <div>
              <strong>Embedded Lab</strong>
              <span>Vom Bauteil zum System.</span>
            </div>
            <span>Concepts · Components · Projects</span>
          </footer>
        </div>
      </body>
    </html>
  );
}
