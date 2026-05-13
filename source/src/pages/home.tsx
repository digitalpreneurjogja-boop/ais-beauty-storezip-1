import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ShieldCheck, Zap, Award, Star, ArrowRight, MessageCircle, Gem, Wallet,
  Truck, CreditCard, HeartHandshake, Users, Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, WHATSAPP } from "@/lib/products";
import heroWomanImg from "@assets/hero-woman.png";

const testimonials = [
  { name: "Siti Nurhaliza",  initials: "SN", text: "Sangat cocok dengan Bio-Lingzhi. Sirkulasi darah lebih lancar dan badan tidak gampang capek. Sudah 3 bulan konsumsi rutin!", product: "Bio-Lingzhi Pro" },
  { name: "Putri Maharani",  initials: "PM", text: "Novia membantu menyeimbangkan hormon saya. Kulit jadi jarang jerawatan dan mood lebih stabil. Highly recommended!", product: "Novia" },
  { name: "Dewi Lestari",   initials: "DL", text: "S-GLOW rasanya enak banget dan efeknya luar biasa. Kulit saya glowing parah padahal tanpa makeup tebal. Love it!", product: "S-GLOW" },
];

const blogPreviews = [
  { title: "Cara Merawat Kulit Dari Dalam",        cat: "Skincare",   slug: "perawatan-kulit-dari-dalam", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&auto=format&fit=crop" },
  { title: "Rahasia Kulit Glowing Wanita Modern",  cat: "Lifestyle",  slug: "tips-glowing-modern",        img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop" },
  { title: "Pentingnya Kolagen Untuk Anti Aging",  cat: "Wellness",   slug: "kolagen-anti-aging",         img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop" },
];

const infoItems = [
  { icon: Truck,            label: "Pengiriman Cepat",    sub: "Ke seluruh Indonesia"    },
  { icon: CreditCard,       label: "Pembayaran Aman",     sub: "COD, Transfer, e-Wallet" },
  { icon: HeartHandshake,   label: "Konsultasi Gratis",   sub: "Chat dengan tim kami"    },
  { icon: Users,            label: "Trusted by Thousands",sub: "Pelanggan puas"          },
];

const benefitIcons = [
  { icon: ShieldCheck, label: "100% Original"            },
  { icon: Award,       label: "Aman & Berkualitas"       },
  { icon: Zap,         label: "Teruji Klinis"            },
  { icon: Star,        label: "Terpercaya Ribuan Customer" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden pt-16 md:pt-20">
      <Navbar />

      {/* ═══════════════════════════════════════════════════
          HERO — Full background image with responsive overlay
          ═══════════════════════════════════════════════════ */}
      <section
        id="beranda"
        className="relative w-full overflow-hidden"
        style={{ minHeight: "clamp(560px, 82vh, 780px)" }}
      >
        {/* ── Background image (full section) ── */}
        <img
          src={heroWomanImg}
          alt="AIS Beauty – produk kecantikan dan kesehatan premium"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ objectPosition: "center center" }}
          draggable={false}
        />

        {/* ── Desktop overlay: gradient left→transparent so right image shows clearly ── */}
        <div
          className="absolute inset-0 hidden md:block pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #fdf6f3 0%, rgba(253,246,243,0.96) 20%, rgba(253,246,243,0.82) 38%, rgba(253,246,243,0.35) 58%, transparent 75%)",
          }}
        />

        {/* ── Mobile overlay: semi-dark over entire image for text readability ── */}
        <div
          className="absolute inset-0 md:hidden pointer-events-none"
          style={{ background: "rgba(15,10,8,0.52)" }}
        />

        {/* ── "Glowing Confident Healthy" badge (desktop only, right side) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
          className="hidden md:flex absolute top-10 right-8 w-[90px] h-[90px] rounded-full flex-col items-center justify-center text-center z-20"
          style={{
            background: "rgba(255,255,255,0.14)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.45)",
            boxShadow: "0 0 28px rgba(255,255,255,0.18)",
          }}
        >
          <span className="text-[8px] font-bold uppercase leading-tight tracking-widest text-white drop-shadow">
            Glowing<br />Confident<br />Healthy
          </span>
          <span className="text-white text-xs mt-0.5">✦</span>
        </motion.div>

        {/* ── Left content ── */}
        <div
          className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-5 md:px-8 lg:px-16"
          style={{
            minHeight: "clamp(560px, 82vh, 780px)",
            paddingBottom: "clamp(160px, 24vw, 220px)",
          }}
        >
          {/* Mobile: glass card behind text | Desktop: plain (gradient overlay handles bg) */}
          <div className="max-w-[440px]">

            {/* Mobile-only glass backdrop */}
            <div
              className="md:hidden absolute inset-0 pointer-events-none rounded-3xl"
              style={{
                background: "rgba(10,6,4,0.42)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            />

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                background: "rgba(217,108,138,0.15)",
                border: "1px solid rgba(217,108,138,0.40)",
                color: "#d96c8a",
              }}
            >
              ✦ #1 Beauty &amp; Wellness
            </motion.div>

            {/* Headline — dark on desktop (light gradient bg), white on mobile (dark overlay) */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="relative font-serif font-bold leading-[1.05] mb-4 text-white md:text-[#1a1a1a]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.6rem)" }}
            >
              Ais Beauty Store
            </motion.h1>

            {/* Leaf divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative flex items-center gap-2 mb-4 origin-left"
            >
              <div className="h-px w-12" style={{ background: "#1e5b45" }} />
              <Leaf className="w-3.5 h-3.5" style={{ color: "#1e5b45" }} />
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "#1e5b45" }} />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="relative text-base md:text-lg leading-relaxed mb-6 text-white/90 md:text-[#3a2a2a]"
            >
              Produk suplemen{" "}
              <span className="font-semibold" style={{ color: "#f4c542" }}>
                kecantikan dan kesehatan
              </span>{" "}
              premium.
            </motion.p>

            {/* Benefit icons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="relative grid grid-cols-2 gap-x-5 gap-y-3 mb-7"
            >
              {benefitIcons.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <b.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#d96c8a" }} />
                  <span className="text-xs font-medium text-white/90 md:text-[#4a3030]">{b.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="relative flex flex-wrap gap-3"
            >
              <Button
                asChild
                className="rounded-full h-11 px-7 text-sm font-semibold text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #d96c8a 0%, #c45073 100%)" }}
                data-testid="hero-cta-shop"
              >
                <Link href="/produk">Belanja Sekarang</Link>
              </Button>
              {/* Desktop: pink outline | Mobile: white outline */}
              <Button
                asChild
                variant="outline"
                className="rounded-full h-11 px-7 text-sm font-semibold transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 border-white/60 text-white bg-white/10 md:border-[#d96c8a] md:text-[#d96c8a] md:bg-white/80"
                data-testid="hero-cta-consult"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Konsultasi Gratis</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ── Products floating row at hero bottom ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end gap-3 md:gap-4 pb-0 overflow-x-auto hide-scrollbar">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.45 + i * 0.07 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex-shrink-0"
                >
                  <Link
                    href={`/produk/${p.slug}`}
                    className="flex flex-col items-center gap-2 cursor-pointer select-none group"
                    data-testid={`hero-product-${p.slug}`}
                  >
                    <div
                      className="rounded-2xl flex flex-col items-center gap-2 p-3"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        backdropFilter: "blur(12px)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
                        border: "1px solid rgba(255,255,255,0.75)",
                        width: "clamp(90px, 13vw, 130px)",
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="object-contain"
                        style={{ height: "clamp(72px, 10vw, 112px)", width: "100%" }}
                        draggable={false}
                      />
                      <div className="w-full text-center">
                        <p className="text-[10px] md:text-xs font-semibold leading-tight" style={{ color: "#2d1b1b" }}>
                          {p.name}
                        </p>
                        <div className="flex items-center justify-center gap-0.5 mt-1">
                          <span className="text-[10px] font-bold" style={{ color: "#1a1a1a" }}>5.0</span>
                          <div className="flex">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════
          INFO BAR — floating white card
          ═══════════════════════════════ */}
      <section className="relative z-30 px-4 md:px-8 lg:px-16 py-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="grid grid-cols-2 md:grid-cols-4"
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 4px 28px rgba(0,0,0,0.09)",
              border: "1px solid rgba(217,108,138,0.10)",
              overflow: "hidden",
            }}
          >
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-4"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(217,108,138,0.12)" : "none",
                  borderBottom: i < 2 ? "1px solid rgba(217,108,138,0.12)" : "none",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(217,108,138,0.10)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#d96c8a" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: "#1a1a1a" }}>{item.label}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#888" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════
          FEATURED PRODUCTS GRID
          ═══════════════════════════ */}
      <section id="produk" className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}
          >
            Koleksi Premium
          </span>
          <h2 className="text-3xl md:text-4xl font-serif mb-3" style={{ color: "#1a1a1a" }}>Produk Premium Kami</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Diformulasikan dengan bahan terbaik untuk memberikan hasil nyata bagi kecantikan dan kesehatan Anda.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 h-11 font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-white"
            style={{ borderColor: "#d96c8a", color: "#d96c8a" }}
            data-testid="button-view-all-products"
          >
            <Link href="/produk">Lihat Semua Produk <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* ═══════════════════
          WHY AIS BEAUTY
          ═══════════════════ */}
      <section id="tentang-kami" className="py-16 px-4 md:px-8 lg:px-16" style={{ background: "#fdf0ef" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}
            >
              Keunggulan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#1a1a1a" }}>Mengapa AIS Beauty?</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck,   title: "Produk Original",   desc: "Jaminan 100% asli dari sumber terpercaya" },
              { icon: MessageCircle, title: "Konsultasi Gratis", desc: "Bantuan pakar kecantikan siap membantu" },
              { icon: Zap,           title: "Pengiriman Cepat",  desc: "Ke seluruh Indonesia dengan aman" },
              { icon: Award,         title: "Aman & Terpercaya", desc: "Sertifikasi dan izin resmi" },
              { icon: Wallet,        title: "COD Available",     desc: "Bayar di tempat, mudah dan aman" },
              { icon: Gem,           title: "Premium Quality",   desc: "Bahan pilihan berkualitas terbaik" },
            ].map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(217,108,138,0.12)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(217,108,138,0.10)" }}>
                  <b.icon className="w-5 h-5" style={{ color: "#d96c8a" }} />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base mb-1" style={{ color: "#1a1a1a" }}>{b.title}</h4>
                  <p className="text-xs text-muted-foreground">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════
          TESTIMONIALS
          ══════════════ */}
      <section id="testimoni" className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}>
                Testimoni Pelanggan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#1a1a1a" }}>Kata Mereka</h2>
              <p className="text-muted-foreground text-sm mt-2">Ribuan wanita Indonesia telah membuktikan khasiatnya.</p>
            </div>
            <Button asChild variant="ghost" className="w-fit hover:text-primary" data-testid="button-all-testimonials">
              <Link href="/testimoni">Lihat Semua <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="border-none h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(217,108,138,0.09)", border: "1px solid rgba(217,108,138,0.10)" }}
                >
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-sm text-foreground/80 italic leading-relaxed flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t" style={{ borderColor: "rgba(217,108,138,0.15)" }}>
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="text-xs font-semibold text-white" style={{ background: "#d96c8a" }}>{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-semibold text-sm" style={{ color: "#1a1a1a" }}>{t.name}</h5>
                        <span className="text-xs text-muted-foreground">{t.product}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════
          BLOG PREVIEW
          ═════════════ */}
      <section id="blog" className="py-16 px-4 md:px-8 lg:px-16" style={{ background: "#fdf0ef" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-3" style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}>
                Jurnal Kecantikan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#1a1a1a" }}>Jurnal Kecantikan</h2>
              <p className="text-muted-foreground text-sm mt-2">Tips &amp; insight seputar wellness dan kecantikan.</p>
            </div>
            <Button asChild variant="ghost" className="w-fit hover:text-primary" data-testid="button-all-blog">
              <Link href="/blog">Lihat Semua <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((blog, i) => (
              <Link key={i} href={`/blog/${blog.slug}`} className="group cursor-pointer block" data-testid={`blog-preview-${i}`}>
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <img src={blog.img} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <span className="text-xs font-semibold tracking-wider uppercase mb-2 block" style={{ color: "#d96c8a" }}>{blog.cat}</span>
                <h3 className="text-lg font-serif font-medium mb-2 group-hover:text-primary transition-colors leading-snug" style={{ color: "#1a1a1a" }}>{blog.title}</h3>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════
          FAQ
          ══════════ */}
      <section className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4" style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}>
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#1a1a1a" }}>Pertanyaan Umum</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {[
            { q: "Apakah produk original?",         a: "Ya, semua produk AIS Beauty 100% original dan memiliki sertifikasi keamanan yang terpercaya." },
            { q: "Apakah bisa COD?",                a: "Ya, tersedia metode pembayaran Cash on Delivery (COD) untuk area tertentu di seluruh Indonesia." },
            { q: "Berapa lama waktu pengiriman?",   a: "Pesanan diproses cepat dalam 1x24 jam dan dikirim ke seluruh Indonesia dengan estimasi 2-5 hari kerja." },
            { q: "Bagaimana cara konsultasi produk?", a: "Bisa langsung melalui WhatsApp AIS Beauty yang tertera pada website." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b" style={{ borderColor: "rgba(217,108,138,0.20)" }}>
              <AccordionTrigger className="text-left font-medium text-sm hover:no-underline hover:text-primary py-4">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="rounded-full px-6 h-10 font-medium bg-white" style={{ borderColor: "#d96c8a", color: "#d96c8a" }} data-testid="button-all-faq">
            <Link href="/faq">Lihat Semua FAQ</Link>
          </Button>
        </div>
      </section>

      {/* ══════════
          CTA BANNER
          ══════════ */}
      <section
        id="kontak"
        className="py-20 px-4 md:px-8 lg:px-16"
        style={{ background: "linear-gradient(135deg, #f8eaea 0%, #fdf6f3 60%, #f8eaea 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5" style={{ background: "rgba(217,108,138,0.12)", color: "#d96c8a" }}>
              Konsultasi Gratis
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: "#1a1a1a" }}>
              Mulai Perjalanan Beauty-mu Hari Ini
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Konsultasikan kebutuhan kecantikan dan kesehatanmu bersama tim AIS Beauty. Gratis, tanpa komitmen.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-12 text-white font-semibold border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #25d366 0%, #20b858 100%)" }}
              data-testid="cta-whatsapp"
            >
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Hubungi Kami via WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
