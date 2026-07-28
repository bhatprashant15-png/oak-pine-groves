import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { getProduct, formatINR } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Oak & Pine" },
      { name: "description", content: "Review your Oak & Pine mushroom order and checkout securely in INR." },
      { property: "og:title", content: "Your Cart — Oak & Pine" },
      { property: "og:description", content: "Review your organic mushroom order before checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal, shipping, total } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow text-accent">Step 1 of 2</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">Your cart</h1>
      </Reveal>

      {lines.length === 0 ? (
        <Reveal>
          <div className="mt-14 rounded-lg border border-border bg-card p-14 text-center shadow-soft">
            <p className="font-display text-2xl">Your cart is still empty.</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Three harvests are waiting in the shop.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex rounded-full bg-primary px-9 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
            >
              Shop now
            </Link>
          </div>
        </Reveal>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <ul className="space-y-6">
            {lines.map((line) => {
              const p = getProduct(line.id);
              if (!p) return null;
              return (
                <li
                  key={line.id}
                  className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 rounded-lg border border-border bg-card p-4 shadow-soft sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:p-5"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-square w-full rounded-md object-cover"
                  />
                  <div className="min-w-0">
                    <h2 className="truncate text-xl">{p.name}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.weight}</p>
                    <p className="mt-2 text-sm">{formatINR(p.price)}</p>

                    <div className="mt-4 flex items-center gap-3 sm:hidden">
                      <Stepper qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                      <button
                        onClick={() => remove(line.id)}
                        className="grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                        aria-label={`Remove ${p.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="hidden items-center gap-4 sm:flex">
                    <Stepper qty={line.qty} onChange={(n) => setQty(line.id, n)} />
                    <span className="w-24 text-right text-sm tabular-nums">
                      {formatINR(p.price * line.qty)}
                    </span>
                    <button
                      onClick={() => remove(line.id)}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                      aria-label={`Remove ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <aside className="h-fit rounded-lg border border-border bg-secondary/50 p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-4 font-display text-2xl">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatINR(total)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-8 block rounded-full bg-primary px-8 py-4 text-center text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure payments via UPI, cards, net banking &amp; wallets.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}

function Stepper({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="flex shrink-0 items-center rounded-full border border-border bg-background">
      <button
        onClick={() => onChange(qty - 1)}
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-7 text-center text-sm tabular-nums">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
