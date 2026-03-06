import { Logo } from "@/components/Logo";

export function AppFooter() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Data sources", href: "#data-sources" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Contact", href: "mailto:pranjalsudan0987@gmail.com" }
  ];

  return (
    <footer className="border-t-2 border-black bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white shadow-sm">
            <Logo className="h-6 w-6" />
          </span>
          <div>
            <p className="text-sm font-black text-black">
              PULSERADAR AI
            </p>
            <p className="text-[11px] font-bold text-slate-400 mt-0.5">
              Made for India&apos;s next wave of wellness founders.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

