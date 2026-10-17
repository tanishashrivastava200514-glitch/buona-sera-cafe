import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { fullMenu } from "@/lib/menu-data";

const MENU_TEXT = fullMenu.map((c) => `${c.title}: ` + c.items.map((d) => `${d.name}${d.veg ? " (veg)" : ""} ₹${d.price}`).join(", ")).join("\n");

const SYSTEM = `You are "Sera", the warm, witty concierge of Buona Sera Cafe — a cozy, romantic European-style cafe with an outdoor patio under string lights, potted plants, vintage posters and checkered floors. Live music, free Wi-Fi, outdoor seating, family- and work-friendly. Busiest Monday & Thursday evenings and Saturday nights. Average cost ₹1,000–₹1,800 for two (without alcohol). Open until 12 am.
Cuisine: authentic Italian & Continental — live wood-fired Neapolitan pizzas, creamy pastas, Mediterranean mezze, Sigri grills, handcrafted coffee, matcha, shakes and mocktails.
Popular: Chicken Espetada ₹525, Alfredo Pasta ₹545, Farm House Pizza ₹655, Trilogy Hummus Falafel Pita ₹425, Mocha ₹329.
More menu: Margherita ₹515, Quattro Formaggi ₹549, Smoked Chicken Pizza ₹695, BBQ Chicken Pizza ₹695, Fungi ₹525, Aglio Olio ₹525, Avocado Quinoa Salad ₹495, Koobideh Kebab ₹625, Chicken Wings ₹525, Classic Nachos ₹435, Lamb Burger ₹495, Mushroom Burger ₹425, Cappuccino ₹299, Flat White ₹349, Salted Caramel Mocha Latte ₹399, Coastal Mix ₹399, Strawberry Matcha ₹359, Crunchy Nutella monster shake ₹459, Passionate Kiss mocktail ₹349, Virgin Sangria ₹349.
Help guests pick dishes, plan dates, and reserve. For reservations, tell them to tap the "Reserve on WhatsApp" button. Keep answers short (2-4 sentences), friendly, sprinkle light Italian ("Ciao!", "Perfetto"). Never invent offers or discounts.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return new Response("AI not configured", { status: 500 });
        const body = (await request.json()) as { messages: { role: "user" | "assistant"; content: string }[] };
        const messages = (body.messages ?? []).slice(-20).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: String(m.content).slice(0, 2000),
        })) as ModelMessage[];
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions: `${SYSTEM}\n\nFULL MENU:\n${MENU_TEXT}`,
          messages,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              store: false,
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            },
          },
        } as Parameters<typeof streamText>[0]);
        return result.toTextStreamResponse();
      },
    },
  },
});
