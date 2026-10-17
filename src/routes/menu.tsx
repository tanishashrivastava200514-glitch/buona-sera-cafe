import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Leaf } from "lucide-react";
import { waLink } from "@/lib/cafe";
import { fullMenu } from "@/lib/menu-data";
import { ChatBot } from "@/components/ChatBot";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Full Menu — Buona Sera Cafe" },
      { name: "description", content: "160+ dishes: wood-fired pizzas, pastas, risotto, sigri grills, mezze, all-day breakfast, waffles, signature coffee, matcha, shakes and mocktails." },
      { property: "og:title", content: "Full Menu — Buona Sera Cafe" },
      { property: "og:description", content: "Explore our full menu of Italian, Continental and handcrafted drinks." },
    ],
  }),
  component: Menu,
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function Menu() {
  const [q, setQ] = useState("");
  const [veg, setVeg] = useState(false);

  const sections = useMemo(() => {
    const t = q.trim().toLowerCase();
    return fullMenu
      .map((s) => ({
        ...s,
        items: s.items.filter(
          (d) => (!veg || d.veg) && (!t || d.name.toLowerCase().includes(t) || d.desc?.toLowerCase().includes(t) || s.title.toLowerCase().includes(t)),
        ),
      }))
      .filter((s) => s.items.length);
  }, [q, veg]);

  return (
    <main className="min-h-screen pb-28">
      <header className="bg-ink px-6 pb-10 pt-8 text-cream sm:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-widest">BUONA SERA</Link>
          <a href={waLink("Ciao! I'd like to reserve a table.")} target="_blank" rel="noreferrer" className="rounded-full bg-whatsapp px-4 py-2 text-sm font-semibold text-ink">Reserve</a>
        </div>
        <p className="animate-rise mt-10 text-sm uppercase tracking-[0.3em] text-gold">Crafted with beans, served with love</p>
        <h1 className="animate-rise mt-2 text-6xl sm:text-7xl">Il Menu</h1>
        <p className="mt-2 text-cream/60">{fullMenu.length} categories · {fullMenu.reduce((n, s) => n + s.items.length, 0)} dishes & drinks</p>
      </header>

      {/* Sticky controls */}
      <div className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="flex gap-2 px-6 pt-3 sm:px-12">
          <label className="flex flex-1 items-center gap-2 rounded-full border bg-card px-4 py-2">
            <Search size={16} className="text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search pizza, matcha, waffles…" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <button
            onClick={() => setVeg((v) => !v)}
            className={`flex items-center gap-1 rounded-full border px-4 text-sm font-medium transition ${veg ? "border-olive bg-olive text-accent-foreground" : "bg-card"}`}
          >
            <Leaf size={14} /> Veg
          </button>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-6 py-3 sm:px-12 [scrollbar-width:none]">
          {sections.map((s) => (
            <a key={s.title} href={`#${slug(s.title)}`} className="shrink-0 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium transition hover:bg-primary hover:text-primary-foreground">
              {s.title.replace(/^Buona /, "")}
            </a>
          ))}
        </nav>
      </div>

      <div className="grid gap-6 px-6 pt-8 sm:px-12 lg:grid-cols-2">
        {sections.length === 0 && <p className="text-muted-foreground">No dishes match — try another search.</p>}
        {sections.map((sec, si) => (
          <section id={slug(sec.title)} key={sec.title} className="animate-rise scroll-mt-32 rounded-3xl border bg-card p-6" style={{ animationDelay: `${Math.min(si, 6) * 0.06}s` }}>
            <div className="flex items-baseline justify-between">
              <h2 className="text-3xl text-primary">{sec.title}</h2>
              <span className="text-xs text-muted-foreground">{sec.items.length} items</span>
            </div>
            <ul className="mt-4 divide-y">
              {sec.items.map((d) => (
                <li key={d.name} className="flex justify-between gap-4 py-3">
                  <div>
                    <p className="flex items-center gap-2 font-medium">
                      <span className={`inline-block h-3 w-3 shrink-0 rounded-sm border-2 ${d.veg ? "border-olive" : "border-destructive"}`} aria-label={d.veg ? "Vegetarian" : "Non-vegetarian"} />
                      {d.name}
                    </p>
                    {d.desc && <p className="mt-0.5 line-clamp-2 pl-5 text-xs text-muted-foreground">{d.desc}</p>}
                  </div>
                  <span className="shrink-0 font-semibold">₹{d.price}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <ChatBot />
    </main>
  );
}
