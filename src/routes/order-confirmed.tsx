import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const WHATSAPP_NUMBER = "919027407902";

export const Route = createFileRoute("/order-confirmed")({
head: () => ({
meta: [
{ title: "Ordering Information — OAK AND PINE" },
{
name: "description",
content:
"OAK AND PINE is preparing its mushroom collection. Contact us for availability updates.",
},
{ name: "robots", content: "noindex" },
],
}),
component: OrderInformation,
});

function OrderInformation() {
const message = encodeURIComponent(
"Hello OAK AND PINE, I visited your website and would like to ask about mushroom availability and ordering."
);

const whatsappUrl = "https://wa.me/${WHATSAPP_NUMBER}?text=${message}";

return (
<div className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
<Reveal>
<p className="eyebrow text-accent">OAK AND PINE</p>

    <h1 className="mt-4 text-4xl sm:text-5xl">
      Thank you for your interest
    </h1>

    <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
      This page does not confirm an order or payment. We are preparing
      our mushroom collection, and online ordering is not available yet.
    </p>

    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
      Contact us on WhatsApp to ask about upcoming product availability
      and pricing.
    </p>

    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-accent"
      >
        <MessageCircle className="h-4 w-4" />
        Ask on WhatsApp
      </a>

      <Link
        to="/products"
        className="rounded-full border border-border px-8 py-4 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-secondary"
      >
        Explore products
      </Link>

      <Link
        to="/"
        className="rounded-full border border-border px-8 py-4 text-xs uppercase tracking-[0.15em] transition-colors hover:bg-secondary"
      >
        Back home
      </Link>
    </div>
  </Reveal>
</div>

);
}
