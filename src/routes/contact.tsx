import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Oak & Pine, Almora, Uttarakhand" },
      {
        name: "description",
        content: "Reach the Oak & Pine studio in Almora, Uttarakhand for orders, wholesale and farm visits.",
      },
      { property: "og:title", content: "Contact — Oak & Pine" },
      { property: "og:description", content: "Talk to our team in Almora, Uttarakhand, India." },
    ],
  }),
  component: Contact,
});

type Errors = { name?: string; email?: string; message?: string };

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) next.email = "Enter a valid email";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters)";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow text-accent">Almora · Uttarakhand · India</p>
        <h1 className="mt-4 max-w-xl text-5xl sm:text-6xl">
          Come find us in the <span className="italic">hills</span>
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-8">
            {[
              { Icon: MapPin, title: "Studio", lines: ["Ranikhet Road, Almora", "Uttarakhand 263601, India"] },
              { Icon: Mail, title: "Email", lines: ["hello@oakandpine.in", "wholesale@oakandpine.in"] },
              { Icon: Phone, title: "Phone", lines: ["+91 98765 43210", "Mon–Sat, 10am–6pm IST"] },
            ].map(({ Icon, title, lines }) => (
              <div key={title} className="flex gap-5">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-accent" strokeWidth={1.3} />
                <div className="min-w-0">
                  <h2 className="eyebrow text-muted-foreground">{title}</h2>
                  {lines.map((l) => (
                    <p key={l} className="mt-1 text-sm">{l}</p>
                  ))}
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-border bg-secondary/50 p-8">
              <p className="font-display text-2xl">Farm visits</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Our grow rooms open to visitors on the first Saturday of every month. Write to us
                a week ahead and we'll keep the kettle on.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={submit} noValidate className="rounded-lg border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl">Send a note</h2>

            <label className="mt-6 block">
              <span className="eyebrow text-muted-foreground">Name</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`mt-2 w-full rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${errors.name ? "border-destructive" : "border-border"}`}
              />
              {errors.name && <span className="mt-1.5 block text-xs text-destructive">{errors.name}</span>}
            </label>

            <label className="mt-5 block">
              <span className="eyebrow text-muted-foreground">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`mt-2 w-full rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${errors.email ? "border-destructive" : "border-border"}`}
              />
              {errors.email && <span className="mt-1.5 block text-xs text-destructive">{errors.email}</span>}
            </label>

            <label className="mt-5 block">
              <span className="eyebrow text-muted-foreground">Message</span>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`mt-2 w-full resize-none rounded-md border bg-background px-4 py-3.5 text-sm outline-none focus:border-primary ${errors.message ? "border-destructive" : "border-border"}`}
              />
              {errors.message && <span className="mt-1.5 block text-xs text-destructive">{errors.message}</span>}
            </label>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent"
            >
              Send message
            </button>

            {sent && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-accent">
                <Check className="h-4 w-4" /> Thank you — we'll reply within two days.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </div>
  );
}
