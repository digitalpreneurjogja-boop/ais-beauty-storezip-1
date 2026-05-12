import { Link } from "wouter";
import { MessageCircle, Mail, Instagram, Facebook } from "lucide-react";
import { WHATSAPP } from "@/lib/products";
import logoImg from "@/assets/ais-logo-full.png";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
          <div className="sm:col-span-2 md:col-span-1">
            <img src={logoImg} alt="AIS Beauty Store" className="h-14 w-auto object-contain mb-3" style={{ filter: "brightness(0) invert(1)" }} />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Rangkaian produk premium untuk kulit glowing, tubuh sehat, dan percaya diri setiap hari.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/40 transition-colors"
                data-testid="footer-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/40 transition-colors"
                data-testid="footer-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600/60 transition-colors"
                data-testid="footer-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-5">Navigasi</h4>
            <div className="flex flex-col gap-2.5 text-sm text-white/60">
              {[
                { label: "Beranda", href: "/" },
                { label: "Produk", href: "/produk" },
                { label: "Tentang Kami", href: "/tentang-kami" },
                { label: "Testimoni", href: "/testimoni" },
                { label: "Blog", href: "/blog" },
                { label: "FAQ", href: "/faq" },
                { label: "Kontak", href: "/kontak" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors"
                  data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-5">Kontak</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                data-testid="footer-contact-wa"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                +6289518220436
              </a>
              <a
                href="mailto:aisbeauty.store@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
                data-testid="footer-contact-email"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                aisbeauty.store@gmail.com
              </a>
              <span className="text-xs text-white/40 mt-1">Senin - Minggu: 08.00 - 22.00 WIB</span>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-base font-semibold mb-5">Pembayaran</h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <p className="text-xs font-semibold text-white/80 uppercase tracking-wider">Menerima:</p>
              <div className="flex flex-wrap gap-2">
                {["COD", "BCA", "Mandiri", "DANA", "GOPAY"].map((m) => (
                  <span key={m} className="px-2 py-1 bg-white/10 rounded text-xs font-medium">{m}</span>
                ))}
              </div>
              <div className="space-y-1.5 bg-white/5 p-3 rounded-lg mt-1 text-xs">
                <p><strong className="text-white/80">BCA:</strong> 8610707565</p>
                <p><strong className="text-white/80">Mandiri:</strong> 1370024315588</p>
                <p className="text-white/40">A.n Nopa Setiyoko</p>
                <p><strong className="text-white/80">DANA/GOPAY:</strong> 085226145581</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>&copy; 2025 AIS Beauty Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:text-white/60 transition-colors">Syarat &amp; Ketentuan</span>
            <span className="cursor-pointer hover:text-white/60 transition-colors">Kebijakan Privasi</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
