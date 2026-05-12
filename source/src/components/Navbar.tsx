import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Search, ShoppingBag, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP } from "@/lib/products";
import logoImg from "@/assets/ais-logo-full.png";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Testimoni", href: "/testimoni" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-background/80 backdrop-blur-sm"
      } border-b border-border/40 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 lg:px-16`}
      data-testid="navbar"
    >
      <Link href="/" className="flex items-center shrink-0" data-testid="nav-logo">
        <img
          src={logoImg}
          alt="AIS Beauty Store"
          className="h-12 md:h-16 w-auto object-contain"
          style={{ maxWidth: 180, mixBlendMode: "multiply" }}
        />
      </Link>

      <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-foreground/70">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:text-primary transition-colors duration-200 relative group ${
              location === link.href ? "text-primary" : ""
            }`}
            data-testid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                location === link.href ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button variant="ghost" size="icon" className="hidden md:flex text-foreground/70 hover:text-primary" data-testid="nav-search">
          <Search className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-foreground/70 hover:text-primary" data-testid="nav-cart">
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </Button>
        <Button
          asChild
          className="hidden md:flex bg-green-600 hover:bg-green-700 text-white rounded-full px-5 h-9 text-sm"
          data-testid="nav-whatsapp"
        >
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            WhatsApp
          </a>
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="nav-mobile-menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <div className="flex items-center justify-between mb-8 mt-2">
              <img src={logoImg} alt="AIS Beauty Store" className="h-12 w-auto object-contain" style={{ mixBlendMode: "multiply" }} />
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-base font-medium px-3 py-3 rounded-lg transition-colors ${
                    location === link.href
                      ? "text-primary bg-primary/8"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                  data-testid={`nav-mobile-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 pt-6 border-t border-border/50">
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full"
                  data-testid="nav-mobile-whatsapp"
                >
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi WhatsApp
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
