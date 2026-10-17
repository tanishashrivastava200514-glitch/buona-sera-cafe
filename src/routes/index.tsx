import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Music, Wifi, Trees, Baby, Laptop, Heart, MapPin, Clock } from "lucide-react";
import logoWall from "@/assets/logo-wall.jpg.asset.json";
import entrance from "@/assets/entrance.jpg.asset.json";
import g4173 from "@/assets/gallery-4173.jpg.asset.json";
import g4174 from "@/assets/gallery-4174.jpg.asset.json";
import g4175 from "@/assets/gallery-4175.jpg.asset.json";
import { signature, waLink } from "@/lib/cafe";
import { fullMenu } from "@/lib/menu-data";
import { ChatBot } from "@/components/ChatBot";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buona Sera Cafe — Wood-Fired Pizza, Pasta & Coffee" },
      { name: "description", content: "Cozy European cafe with string-lit patio, live music, wood-fired pizzas, creamy pastas and handcrafted coffee. Reserve on WhatsApp." },
      { property: "og:title", content: "Buona Sera Cafe" },
      { property: "og:description", content: "Romantic European vibes, live music & wood-fired Italian. Reserve your table on WhatsApp." },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Reserve() {
  const [f, setF] = useState({ name: "", date: "", time: "19:30", guests: "2", note: "" });
  const msg = `Ciao Buona Sera! I'd like to reserve a table.\nName: ${f.name}\nDate: ${f.date}\nTime: ${f.time}\nGuests: ${f.guests}${f.note ? `\nNote: ${f.note}` : ""}`;
  const field = "w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring";
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); window.open(waLink(msg), "_blank"); }}
      className="reveal grid gap-3 rounded-3xl border bg-card p-6 shadow-xl sm:grid-cols-2"
    >
      <input required placeholder="Your name" className={`${field} sm:col-span-2`} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <input required type="date" className={field} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} />
      <input required type="time" className={field} value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} />
      <select className={field} value={f.guests} onChange={(e) => setF({ ...f, guests: e.target.value })}>
        {["1", "2", "3", "4", "5", "6", "8", "10+"].map((g) => <option key={g}>{g} guests</option>)}
      </select>
      <input placeholder="Occasion (birthday, date…)" className={field} value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
      <button className="sm:col-span-2 rounded-full bg-whatsapp px-6 py-4 font-semibold text-ink transition hover:scale-[1.02]">
        Reserve on WhatsApp →
      </button>
    </form>
  );
}

