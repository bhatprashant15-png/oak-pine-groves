import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact — OAK AND PINE, Pauri Garhwal, Uttarakhand",
      },
      {
        name: "description",
        content:
          "Contact OAK AND PINE in Pauri Garhwal, Uttarakhand for mushroom products, wholesale inquiries and business inquiries.",
      },
      {
        property: "og:title",
        content: "Contact — OAK AND PINE",
      },
      {
        property: "og:description",
        content:
          "Contact OAK AND PINE, Pauri Garhwal, Uttarakhand, India.",
      },
    ],
  }),
  component: Contact,
});

type Errors = {
  name?: string;
  email?: string;
  message?: string;
};

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const next: Errors = {};

    if (form.name.trim().length < 2) {
      next.name = "Please enter your name";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        form.email.trim()
      )
    ) {
      next.email = "Enter a valid email";
    }

    if (form.message.trim().length < 10) {
      next.message =
        "Tell us a little more (10+ characters)";
    }

    setErrors(next);

    if (Object.keys(next).length === 0) {
      const subject = encodeURIComponent(
        `Website inquiry from ${form.name.trim()}`
      );

      const body = encodeURIComponent(
        `Name: ${form.name.trim()}\n` +
          `Email: ${form.email.trim()}\n\n` +
          `Message:\n${form.message.trim()}`
      );

      window.location.href =
        `mailto:workflowprashant08@gmail.com?subject=${subject}&body=${body}`;

      setSent(true);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow text-accent">
          Pauri Garhwal · Uttarakhand · India
        </p>

        <h1 className="mt-4 max-w-xl text-5xl sm:text-6xl">
          Get in touch with{" "}
          <span className="italic">OAK AND PINE</span>
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-8">
            {[
              {
                Icon: MapPin,
                title: "Address",
                lines: [
                  "Village Bissi, Bhirgukhal, Yamkeshwar",
                  "Pauri Garhwal, Uttarakhand, India",
                ],
              },
              {
                Icon: Mail,
                title: "Email",
                lines: ["workflowprashant08@gmail.com"],
              },
              {
                Icon: Phone,
                title: "Phone",
                lines: [
                  "+91 9027407902",
                  "By appointment · Online inquiries only",
                ],
              },
            ].map(({ Icon, title, lines }) => (
              <div key={title} className="flex gap-5">
                <Icon
                  className="mt-1 h-5 w-5 shrink-0 text-accent"
                  strokeWidth={1.3}
                />

                <div className="min-w-0">
                  <h2 className="eyebrow text-muted-foreground">
                    {title}
                  </h2>

                  {lines.map((line) => (
                    <p
                      key={line}
                      className="mt-1 text-sm"
                    >
                      {line}
                    </p>
                  ))}

                  {title === "Email" && (
                    <a
                      href="mailto:workflowprashant08@gmail.com"
                      className="mt-2 inline-block text-sm underline"
                    >
                      Send an email
                    </a>
                  )}

                  {title === "Phone" && (
                    <a
                      href="tel:+919027407902"
                      className="mt-2 inline-block text-sm underline"
                    >
                      Call us
                    </a>
                  )}
                </div>
              </div>
            ))}

            <div className="rounded-lg border border-border bg-secondary/50 p-8">
              <p className="font-display text-2xl">
                Business inquiries
              </p>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Contact OAK AND PINE for mushroom products,
                wholesale inquiries, and other business
                inquiries. Visits are by prior arrangement
                only. Please contact us before planning a visit.
              </p>

              <a
                href="mailto:workflowprashant08@gmail.com"
                className="mt-5 inline-block text-sm underline"
              >
                Contact OAK AND PINE
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={submit}
            noValidate
            className="rounded-lg border border-border bg-card p-8 shadow-soft"
          >
            <h2 className="text-2xl">Send a message</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Fill in the details below to prepare an email
              inquiry.
            </p>

            <label className="mt-6 block">
              <span className="eyebrow text-muted-foreground">
                Name
              </span>

              <input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setSent(false);
                }}
                className={`mt-2 w-full rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${
                  errors.name
                    ? "border-destructive"
                    : "border-border"
                }`}
              />

              {errors.name && (
                <span className="mt-1.5 block text-xs text-destructive">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="mt-5 block">
              <span className="eyebrow text-muted-foreground">
                Email
              </span>

              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setSent(false);
                }}
                className={`mt-2 w-full rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${
                  errors.email
                    ? "border-destructive"
                    : "border-border"
                }`}
              />

              {errors.email && (
                <span className="mt-1.5 block text-xs text-destructive">
                  {errors.email}
                </span>
              )}
            </label>

            <label className="mt-5 block">
              <span className="eyebrow text-muted-foreground">
                Message
              </span>

              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => {
                  setForm({
                    ...form,
                    message: e.target.value,
                  });
                  setSent(false);
                }}
                className={`mt-2 w-full resize-none rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${
                  errors.message
                    ? "border-destructive"
                    : "border-border"
                }`}
              />

              {errors.message && (
                <span className="mt-1.5 block text-xs text-destructive">
                  {errors.message}
                </span>
              )}
            </label>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
            >
              Prepare email
            </button>

            {sent && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-accent">
                <Check className="h-4 w-4" />
                Your email app should open with your
                message. Please send the email to complete
                your inquiry.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
