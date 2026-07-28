import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Loader2, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/lib/cart";
import { getProduct, formatINR } from "@/lib/products";
import { loadRazorpayScript } from "@/lib/razorpay";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Secure Checkout — Oak & Pine" },
      { name: "description", content: "Pay securely with UPI, cards, net banking or wallets in INR." },
      { property: "og:title", content: "Secure Checkout — Oak & Pine" },
      { property: "og:description", content: "Razorpay-secured checkout for your Oak & Pine order." },
    ],
  }),
  component: Checkout,
});

type Fields = { name: string; email: string; phone: string; address: string; city: string; pincode: string };
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", email: "", phone: "", address: "", city: "", pincode: "" };

/** Basic client-side validation for the checkout form. */
function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address";
  if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = "Enter a valid 10-digit Indian mobile number";
  if (f.address.trim().length < 8) e.address = "Enter your full delivery address";
  if (f.city.trim().length < 2) e.city = "Enter your city";
  if (!/^\d{6}$/.test(f.pincode.trim())) e.pincode = "PIN code must be 6 digits";
  return e;
}

function Checkout() {
  const navigate = useNavigate();
  const { lines, subtotal, shipping, total, clear } = useCart();
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const set = (key: keyof Fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const finish = (paymentId: string) => {
    clear();
    navigate({ to: "/order-confirmed", search: { payment: paymentId } });
  };

  const handlePay = async (event: FormEvent) => {
    event.preventDefault();
    setFailure(null);

    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (lines.length === 0) return;

    setLoading(true);
    try {
      // 1. Ask our server to create the Razorpay order (amount computed server-side)
      const res = await fetch("/api/public/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Order creation failed");

      // 2. Demo mode — Razorpay keys not configured yet
      if (data.demo) {
        await new Promise((r) => setTimeout(r, 1400));
        finish("demo_payment");
        return;
      }

      // 3. Open the Razorpay Checkout popup
      const ready = await loadRazorpayScript();
      if (!ready || !window.Razorpay) throw new Error("Could not load the payment window");

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Oak & Pine",
        description: "Organic mushroom order",
        order_id: data.orderId,
        prefill: { name: fields.name, email: fields.email, contact: fields.phone },
        notes: { address: `${fields.address}, ${fields.city} ${fields.pincode}` },
        theme: { color: "#2f4636" },
        handler: (response) => finish(response.razorpay_payment_id),
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setFailure(err instanceof Error ? err.message : "Payment could not be started");
      setLoading(false);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-32 text-center sm:px-8">
        <h1 className="text-4xl">Nothing to check out</h1>
        <Link
          to="/products"
          className="mt-8 inline-flex rounded-full bg-primary px-9 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground"
        >
          Shop now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
      <Reveal>
        <p className="eyebrow text-accent">Step 2 of 2</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">Checkout</h1>
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handlePay} noValidate className="space-y-5">
          <Field label="Full name" value={fields.name} onChange={set("name")} error={errors.name} autoComplete="name" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" type="email" value={fields.email} onChange={set("email")} error={errors.email} autoComplete="email" />
            <Field label="Mobile number" type="tel" value={fields.phone} onChange={set("phone")} error={errors.phone} autoComplete="tel" />
          </div>
          <Field label="Delivery address" value={fields.address} onChange={set("address")} error={errors.address} autoComplete="street-address" />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="City" value={fields.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
            <Field label="PIN code" value={fields.pincode} onChange={set("pincode")} error={errors.pincode} autoComplete="postal-code" />
          </div>

          {failure && (
            <p className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              {failure}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-xs tracking-[0.2em] uppercase text-primary-foreground transition-colors duration-500 hover:bg-accent disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processing payment
              </>
            ) : (
              <>
                <Lock className="h-3.5 w-3.5" /> Pay Now · {formatINR(total)}
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground">
            UPI · Debit &amp; Credit Cards · Net Banking · Wallets — secured by Razorpay
          </p>
        </form>

        <aside className="h-fit rounded-lg border border-border bg-secondary/50 p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl">Your order</h2>
          <ul className="mt-6 space-y-4 text-sm">
            {lines.map((l) => {
              const p = getProduct(l.id);
              if (!p) return null;
              return (
                <li key={l.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                  <span className="min-w-0 truncate text-muted-foreground">
                    {p.name} × {l.qty}
                  </span>
                  <span className="tabular-nums">{formatINR(p.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-6 text-sm">
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
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-md border bg-card px-4 py-3.5 text-sm outline-none transition-colors focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