function Index() {
  useReveal();
  const perks = [
    { icon: Music, t: "Live Music" }, { icon: Wifi, t: "Free Wi-Fi" }, { icon: Trees, t: "Outdoor Patio" },
    { icon: Baby, t: "Family Friendly" }, { icon: Laptop, t: "Work Friendly" }, { icon: Heart, t: "Date Night" },
  ];
  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink text-cream">
        <img src={logoWall.url} alt="Buona Sera floral logo wall" className="absolute inset-0 h-full w-full object-cover animate-kenburns" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-x-0 top-0 flex justify-center gap-6 pt-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-gold animate-twinkle shadow-[0_0_14px_var(--gold)]" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>
        <nav className="absolute inset-x-0 top-8 flex items-center justify-between px-6">
          <span className="font-display text-2xl tracking-widest">BUONA SERA</span>
          <Link to="/menu" className="rounded-full border border-cream/40 px-4 py-1.5 text-sm backdrop-blur">Menu</Link>
        </nav>
        <div className="relative w-full px-6 pb-16 sm:px-12">
          <p className="animate-rise text-sm uppercase tracking-[0.3em] text-gold">Italian · Continental · Coffee</p>
          <h1 className="animate-rise mt-3 text-6xl leading-[0.9] sm:text-8xl" style={{ animationDelay: ".15s" }}>
            Good evening,<br /><em className="text-rose">amore.</em>
          </h1>
          <p className="animate-rise mt-5 max-w-md text-cream/80" style={{ animationDelay: ".3s" }}>
            String lights, checkered floors, live music and wood-fired Neapolitan pizza. Your little corner of Europe.
          </p>
          <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: ".45s" }}>
            <a href="#reserve" className="rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-105">Book a table</a>
            <Link to="/menu" className="rounded-full border border-cream/50 px-7 py-4 font-semibold backdrop-blur transition hover:bg-cream/10">See the menu</Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-primary py-4 text-primary-foreground">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl italic">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Wood-fired pizza", "✦", "Creamy pasta", "✦", "Mezze platters", "✦", "Handcrafted coffee", "✦", "Live music", "✦", "Open till midnight", "✦"].map((w, i) => <span key={`${k}-${i}`}>{w}</span>),
          )}
        </div>
      </div>

      {/* About */}
      <section className="grid items-center gap-10 px-6 py-24 sm:grid-cols-2 sm:px-12">
        <div className="reveal">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">La Dolce Vita</p>
          <h2 className="mt-3 text-5xl leading-tight">A cozy, romantic,<br />Instagram-worthy escape.</h2>
          <p className="mt-5 text-muted-foreground">
            Dine under string lights on our patio among potted plants, or settle indoors among vintage posters and checkered floors.
            Perfect for dates, small groups, work sessions and family evenings.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {perks.map(({ icon: I, t }) => (
              <div key={t} className="flex flex-col items-center gap-2 rounded-2xl bg-secondary p-4 text-center text-xs font-medium transition hover:-translate-y-1">
                <I className="text-primary" size={22} />{t}
              </div>
            ))}
          </div>
        </div>
        <div className="reveal relative">
          <div className="checker absolute -bottom-4 -left-4 h-full w-full rounded-3xl opacity-90" />
          <img src={entrance.url} alt="Buona Sera cafe entrance" className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" />
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 pb-24 sm:px-12">
        <div className="reveal mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Galleria</p>
          <h2 className="mt-3 text-5xl">Moments at Buona Sera</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[
            { src: g4173.url, alt: "Cafe interior with woven pendant lights and green velvet chairs" },
            { src: g4175.url, alt: "Pasta, pizza, mezze platter and shake on the table" },
            { src: g4174.url, alt: "Buona Sera coffee menu card" },
          ].map((p, i) => (
            <div key={p.src} className={`reveal group overflow-hidden rounded-3xl ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
            </div>
          ))}
        </div>
      </section>

      {/* Signature */}
      <section className="bg-ink px-6 py-24 text-cream sm:px-12">
        <div className="reveal text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Guest Favourites</p>
          <h2 className="mt-3 text-5xl">The ones everyone orders</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {signature.map((d, i) => (
            <div key={d.name} className="reveal group rounded-3xl border border-cream/15 p-6 transition hover:-translate-y-2 hover:border-gold" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="font-display text-5xl text-gold/60 group-hover:text-gold">0{i + 1}</span>
              <h3 className="mt-4 text-2xl">{d.name}</h3>
              <p className="mt-2 text-sm text-cream/60">{d.desc}</p>
              <p className="mt-4 font-semibold text-rose">₹{d.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/menu" className="inline-block rounded-full bg-gold px-8 py-4 font-semibold text-ink transition hover:scale-105">Explore full menu</Link>
        </div>
      </section>

      {/* Menu categories */}
      <section className="px-6 py-24 sm:px-12">
        <div className="reveal text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Il Menu</p>
          <h2 className="mt-3 text-5xl">{fullMenu.reduce((n, s) => n + s.items.length, 0)} reasons to stay longer</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {fullMenu.map((s, i) => (
            <Link
              key={s.title}
              to="/menu"
              hash={s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
              className="reveal group rounded-2xl border bg-card p-4 transition hover:-translate-y-1 hover:border-primary hover:shadow-glow"
              style={{ transitionDelay: `${(i % 5) * 60}ms` }}
            >
              <p className="font-display text-xl leading-tight group-hover:text-primary">{s.title.replace(/^Buona /, "")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.items.length} items · from ₹{Math.min(...s.items.map((d) => d.price))}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Info + Reserve */}
      <section id="reserve" className="grid gap-10 px-6 py-24 sm:grid-cols-2 sm:px-12">
        <div className="reveal">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Prenota</p>
          <h2 className="mt-3 text-5xl">Save your table</h2>
          <p className="mt-4 text-muted-foreground">Fill in the details and we'll open WhatsApp with your request ready to send.</p>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex gap-3"><Clock className="text-primary" size={18} /> Open daily · until 12 am</li>
            <li className="flex gap-3"><Heart className="text-primary" size={18} /> ₹1,000 – ₹1,800 for two</li>
            <li className="flex gap-3"><MapPin className="text-primary" size={18} /> Busiest Mon & Thu evenings and Saturday nights — book ahead!</li>
          </ul>
        </div>
        <Reserve />
      </section>

      <footer className="bg-ink px-6 py-10 text-center text-cream/70">
        <p className="font-display text-3xl tracking-widest text-cream">BUONA SERA</p>
        <p className="mt-2 text-sm">Wood-fired · Handcrafted · Made with amore</p>
      </footer>

      <a href={waLink("Ciao Buona Sera! I'd like to reserve a table.")} target="_blank" rel="noreferrer" className="fixed bottom-5 left-5 z-50 rounded-full bg-whatsapp px-5 py-3 text-sm font-semibold text-ink shadow-xl">
        WhatsApp
      </a>
      <ChatBot />
    </main>
  );
}
