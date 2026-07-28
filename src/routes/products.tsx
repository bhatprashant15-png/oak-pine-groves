import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { products, formatINR, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop Organic Mushrooms — Oak & Pine" },
      {
        name: "description",
        content:
          "Buy organic Lion's Mane, Oyster and Moreal mushroom powders. Lab tested, small-lot, shipped across India.",
      },
      { property: "og:title", content: "Shop Organic Mushrooms — Oak & Pine" },
      {
        property: "og:description",
        content: "Lion's Mane, Oyster and Moreal — organic mushroom powders priced in INR.",
      },
    ],
  }),
  component: Products,
});

function QuantityStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex shrink-0 items-center rounded-full border border-border">
      <button
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-8 text-center text-sm tabular-nums">{qty}</span>
      <button
        onClick={() => onChange(Math.min(99, qty + 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className={`overflow-hidden rounded-lg bg-card shadow-soft ${flipped ? "md:order-2" : ""}`}>
          <img
            src={product.image}
            alt={`${product.name} (${product.latin}) mushroom powder jar`}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-accent">{product.weight}</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{product.name}</h2>
          <p className="mt-2 text-sm italic text-muted-foreground">{product.latin}</p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ul className="mt-7 space-y-2.5">
            {product.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.6} />
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 font-display text-3xl">{formatINR(product.price)}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper qty={qty} onChange={setQty} />
            <button
              onClick={handleAdd}
              className="min-w-[180px] flex-1 rounded-full bg-primary px-8 py-3.5 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-all duration-500 hover:bg-accent"
            >
              {added ? "Added ✓" : "Add to cart"}
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Products() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow text-accent">The Collection</p>
        <h1 className="mt-4 max-w-2xl text-5xl sm:text-6xl">
          Grown slowly, <span className="italic">harvested once</span>
        </h1>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Every lot is cultivated on Himalayan hardwood, dual-extracted where it matters, and
          third-party tested for heavy metals and potency.
        </p>
      </Reveal>

      <div className="mt-20 space-y-28">
        {products.map((p, i) => (
          <ProductRow key={p.id} product={p} index={i} />
        ))}
      </div>

      <Reveal className="mt-24">
        <div className="rounded-lg border border-border bg-secondary/50 p-10 text-center">
          <p className="font-display text-2xl">Ready when you are.</p>
          <Link
            to="/cart"
            className="mt-6 inline-flex rounded-full bg-primary px-9 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
          >
            View cart
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
