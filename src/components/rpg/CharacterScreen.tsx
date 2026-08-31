import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StatusPanel } from "./panels/StatusPanel";
import { StatsPanel } from "./panels/StatsPanel";
import { SkillsPanel } from "./panels/SkillsPanel";
import { QuestsPanel } from "./panels/QuestsPanel";

const NAV_ITEMS = [
  { id: "status", label: "STATUS", hint: "Character info" },
  { id: "stats", label: "STATS", hint: "Attributes" },
  { id: "skills", label: "SKILLS", hint: "Abilities" },
  { id: "quests", label: "QUESTS", hint: "Quest log" },
] as const;

type Section = (typeof NAV_ITEMS)[number]["id"];

const PANELS: Record<Section, React.ReactNode> = {
  status: <StatusPanel />,
  stats: <StatsPanel />,
  skills: <SkillsPanel />,
  quests: <QuestsPanel />,
};

const EXIT_HREF = import.meta.env.BASE_URL;

export function CharacterScreen() {
  const [active, setActive] = useState<Section>("status");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") window.location.href = EXIT_HREF;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const selectSection = (id: Section) => {
    setActive(id);
    setMenuOpen(false);
  };

  const activeLabel = NAV_ITEMS.find((i) => i.id === active)?.label;

  return (
    <>
      {/* ── Mobile layout (< md) ─────────────────────────────────────── */}
      <div className="md:hidden flex flex-col h-screen bg-rpg-navy">

        {/* Mobile header */}
        <div className="border-b-2 border-rpg-border bg-rpg-panel flex items-center justify-between px-4 py-3 shrink-0">
          <div className="flex flex-col">
            <span className="text-rpg-gold text-[10px] tracking-[0.3em] uppercase font-mono">
              Ryan Honea
            </span>
            <span className="text-rpg-muted text-[9px] tracking-[0.2em] uppercase font-mono">
              {activeLabel}
            </span>
          </div>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-rpg-gold p-1 hover:text-rpg-text transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="border-b-2 border-rpg-border bg-rpg-panel shrink-0">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => selectSection(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-5 py-3 text-left transition-colors",
                        "text-xs tracking-[0.2em] uppercase font-mono border-b border-rpg-border/40 last:border-0",
                        isActive
                          ? "text-rpg-gold bg-rpg-panel-alt"
                          : "text-rpg-muted",
                      )}
                    >
                      <span className={cn("text-rpg-cursor transition-opacity", isActive ? "opacity-100" : "opacity-0")}>
                        ►
                      </span>
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Mobile content */}
        <main className="flex-1 bg-rpg-panel/50 overflow-y-auto">
          {PANELS[active]}
        </main>

        {/* Mobile footer */}
        <div className="border-t-2 border-rpg-border bg-rpg-panel px-4 py-2 shrink-0 flex items-center justify-between">
          <span className="text-rpg-muted text-[9px] tracking-widest font-mono uppercase">
            <span className="text-rpg-gold-dim">[ ☰ ]</span> Menu
          </span>
          <a
            href={EXIT_HREF}
            className="text-rpg-muted text-[9px] tracking-widest font-mono uppercase hover:text-rpg-gold transition-colors"
          >
            <span className="text-rpg-gold-dim">[ × ]</span> Exit
          </a>
        </div>
      </div>

      {/* ── Desktop layout (>= md) ────────────────────────────────────── */}
      <div className="hidden md:flex h-screen bg-rpg-navy items-center justify-center p-8">
        {/* Outer window */}
        <div
          className="w-full max-w-5xl h-[640px] border-2 border-rpg-border flex flex-col"
          style={{
            boxShadow:
              "0 0 0 1px oklch(0.55 0.09 85 / 0.2), inset 0 0 0 1px oklch(0.32 0.09 260)",
          }}
        >
          {/* ── Header bar ── */}
          <div className="border-b-2 border-rpg-border bg-rpg-panel flex items-center justify-between px-5 py-3">
            <span className="text-rpg-gold text-xs tracking-[0.3em] uppercase font-mono">
              Character Screen — Ryan Honea
            </span>
            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-rpg-gold opacity-60" />
              <span className="size-1.5 rounded-full bg-rpg-gold opacity-40" />
              <span className="size-1.5 rounded-full bg-rpg-gold opacity-20" />
            </div>
          </div>

          {/* ── Body: nav + content ── */}
          <div className="flex flex-1 min-h-0">
            {/* Left nav panel */}
            <nav className="flex flex-col border-r-2 border-rpg-border bg-rpg-panel w-44 shrink-0 py-6">
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActive(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-4 py-2.5 text-left transition-colors",
                          "text-xs tracking-[0.2em] uppercase font-mono",
                          isActive
                            ? "text-rpg-gold bg-rpg-panel-alt"
                            : "text-rpg-muted hover:text-rpg-text hover:bg-rpg-panel-alt/50",
                        )}
                      >
                        <span
                          className={cn(
                            "text-rpg-cursor transition-opacity",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        >
                          ►
                        </span>
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Spacer + separator */}
              <div className="mt-auto pt-6 mx-4 border-t border-rpg-border">
                <p className="text-rpg-muted text-[10px] tracking-wider font-mono leading-relaxed">
                  {NAV_ITEMS.find((i) => i.id === active)?.hint}
                </p>
              </div>
            </nav>

            {/* Content panel */}
            <main className="flex-1 bg-rpg-panel/50 overflow-y-auto">
              {PANELS[active]}
            </main>
          </div>

          {/* ── Footer bar ── */}
          <div className="border-t-2 border-rpg-border bg-rpg-panel px-5 py-2 flex items-center gap-6">
            <span className="text-rpg-muted text-[10px] tracking-widest font-mono uppercase">
              <span className="text-rpg-gold-dim">[ ↑↓ ]</span> Navigate
            </span>
            <span className="text-rpg-muted text-[10px] tracking-widest font-mono uppercase">
              <span className="text-rpg-gold-dim">[ Enter ]</span> Select
            </span>
            <a
              href={EXIT_HREF}
              className="ml-auto text-rpg-muted text-[10px] tracking-widest font-mono uppercase hover:text-rpg-gold transition-colors"
            >
              <span className="text-rpg-gold-dim">[ Esc ]</span> Leave
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
