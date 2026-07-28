import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";

/**
 * POST /api/public/create-order
 *
 * Creates a Razorpay order for the given cart lines.
 * The amount is ALWAYS recomputed on the server from the trusted price list —
 * client-supplied totals are never trusted.
 *
 * Environment variables (set as project secrets, never in code):
 *   RAZORPAY_KEY_ID      = "your_key_here"
 *   RAZORPAY_KEY_SECRET  = "your_secret_here"
 *
 * If the keys are absent the route replies with { demo: true } so the storefront
 * can run a simulated checkout during development.
 */
export const Route = createFileRoute("/api/public/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // --- read secrets at request time (never at module scope) ---
        const keyId = process.env.RAZORPAY_KEY_ID;
        const keySecret = process.env.RAZORPAY_KEY_SECRET;

        // --- validate input -------------------------------------------------
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        const rawLines = (body as { lines?: unknown })?.lines;
        if (!Array.isArray(rawLines) || rawLines.length === 0) {
          return Response.json({ error: "Cart is empty" }, { status: 400 });
        }

        let subtotal = 0;
        for (const raw of rawLines) {
          const id = (raw as { id?: unknown })?.id;
          const qty = (raw as { qty?: unknown })?.qty;
          if (typeof id !== "string" || typeof qty !== "number") {
            return Response.json({ error: "Malformed cart line" }, { status: 400 });
          }
          const product = products.find((p) => p.id === id);
          if (!product) {
            return Response.json({ error: `Unknown product: ${id}` }, { status: 400 });
          }
          if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
            return Response.json({ error: "Quantity must be 1–99" }, { status: 400 });
          }
          subtotal += product.price * qty;
        }

        const shipping = subtotal >= 1500 ? 0 : 99;
        const amountInPaise = (subtotal + shipping) * 100; // Razorpay works in paise

        // --- demo mode: no keys configured yet -------------------------------
        if (!keyId || !keySecret) {
          return Response.json({
            demo: true,
            amount: amountInPaise,
            currency: "INR",
          });
        }

        // --- create the Razorpay order --------------------------------------
        const auth = btoa(`${keyId}:${keySecret}`);
        const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${auth}`,
          },
          body: JSON.stringify({
            amount: amountInPaise,
            currency: "INR",
            receipt: `oakpine_${Date.now()}`,
            notes: { brand: "Oak & Pine" },
          }),
        });

        if (!rzpResponse.ok) {
          return Response.json(
            { error: "Could not create payment order. Please try again." },
            { status: 502 },
          );
        }

        const order = (await rzpResponse.json()) as { id: string; amount: number };

        return Response.json({
          demo: false,
          keyId, // publishable key — safe to send to the browser
          orderId: order.id,
          amount: order.amount,
          currency: "INR",
        });
      },
    },
  },
});
