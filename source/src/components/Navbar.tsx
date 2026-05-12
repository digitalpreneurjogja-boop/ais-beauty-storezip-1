import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP } from "@/lib/products";
import { scrollToSection, scrollToTop } from "@/lib/smooth-scroll";
import logoImg from "@/assets/ais-logo-full.png";

const navLinks = [
  { label: "Beranda",     href: "/",             sectionId: "beranda"      },
  { label: "Produk",      href: "/produk",        sectionId: "produk"       },
  { label: "Tentang Kami",href: "/tentang-kami",  sectionId: "tentang-kami" },
  { label: "Testimoni",   href: "/testimoni",     sectionId: "testimoni"    },
  { label: "Blog",        href: "/blog",          sectionId: "blog"         },
  { label: "Kontak",      href: "/kontak",        sectionId: "kontak"       },
];

const SECTION_IDS = navLinks.map((l) => l.sectionId);

export default function Navbar() {
  const [location, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  const isHome = location === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // IntersectionObserver scroll-spy — only active on homepage
  useEffect(() => {
    if (!isHome) return;

    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          rootMargin: "-80px 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
      e.preventDefault();

      if (isHome) {
        // Already on homepage — smooth scroll to section
        if (link.sectionId === "beranda") {
          scrollToTop();
        } else {
          scrollToSection(link.sectionId);
        }
        setOpen(false);
        return;
      }

      // On another page — if the section exists on homepage, navigate then scroll
      if (link.href === "/") {
        navigate("/");
        setTimeout(() => scrollToTop(), 80);
      } else {
        // Navigate to the dedicated page for deeper content
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/96 backdrop-blur-md shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      } border-b border-border/40 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-16`}
      data-testid="navbar"
    >
      {/* LOGO */}
      <a
        href="/"
        onClick={(e) => { e.preventDefault(); if (isHome) scrollToTop(); else navigate("/"); }}
        className="flex items-center shrink-0 cursor-pointer"
        data-testid="nav-logo"
      >
        <img
          src={logoImg}
          alt="AIS Beauty Store"
          className="h-12 md:h-16 w-auto object-contain"
          style={{ maxWidth: 180, mixBlendMode: "multiply" }}
        />
      </a>

      {/* DESKTOP NAV */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-foreground/70">
        {navLinks.map((link) => {
          const active = isActive(link);
          return (
            <a
              key={link.sectionId}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative group transition-colors duration-200 pb-0.5 cursor-pointer select-none ${
                active ? "text-primary" : "hover:text-primary"
              }`}
              data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {link.label}

              {/* Active / hover underline */}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out ${
                  active ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-60"
                }`}
              />
            </a>
          );
        })}
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-2 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex text-foreground/70 hover:text-primary transition-colors"
          data-testid="nav-search"
        >
          <Search className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground/70 hover:text-primary transition-colors"
          data-testid="nav-cart"
          onClick={() => {
            if (isHome) scrollToSection("produk");
            else navigate("/checkout");
          }}
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </Button>

        <Button
          asChild
          className="hidden md:flex bg-green-600 hover:bg-green-700 text-white rounded-full px-5 h-9 text-sm transition-all duration-200 shadow-sm hover:shadow-md"
          data-testid="nav-whatsapp"
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            WhatsApp
          </a>
        </Button>

        {/* MOBILE MENU */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="nav-mobile-menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-72 bg-background p-0">
            <div className="flex flex-col h-full">
              {/* Sheet header */}
              <div className="flex items-center px-6 py-5 border-b border-border/40">
                <img
                  src={logoImg}
                  alt="AIS Beauty Store"
                  className="h-12 w-auto object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>

              {/* Nav items */}
              <nav className="flex flex-col gap-0.5 px-3 py-4 flex-1">
                {navLinks.map((link) => {
                  const active = isActive(link);
                  return (
                    <a
                      key={link.sectionId}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                      className={`flex items-center gap-3 text-base font-medium px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                        active
                          ? "text-primary bg-primary/8 font-semibold"
                          : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                      }`}
                      data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {active && (
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {link.label}
                    </a>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="px-6 py-5 border-t border-border/40">
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
