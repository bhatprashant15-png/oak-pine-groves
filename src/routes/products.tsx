import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { products, type Product } from "@/lib/products";

const WHATSAPP_NUMBER = "919027407902";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      {
        title: "Our Mushroom Range — OAK AND PINE",
      },
      {
        name: "description",
        content:
          "Explore the planned fresh mushroom and mushroom powder range from OAK AND PINE, Pauri Garhwal, Uttarakhand. Contact us for future availability.",
      },
      {
        property: "og:title",
        content: "Our Mushroom Range — OAK AND PINE",
      },
      {
        property: "og:description",
        content:
          "Discover our planned mushroom range. Availability will be announced when products are ready.",
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
        type="button"
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="w-8 text-center text-sm tabular-nums">
        {qty}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(99, qty + 1))}
        className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-secondary"
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function ProductRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [qty, setQty] = useState(1);

  const sendWhatsAppInquiry = () => {
    const message = [
      "Hello OAK AND PINE!",
      "",
      "I am interested in this planned product:",
      `Product: ${product.name}`,
      `Quantity requested: ${qty}`,
      "",
      "Please let me know when it becomes available,",
      "along with the price, packaging and delivery charges.",
      "",
      "Name:",
      "Delivery location:",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const flipped = index % 2 === 1;

  return (
    <Reveal>
      <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div
          className={`overflow-hidden rounded-lg bg-card shadow-soft ${
            flipped ? "md:order-2" : ""
          }`}
        >
          <img
            src={product.image}
            alt={`${product.name} — planned OAK AND PINE range`}
            loading="lazy"
            width={1024}
            height={1024}
            className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out hover:scale-105"
          />
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-accent">
            Planned product range
          </p>

          <h2 className="mt-3 text-4xl sm:text-5xl">
            {product.name}
          </h2>

          <p className="mt-2 text-sm italic text-muted-foreground">
            {product.latin}
          </p>

          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.name} is part of our planned mushroom
            collection. We are preparing our growing setup.
            Product format, price and availability will be
            confirmed when ready.
          </p>

          <div className="mt-7 rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-sm font-medium">
              Coming Soon
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Send us a WhatsApp inquiry to ask about future
              availability. This is not a confirmed order.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantityStepper qty={qty} onChange={setQty} />

            <button
              type="button"
              onClick={sendWhatsAppInquiry}
              className="min-w-[180px] flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs tracking-[0.12em] uppercase text-primary-foreground transition-all duration-500 hover:bg-accent"
            >
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
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
        <p className="eyebrow text-accent">
          OAK AND PINE
        </p>

        <h1 className="mt-4 max-w-2xl text-5xl sm:text-6xl">
          Our mushroom range,
          <span className="italic"> coming soon</span>
        </h1>

        <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
          We are preparing our mushroom-growing venture in
          Pauri Garhwal, Uttarakhand. Our planned range includes
          fresh mushrooms and mushroom powder. Contact us for
          updates on availability.
        </p>
      </Reveal>

      <div className="mt-20 space-y-28">
        {products.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
            index={index}
          />
        ))}
      </div>

      <Reveal>
        <div className="mt-24 rounded-lg border border-border bg-secondary/50 p-10 text-center">
          <p className="font-display text-2xl">
            Stay in touch
          </p>

          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Contact us about future harvests, product
            availability and wholesale inquiries.
          </p>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
              "Hello OAK AND PINE! I would like updates about your upcoming mushroom products."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-xs tracking-[0.15em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
          >
            <MessageCircle className="h-4 w-4" />
            Contact on WhatsApp
          </a>
        </div>
      </Reveal>
    </div>
  );
}
