import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { MessageCircleHeart, X, Send, Coffee } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Ciao! I'm **Sera**, your cafe concierge ☕ Ask me what to order, plan a date night, or how to reserve." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      if (!res.ok || !res.body) throw new Error(await res.text());
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...next, { role: "assistant", content: acc }]);
      }
      if (!acc) setMsgs([...next, { role: "assistant", content: "Scusi, I couldn't answer that. Try again?" }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Sorry, I'm unavailable right now — please message us on WhatsApp!" }]);
    } finally {
      setBusy(false);
    }
  }

  const chips = ["What's popular?", "Plan a date night", "Best coffee?", "How do I reserve?"];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Chat with Sera"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow animate-floaty"
      >
        {open ? <X /> : <MessageCircleHeart />}
      </button>
      {open && (
        <div className="fixed bottom-24 right-4 left-4 z-50 flex max-h-[70vh] flex-col overflow-hidden rounded-3xl border bg-card shadow-2xl animate-rise sm:left-auto sm:w-96">
          <div className="flex items-center gap-3 bg-ink px-4 py-3 text-cream">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink"><Coffee size={18} /></div>
            <div>
              <p className="font-display text-xl leading-none">Sera</p>
              <p className="text-xs opacity-70">Buona Sera concierge · AI</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-primary-foreground" : "max-w-[90%] text-foreground"}>
                {m.content ? <div className="prose prose-sm [&_p]:m-0"><ReactMarkdown>{m.content}</ReactMarkdown></div> : <span className="animate-twinkle">Sera is typing…</span>}
              </div>
            ))}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <button key={c} onClick={() => send(c)} className="rounded-full border px-3 py-1 text-xs hover:bg-secondary">{c}</button>
                ))}
              </div>
            )}
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Sera anything…" className="flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button disabled={busy} className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground disabled:opacity-50" aria-label="Send"><Send size={16} /></button>
          </form>
        </div>
      )}
    </>
  );
}
