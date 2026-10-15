import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sprout,
  Package,
  Leaf,
  ArrowRight,
} from "lucide-react";
import heroForest from "@/assets/hero-forest.jpg";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "OAK AND PINE — Fresh Mushrooms & Mushroom Products",
      },
      {
        name: "description",
        content:
          "Discover OAK AND PINE, an upcoming mushroom-growing venture in Pauri Garhwal, Uttarakhand, preparing fresh mushrooms and mushroom powder.",
      },
      {
        property: "og:title",
        content: "OAK AND PINE — Grown in the Hills",
      },
      {
        property: "og:description",
        content:
          "Fresh mushrooms and mushroom powder from our upcoming growing venture in Uttarakhand. Our first harvest is in preparation.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  {
    icon: Sprout,
    title: "Growing with care",
    copy:
      "We are preparing our growing setup in the hills of Uttarakhand, with care given to each stage of cultivation.",
  },
  {
    icon: Leaf,
    title: "Mushrooms first",
    copy:
      "Our planned range focuses on gourmet mushrooms, including Oyster and Lion's Mane, as our growing journey develops.",
  },
  {
    icon: Package,
    title: "Products in preparation",
    copy:
      "We plan to explore fresh mushrooms and mushroom powder. Product availability will be announced when ready.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <img
          src={heroForest}
          alt="Misty forest landscape in the hills"
          width={1920}
          height={1280}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/35 to-primary/20" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <p className="eyebrow text-gold">
              Pauri Garhwal · Uttarakhand · India
            </p>

            <h1 className="mt-5 max-w-3xl text-[2.75rem] leading-[1.05] text-primary-foreground sm:text-6xl lg:text-7xl">
              Rooted in Nature,
              <span className="block italic text-gold">
                Grown with Care
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-primary-foreground/80">
              A mushroom-growing venture taking shape in the
              hills of Uttarakhand. We are preparing for our
              first harvest and building our future range of
              fresh mushrooms and mushroom powder.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-sm font-medium tracking-wide text-foreground shadow-lift transition-all duration-500 hover:gap-5"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>

              <a
                href="#our-approach"
                className="inline-flex items-center rounded-full border border-primary-foreground/40 px-8 py-4 text-sm tracking-wide text-primary-foreground transition-colors duration-500 hover:border-gold hover:text-gold"
              >
                Our approach
              </a>
            </div>

            <p className="mt-6 text-xs tracking-wide text-primary-foreground/70">
              First harvest and product availability to be announced.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our approach */}
      <section
        id="our-approach"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8"
      >
        <Reveal>
          <p className="eyebrow text-accent">
            Our Growing Journey
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
            Building something meaningful,
            <span className="italic"> one harvest at a time.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            OAK AND PINE is at the preparation and growing
            stage. Our focus is to develop our cultivation
            setup, learn from every growing cycle, and prepare
            a mushroom range we can confidently offer when
            it is ready.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="h-full bg-card p-9 transition-colors duration-500 hover:bg-secondary">
                <item.icon
                  className="h-7 w-7 text-accent"
                  strokeWidth={1.2}
                />

                <h3 className="mt-6 text-2xl">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Planned product range */}
      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-accent">
              Coming Soon
            </p>

            <h2 className="mt-4 text-4xl sm:text-5xl">
              Our planned mushroom range
            </h2>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              These varieties represent the direction of our
              planned collection. They are not a confirmation
              of current stock or availability.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <article className="group h-full">
                  <div className="overflow-hidden rounded-lg bg-card shadow-soft">
                    <img
                      src={p.image}
                      alt={`${p.name} — planned OAK AND PINE product range`}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-5">
                    <h3 className="text-2xl">
                      {p.name}
                    </h3>

                    <p className="mt-2 text-xs italic text-muted-foreground">
                      {p.latin}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      Part of our planned mushroom collection.
                      Availability will be announced after
                      production is ready.
                    </p>
                  </div>

                  <div className="mt-5 w-full rounded-full border border-border px-6 py-3 text-center text-xs tracking-[0.2em] uppercase text-muted-foreground">
                    Coming Soon
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <p className="eyebrow text-accent">
            From Uttarakhand
          </p>

          <h2 className="mt-4 max-w-2xl text-4xl sm:text-5xl">
            A small beginning with a
            <span className="italic"> long-term vision.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Our journey starts in Pauri Garhwal, Uttarakhand.
            We are working towards developing a mushroom-growing
            venture focused on fresh harvests and future
            mushroom-based products. We will share updates as
            our setup and product range develop.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-primary px-8 py-4 text-sm transition-colors duration-500 hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      {/* Contact CTA */}
      <section className="bg-forest">
        <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
          <Reveal>
            <p className="eyebrow text-gold">
              OAK AND PINE
            </p>

            <h2 className="mt-4 text-4xl text-primary-foreground sm:text-5xl">
              Follow our
              <span className="italic text-gold">
                {" "}growing journey
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/70">
              Interested in future harvests, wholesale
              opportunities, or our upcoming product range?
              Contact us to share your inquiry.
            </p>

            <Link
              to="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-primary shadow-lift transition-all duration-500 hover:gap-5"
            >
              Contact OAK AND PINE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
