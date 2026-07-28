import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import heroForest from "@/assets/hero-forest.jpg";
import { Reveal } from "@/components/Reveal";
import { products, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oak & Pine — Nature's Intelligence, Grown Pure" },
      {
        name: "description",
        content:
          "Organic medicinal and gourmet mushrooms — Lion's Mane, Oyster and Moreal — grown pure in the Himalayan foothills of Uttarakhand.",
      },
      { property: "og:title", content: "Oak & Pine — Nature's Intelligence, Grown Pure" },
      {
        property: "og:description",
        content: "Luxury organic mushroom powders for brain, immunity and everyday wellness.",
      },
    ],
  }),
  component: Home,
});

const benefits = [
  {
    icon: Brain,
    title: "Brain",
    copy: "Hericenones and erinacines support memory, focus and nerve renewal — a quiet, unhurried clarity.",
  },
  {
    icon: ShieldCheck,
    title: "Immunity",
    copy: "Beta-glucans trained over centuries of forest survival, now working gently on your behalf.",
  },
  {
    icon: Sparkles,
    title: "Wellness",
    copy: "Adaptogenic balance for energy, digestion and rest — whole fruiting bodies, nothing else.",
  },
];

const testimonials = [
  {
    quote:
      "Three weeks of the Lion's Mane and my mornings feel unhurried. The ritual itself is half the medicine.",
    name: "Aparna Mehta",
    place: "Bengaluru",
  },
  {
    quote:
      "The Moreal is extraordinary — smoky, rare, and the packaging belongs on the shelf, not in a cupboard.",
    name: "Rohan Kapoor",
    place: "New Delhi",
  },
  {
    quote:
      "I've bought mushroom powders for years. This is the first that tastes like the forest it came from.",
    name: "Ishita Rawat",
    place: "Dehradun",
  },
];

function Home() {
  const { add } = useCart();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroForest}
          alt="Sunlit misty forest with wild mushrooms growing on a mossy fallen log"
          width={1920}
          height={1280}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/35 to-primary/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <p className="eyebrow text-gold">Uttarakhand · India</p>
            <h1 className="mt-5 max-w-3xl text-[2.75rem] leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              Nature's Intelligence,
              <span className="block italic text-gold">Grown Pure</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/80">
              Small-lot organic medicinal and gourmet mushrooms, cultivated on Himalayan
              hardwood and finished by hand.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-sm font-medium tracking-wide text-foreground shadow-lift transition-all duration-500 hover:gap-5"
              >
                Shop Now
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
              <a
                href="#benefits"
                className="inline-flex items-center rounded-full border border-primary-foreground/40 px-8 py-4 text-sm tracking-wide text-primary-foreground transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                Our philosophy
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow text-accent">Brain · Immunity · Wellness</p>
          <h2 className="mt-4 max-w-xl text-4xl sm:text-5xl">
            The forest has been solving this for
            <span className="italic"> 400 million years</span>.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 120}>
              <div className="h-full bg-card p-9 transition-colors duration-500 hover:bg-secondary">
                <b.icon className="h-7 w-7 text-accent" strokeWidth={1.2} />
                <h3 className="mt-6 text-2xl">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="grid gap-4 sm:flex sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow text-accent">The Collection</p>
                <h2 className="mt-4 text-4xl sm:text-5xl">Three harvests</h2>
              </div>
              <Link to="/products" className="eyebrow text-primary underline-offset-8 hover:underline">
                View all
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <article className="group h-full">
                  <Link to="/products" className="block overflow-hidden rounded-lg bg-card shadow-soft">
                    <img
                      src={p.image}
                      alt={`${p.name} mushroom powder by Oak & Pine`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-2xl">{p.name}</h3>
                      <p className="mt-1 text-xs italic text-muted-foreground">{p.latin}</p>
                    </div>
                    <span className="shrink-0 pt-2 text-sm">{formatINR(p.price)}</span>
                  </div>
                  <button
                    onClick={() => add(p.id)}
                    className="mt-5 w-full rounded-full border border-primary px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
                  >
                    Add to cart
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow text-accent">Kind words</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">From our table to yours</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="h-full rounded-lg border border-border bg-card p-8 shadow-soft">
                <blockquote className="font-display text-xl leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {t.name} · {t.place}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <h2 className="text-4xl text-primary-foreground sm:text-5xl">
              Begin your <span className="italic text-gold">daily ritual</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              Free shipping across India on orders above ₹1,500. Every jar is lab tested and
              traceable to its log.
            </p>
            <Link
              to="/products"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-primary shadow-lift transition-all duration-500 hover:gap-5"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
