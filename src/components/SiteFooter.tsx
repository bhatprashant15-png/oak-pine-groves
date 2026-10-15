import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Leaf } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-forest mt-24 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="min-w-0">
          <span className="font-display text-2xl tracking-[0.18em] uppercase">
            Oak <span className="text-gold">&</span> Pine
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Organic medicinal and gourmet mushrooms, grown and hand-finished in the
            Himalayan foothills of Uttarakhand, India.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/20 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" strokeWidth={1.4} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow text-gold">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
            <li><Link to="/products" className="hover:text-gold">All mushrooms</Link></li>
            <li><Link to="/cart" className="hover:text-gold">Your cart</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-gold">Studio</h3>
          <address className="mt-5 space-y-2 text-sm not-italic text-primary-foreground/75">
            <p>Village Bissi, Bhirgukhal, Yamkeshwar</p>
<p>Pauri Garhwal, Uttarakhand, India</p>
<p>
  <a href="mailto:workflowprashant08@gmail.com">
    workflowprashant08@gmail.com
  </a>
</p>
<p>
  <a href="tel:+919027407902">
    +91 9027407902
  </a>
</p>
<p>By appointment · Online inquiries only</p>
          </address>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-primary-foreground/60 sm:px-8">
          <span className="flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" strokeWidth={1.4} /> Certified organic · Lab tested
          </span>
          <span>© {new Date().getFullYear()} Oak &amp; Pine</span>
        </div>
      </div>
    </footer>
  );
}
