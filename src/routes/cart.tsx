import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const WHATSAPP_NUMBER = "919027407902";

export const Route = createFileRoute("/cart")({
head: () => ({
meta: [
{ title: "Ordering Information — OAK AND PINE" },
{
name: "description",
content:
"OAK AND PINE is preparing its first mushroom collection. Contact us on WhatsApp for availability updates.",
},
],
}),
component: CartPage,
});

function CartPage() {
const message = encodeURIComponent(
"Hello OAK AND PINE, I would like to know when fresh mushrooms and mushroom powder will be available."
);

const whatsappUrl = "https://wa.me/${WHATSAPP_NUMBER}?text=${message}";

return (
<div className="mx-auto max-w-4xl px-5 pt-16 sm:px-8 sm:pt-24">
<Reveal>
<p className="eyebrow text-accent">OAK AND PINE</p>

    <h1 className="mt-4 text-5xl sm:text-6xl">
      Ordering is coming soon
    </h1>

    <div className="mt-10 rounded-lg border border-border bg-card p-8 shadow-soft sm:p-12">
      <p className="text-lg leading-8 text-muted-foreground">
        We are preparing our mushroom collection. Online checkout and
        payments are not available yet.
      </p>

      <p className="mt-4 leading-7 text-muted-foreground">
        Contact us on WhatsApp to ask about upcoming availability of fresh
        mushrooms and mushroom powder. We will share availability and
        pricing when confirmed.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-accent"
      >
        <MessageCircle className="h-4 w-4" />
        Ask us on WhatsApp
      </a>

      <div>
        <Link
          to="/products"
          className="mt-6 inline-block text-sm underline underline-offset-4"
        >
          Explore our planned products
        </Link>
      </div>
    </div>
  </Reveal>
</div>

);
}
