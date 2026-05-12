import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { Menu, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP } from "@/lib/products";
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll";
import logoImg from "@/assets/ais-logo-full.png";

/* ─── Nav links ──────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Beranda",      href: "/",             sectionId: "beranda"      },
  { label: "Produk",       href: "/produk",        sectionId: "produk"       },
  { label: "Tentang Kami", href: "/tentang-kami",  sectionId: "tentang-kami" },
  { label: "Testimoni",    href: "/testimoni",     sectionId: "testimoni"    },
  { label: "Blog",         href: "/blog",          sectionId: "blog"         },
  { label: "Kontak",       href: "/kontak",        sectionId: "kontak"       },
];

const SECTION_IDS = navLinks.map((l) => l.sectionId);

/**
 * Sections whose backgrounds are noticeably coloured / darker than pure white.
 * Navbar boosts opacity when over these to maintain contrast.
 */
const ACCENT_SECTIONS = new Set(["tentang-kami", "blog", "kontak"]);

/* ─── Smoothstep easing (0→1) ───────────────────────────────────────────── */
function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [location, navigate] = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const rafRef = useRef<number | null>(null);

  const isHome = location === "/";
  const isAccent = ACCENT_SECTIONS.has(activeSection);

  /* ── Scroll tracking with rAF throttle ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // sync initial position (e.g. back-navigation)
    setScrollY(window.scrollY);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Scroll-spy via IntersectionObserver (homepage only) ───────────── */
  useEffect(() => {
    if (!isHome) return;
    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-80px 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  /* ── Glassmorphism computed values ─────────────────────────────────── */
  // Normalise scroll: 0→1 over first 220 px
  const t = smoothstep(Math.min(scrollY / 220, 1));

  // Base opacity: 0.52 → 0.94 (accent sections add +0.06)
  const baseAlpha = 0.52 + t * 0.42 + (isAccent ? 0.06 : 0);
  const bgAlpha = Math.min(baseAlpha, 0.97);

  // Backdrop blur: 6px → 22px
  const blurPx = 6 + t * 16;

  // Colour saturation boost: 130% → 190%
  const saturate = 130 + t * 60;

  // Border: almost invisible → subtle warm gold
  const borderAlpha = 0.03 + t * 0.14;

  // Shadow: none → layered soft shadow
  const shadowOpacity = t * 0.09;
  const shadowOpacity2 = t * 0.05;

  // Navbar height: 80px → 66px desktop / 64px → 56px mobile
  const navH = Math.round(80 - t * 14);   // desktop
  const navHMob = Math.round(64 - t * 8); // mobile (overridden via CSS)

  /* ── Inline style object ────────────────────────────────────────────── */
  const navStyle: React.CSSProperties = {
    height: navH,
    backdropFilter: `blur(${blurPx}px) saturate(${saturate}%)`,
    WebkitBackdropFilter: `blur(${blurPx}px) saturate(${saturate}%)`,
    backgroundColor: `rgba(255, 251, 248, ${bgAlpha})`,
    borderBottom: `1px solid rgba(168, 120, 72, ${borderAlpha})`,
    boxShadow: t > 0.05
      ? `0 2px 16px rgba(0,0,0,${shadowOpacity}), 0 8px 32px rgba(0,0,0,${shadowOpacity2})`
      : "none",
    transition:
      "height 0.4s cubic-bezier(0.4,0,0.2,1), " +
      "background-color 0.35s cubic-bezier(0.4,0,0.2,1), " +
      "backdrop-filter 0.35s cubic-bezier(0.4,0,0.2,1), " +
      "box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), " +
      "border-color 0.35s cubic-bezier(0.4,0,0.2,1)",
  };

  // Mobile nav height (applied via className with Tailwind)
  const mobileHClass = scrollY > 20 ? "h-14" : "h-16";

  /* ── Logo scale: 1 → 0.88 on scroll ────────────────────────────────── */
  const logoScale = 1 - t * 0.12;
  const logoStyle: React.CSSProperties = {
    transform: `scale(${logoScale})`,
    transformOrigin: "left center",
    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
  };

  /* ── Nav click handler ──────────────────────────────────────────────── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
      e.preventDefault();
      if (isHome) {
        link.sectionId === "beranda" ? scrollToTop() : scrollToSection(link.sectionId);
        setOpen(false);
        return;
      }
      if (link.href === "/") {
        navigate("/");
        setTimeout(() => scrollToTop(), 80);
      } else {
        navigate(link.href);
      }
      setOpen(false);
    },
    [isHome, navigate]
  );

  const isActive = (link: (typeof navLinks)[0]) => {
    if (isHome) return activeSection === link.sectionId;
    return location === link.href || location.startsWith(link.href + "/");
  };

  /* ── Render ─────────────────────────────────────────────────────────── */
  return (
    <nav
      style={navStyle}
      className={`
        sticky top-0 z-50 w-full
        flex items-center justify-between
        px-4 md:px-8 lg:px-16
        ${mobileHClass} md:h-auto
      `}
      data-testid="navbar"
    >
      {/* ── LOGO ─────────────────────────────────────────────────────── */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          isHome ? scrollToTop() : navigate("/");
        }}
        className="flex items-center shrink-0 cursor-pointer"
        data-testid="nav-logo"
        style={logoStyle}
      >
        <img
          src={logoImg}
          alt="AIS Beauty Store"
          className="h-12 md:h-16 w-auto object-contain"
          style={{ maxWidth: 180, mixBlendMode: "multiply" }}
        />
      </a>

      {/* ── DESKTOP NAV LINKS ────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium">
        {navLinks.map((link) => {
          const active = isActive(link);
          return (
            <a
              key={link.sectionId}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`
                relative group pb-0.5 cursor-pointer select-none
                transition-colors duration-200
                ${active ? "text-primary font-semibold" : "text-foreground/65 hover:text-primary"}
              `}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}

              {/* Active underline */}
              <span
                className={`
                  absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary
                  transition-all duration-300 ease-out
                  ${active
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                  }
                `}
              />
            </a>
          );
        })}
      </div>

      {/* ── RIGHT ACTIONS ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex text-foreground/60 hover:text-primary transition-colors duration-200"
          data-testid="nav-search"
        >
          <Search className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground/60 hover:text-primary transition-colors duration-200"
          data-testid="nav-cart"
          onClick={() => {
            if (isHome) scrollToSection("produk");
            else navigate("/checkout");
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"
            style={{
              boxShadow: "0 0 0 2px rgba(255,251,248,0.9)",
            }}
          />
        </Button>

        {/* WhatsApp CTA — desktop */}
        <Button
          asChild
          className="
            hidden md:flex items-center
            bg-green-600 hover:bg-green-700 text-white
            rounded-full px-5 h-9 text-sm font-medium
            shadow-sm hover:shadow-md
            transition-all duration-200
          "
          data-testid="nav-whatsapp"
          style={{
            transform: `scale(${0.94 + (1 - t) * 0.06})`,
            transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease",
          }}
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            WhatsApp
          </a>
        </Button>

        {/* ── Mobile hamburger ─────────────────────────────────────── */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground/70 hover:text-primary transition-colors"
              data-testid="nav-mobile-menu"
            >
              {/* Animated hamburger → X */}
              <span className="relative flex flex-col gap-[5px] w-5 h-4 justify-center">
                <span
                  className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    open ? "rotate-45 translate-y-[6.5px]" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 ${
                    open ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-[1.5px] bg-current rounded-full transition-all duration-300 origin-center ${
                    open ? "-rotate-45 -translate-y-[6.5px]" : ""
                  }`}
                />
              </span>
            </Button>
          </SheetTrigger>

          {/* ── Mobile drawer ──────────────────────────────────────── */}
          <SheetContent side="right" className="w-72 p-0 border-l border-border/30" style={{ backgroundColor: "rgba(255,251,248,0.98)", backdropFilter: "blur(20px)" }}>
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center px-6 py-5 border-b border-border/30">
                <img
                  src={logoImg}
                  alt="AIS Beauty Store"
                  className="h-12 w-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
                {navLinks.map((link) => {
                  const active = isActive(link);
                  return (
                    <a
                      key={link.sectionId}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`
                        flex items-center gap-3 text-base font-medium
                        px-4 py-3.5 rounded-xl
                        cursor-pointer select-none
                        transition-all duration-200
                        ${active
                          ? "text-primary bg-primary/8 font-semibold"
                          : "text-foreground/75 hover:text-primary hover:bg-primary/5"
                        }
                      `}
                      data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                          active ? "bg-primary scale-100" : "bg-transparent scale-0"
                        }`}
                      />
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-border/30 space-y-3">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full h-11 shadow-sm"
                  data-testid="nav-mobile-whatsapp"
                >
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi via WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
