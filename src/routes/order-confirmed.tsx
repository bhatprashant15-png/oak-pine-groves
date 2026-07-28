import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (search: Record<string, unknown>) => ({
    payment: typeof search.payment === "string" ? search.payment : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Payment Successful — Oak & Pine" },
      { name: "description", content: "Your Oak & Pine order is confirmed and on its way." },
      { property: "og:title", content: "Payment Successful — Oak & Pine" },
      { property: "og:description", content: "Thank you for your Oak & Pine order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const { payment } = Route.useSearch();

  return (
    <div className="mx-auto max-w-2xl px-5 py-28 text-center sm:px-8">
      <Reveal>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift">
          <Check className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <p className="eyebrow mt-8 text-accent">Payment Successful</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">Thank you</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your order is confirmed. A receipt is on its way to your inbox, and your jars will
          leave our Almora studio within two working days.
        </p>
        {payment && (
          <p className="mt-6 inline-block rounded-full border border-border bg-secondary/60 px-5 py-2 text-xs tracking-[0.15em] uppercase">
            Payment ID · {payment}
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="rounded-full border border-border px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-secondary"
          >
            Back home
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
