import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ShieldCheck, Zap, Award, Star, ArrowRight, MessageCircle, Gem, Wallet,
  Truck, CreditCard, HeartHandshake, Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, WHATSAPP } from "@/lib/products";
import heroBannerImg from "@assets/hero-banner.png";

const testimonials = [
  { name: "Siti Nurhaliza", initials: "SN", text: "Sangat cocok dengan Bio-Lingzhi. Sirkulasi darah lebih lancar dan badan tidak gampang capek. Sudah 3 bulan konsumsi rutin!", product: "Bio-Lingzhi Pro" },
  { name: "Putri Maharani", initials: "PM", text: "Novia membantu menyeimbangkan hormon saya. Kulit jadi jarang jerawatan dan mood lebih stabil. Highly recommended!", product: "Novia" },
  { name: "Dewi Lestari", initials: "DL", text: "S-GLOW rasanya enak banget dan efeknya luar biasa. Kulit saya glowing parah padahal tanpa makeup tebal. Love it!", product: "S-GLOW Chewable" },
];

const blogPreviews = [
  { title: "Cara Merawat Kulit Dari Dalam", cat: "Skincare", slug: "perawatan-kulit-dari-dalam", img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80&auto=format&fit=crop" },
  { title: "Rahasia Kulit Glowing Wanita Modern", cat: "Lifestyle", slug: "tips-glowing-modern", img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop" },
  { title: "Pentingnya Kolagen Untuk Anti Aging", cat: "Wellness", slug: "kolagen-anti-aging", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80&auto=format&fit=crop" },
];

const infoItems = [
  { icon: Truck,          label: "Pengiriman Cepat",   sub: "Ke seluruh Indonesia"   },
  { icon: CreditCard,     label: "Pembayaran Aman",    sub: "COD, Transfer, e-Wallet" },
  { icon: HeartHandshake, label: "Konsultasi Gratis",  sub: "Chat dengan tim kami"    },
  { icon: Users,          label: "Trusted by Thousands", sub: "Pelanggan puas"        },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden pt-16 md:pt-20">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO — Cinematic premium beauty layout
          ═══════════════════════════════════════ */}
      <section
        id="beranda"
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(540px, 80vh, 760px)",
          background: "linear-gradient(120deg, #fdf6f3 0%, #fdf0ef 40%, #f9e2e6 70%, #f5d5dc 100%)",
        }}
      >
        {/* Decorative soft blobs */}
        <div
          className="absolute top-[-80px] left-[-80px] w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f9c0cc 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-60px] right-[40%] w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #d96c8a 0%, transparent 70%)" }}
        />

        {/* ── Hero image: right-side background ── */}
        <div className="absolute inset-y-0 right-0 w-full md:w-[58%] pointer-events-none select-none">
          {/* Left-edge gradient fade to blend with text area */}
          <div
            className="absolute inset-y-0 left-0 w-40 md:w-56 z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #fdf6f3 0%, rgba(253,246,243,0.85) 50%, transparent 100%)",
            }}
          />
          <img
            src={heroBannerImg}
            alt="AIS Beauty – Beauty Starts From Within"
            className="w-full h-full object-contain object-right-bottom"
            draggable={false}
          />
        </div>

        {/* "Glowing Confident Healthy" badge — top-right floating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="hidden lg:flex absolute top-10 right-6 z-20 flex-col items-center justify-center text-center w-24 h-24 rounded-full border-2 shadow-xl"
          style={{
            background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(10px)",
            borderColor: "#d96c8a",
          }}
        >
          <span className="text-[9px] font-bold uppercase leading-tight tracking-wide" style={{ color: "#d96c8a" }}>
            Glowing<br />Confident<br />Healthy
          </span>
        </motion.div>

        {/* ── Left content ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 lg:px-16 flex flex-col justify-center"
          style={{ minHeight: "clamp(540px, 80vh, 760px)", paddingBottom: "clamp(140px, 22vw, 200px)" }}>
          <div className="max-w-[520px]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5 border"
              style={{
                background: "rgba(217,108,138,0.12)",
                borderColor: "rgba(217,108,138,0.3)",
                color: "#d96c8a",
              }}
            >
              ✦&nbsp; #1 Beauty &amp; Wellness
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif leading-[1.08] mb-5"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)" }}
            >
              <span style={{ color: "#d96c8a" }}>Beauty</span><br />
              <span style={{ color: "#2d1b1b" }}>Starts From</span><br />
              <span style={{ color: "#2d1b1b" }}>Within</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base leading-relaxed mb-7 max-w-sm"
              style={{ color: "#5a3a3a" }}
            >
              Rangkaian produk premium untuk kulit glowing, tubuh sehat, dan percaya diri setiap hari.
            </motion.p>

            {/* Benefit icons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-x-6 gap-y-3 mb-8"
            >
              {[
                { icon: ShieldCheck, label: "100% Original" },
                { icon: Award,       label: "Aman & Berkualitas" },
                { icon: Zap,         label: "Teruji Klinis" },
                { icon: Star,        label: "Terpercaya Ribuan Customer" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#d96c8a" }} />
                  <span className="text-xs font-medium" style={{ color: "#5a3a3a" }}>{item.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button
                asChild
                size="lg"
                className="rounded-full h-12 px-8 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #d96c8a 0%, #c45073 100%)" }}
                data-testid="hero-cta-shop"
              >
                <Link href="/produk">Belanja Sekarang</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-sm font-semibold transition-all duration-300 hover:shadow-md"
                style={{ borderColor: "#d96c8a", color: "#d96c8a" }}
                data-testid="hero-cta-consult"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Konsultasi Gratis</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* ── Products floating row — bottom foreground ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-center md:justify-start gap-3 md:gap-4 pb-0 overflow-x-auto hide-scrollbar">
              {products.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  className="pointer-events-auto"
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                >
                  <Link
                    href={`/produk/${p.slug}`}
                    className="flex flex-col items-center gap-2 group cursor-pointer select-none"
                    data-testid={`hero-product-${p.slug}`}
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden shadow-2xl"
                      style={{
                        background: "rgba(255,255,255,0.70)",
                        backdropFilter: "blur(12px)",
                        padding: "10px 12px",
                        boxShadow: "0 8px 32px rgba(217,108,138,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* Glow behind product */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-40"
                        style={{ background: `radial-gradient(ellipse at 50% 80%, ${p.accentColor}55 0%, transparent 70%)` }}
                      />
                      <img
                        src={p.image}
                        alt={p.name}
                        className="relative z-10 object-contain"
                        style={{
                          height: "clamp(80px, 12vw, 128px)",
                          width: "auto",
                          maxWidth: "clamp(64px, 10vw, 110px)",
                        }}
                        draggable={false}
                      />
                    </div>
                    <span
                      className="text-[10px] md:text-xs font-semibold text-center leading-tight max-w-[80px] md:max-w-[100px] px-1 pb-2"
                      style={{ color: "#2d1b1b" }}
                    >
                      {p.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          INFO BAR — Floating card below hero
          ══════════════════════════════════ */}
      <section className="relative z-30 px-4 md:px-8 lg:px-16 -mt-0">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(16px)",
              borderRadius: "24px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              border: "1px solid rgba(217,108,138,0.12)",
            }}
          >
            {infoItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderColor: "rgba(217,108,138,0.15)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(217,108,138,0.12)" }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#d96c8a" }} />
                </div>
                <div>
                  <p className="text-xs font-semibold leading-tight" style={{ color: "#2d1b1b" }}>{item.label}</p>
                  <p className="text-[10px] leading-tight mt-0.5" style={{ color: "#8a6060" }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════
          FEATURED PRODUCTS GRID
          ══════════════════════ */}
      <section id="produk" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
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
          <h2 className="text-3xl md:text-4xl font-serif mb-3" style={{ color: "#2d1b1b" }}>Produk Premium Kami</h2>
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
            className="rounded-full px-8 h-11 font-medium transition-all duration-300 hover:shadow-md"
            style={{ borderColor: "#d96c8a", color: "#d96c8a" }}
            data-testid="button-view-all-products"
          >
            <Link href="/produk">Lihat Semua Produk <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* ══════════════════
          WHY AIS BEAUTY
          ══════════════════ */}
      <section id="tentang-kami" className="py-20 px-4 md:px-8 lg:px-16" style={{ background: "#fdf0ef" }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
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
            <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2d1b1b" }}>Mengapa AIS Beauty?</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck,    title: "Produk Original",    desc: "Jaminan 100% asli dari sumber terpercaya" },
              { icon: MessageCircle,  title: "Konsultasi Gratis",  desc: "Bantuan pakar kecantikan siap membantu" },
              { icon: Zap,            title: "Pengiriman Cepat",   desc: "Ke seluruh Indonesia dengan aman" },
              { icon: Award,          title: "Aman & Terpercaya",  desc: "Sertifikasi dan izin resmi" },
              { icon: Wallet,         title: "COD Available",      desc: "Bayar di tempat, mudah dan aman" },
              { icon: Gem,            title: "Premium Quality",    desc: "Bahan pilihan berkualitas terbaik" },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
                style={{
                  background: "rgba(255,255,255,0.80)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(217,108,138,0.12)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(217,108,138,0.12)" }}
                >
                  <benefit.icon className="w-5 h-5" style={{ color: "#d96c8a" }} />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base mb-1" style={{ color: "#2d1b1b" }}>{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════
          TESTIMONIALS
          ═══════════════════ */}
      <section id="testimoni" className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}
              >
                Testimoni Pelanggan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2d1b1b" }}>Kata Mereka</h2>
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="border-none h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    boxShadow: "0 4px 20px rgba(217,108,138,0.10)",
                    border: "1px solid rgba(217,108,138,0.10)",
                  }}
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
                        <h5 className="font-semibold text-sm" style={{ color: "#2d1b1b" }}>{t.name}</h5>
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

      {/* ═══════════════
          BLOG PREVIEW
          ═══════════════ */}
      <section id="blog" className="py-20 px-4 md:px-8 lg:px-16" style={{ background: "#fdf0ef" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}
              >
                Jurnal Kecantikan
              </span>
              <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2d1b1b" }}>Jurnal Kecantikan</h2>
              <p className="text-muted-foreground text-sm mt-2">Tips &amp; insight seputar wellness dan kecantikan.</p>
            </div>
            <Button asChild variant="ghost" className="w-fit hover:text-primary" data-testid="button-all-blog">
              <Link href="/blog">Lihat Semua <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPreviews.map((blog, i) => (
              <Link
                key={i}
                href={`/blog/${blog.slug}`}
                className="group cursor-pointer block"
                data-testid={`blog-preview-${i}`}
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span
                  className="text-xs font-semibold tracking-wider uppercase mb-2 block"
                  style={{ color: "#d96c8a" }}
                >
                  {blog.cat}
                </span>
                <h3 className="text-lg font-serif font-medium mb-2 group-hover:text-primary transition-colors leading-snug" style={{ color: "#2d1b1b" }}>
                  {blog.title}
                </h3>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════
          FAQ PREVIEW
          ════════════ */}
      <section className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ background: "rgba(217,108,138,0.10)", color: "#d96c8a" }}
          >
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-serif" style={{ color: "#2d1b1b" }}>Pertanyaan Umum</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {[
            { q: "Apakah produk original?", a: "Ya, semua produk AIS Beauty 100% original dan memiliki sertifikasi keamanan yang terpercaya." },
            { q: "Apakah bisa COD?", a: "Ya, tersedia metode pembayaran Cash on Delivery (COD) untuk area tertentu di seluruh Indonesia." },
            { q: "Berapa lama waktu pengiriman?", a: "Pesanan diproses cepat dalam 1x24 jam dan dikirim ke seluruh Indonesia dengan estimasi 2-5 hari kerja." },
            { q: "Bagaimana cara konsultasi produk?", a: "Bisa langsung melalui WhatsApp AIS Beauty yang tertera pada website." },
          ].map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b"
              style={{ borderColor: "rgba(217,108,138,0.20)" }}
            >
              <AccordionTrigger className="text-left font-medium text-sm hover:no-underline hover:text-primary py-4">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-8">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 h-10 font-medium"
            style={{ borderColor: "#d96c8a", color: "#d96c8a" }}
            data-testid="button-all-faq"
          >
            <Link href="/faq">Lihat Semua FAQ</Link>
          </Button>
        </div>
      </section>

      {/* ════════════════════════════
          CTA BANNER
          ════════════════════════════ */}
      <section
        id="kontak"
        className="py-20 px-4 md:px-8 lg:px-16"
        style={{ background: "linear-gradient(135deg, #f9e7e7 0%, #fdf6f3 60%, #fce4e8 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ background: "rgba(217,108,138,0.14)", color: "#d96c8a" }}
            >
              Konsultasi Gratis
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: "#2d1b1b" }}>
              Mulai Perjalanan Beauty-mu Hari Ini
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Konsultasikan kebutuhan kecantikan dan kesehatanmu bersama tim AIS Beauty. Gratis, tanpa komitmen.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-12 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
