import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck, Zap, Award, Star, ArrowRight, MessageCircle, Gem, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, WHATSAPP } from "@/lib/products";

import heroBannerImg from "@assets/hero-banner.png";
const heroImageUrl = heroBannerImg;

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

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col gap-6"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider w-fit">
            #1 Beauty &amp; Wellness
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Beauty Starts<br />
            <span className="text-primary italic">From Within</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Rangkaian produk premium untuk kulit glowing, tubuh sehat, dan percaya diri setiap hari.
          </p>
          <div className="flex flex-wrap gap-3 mt-2">
            <Button size="lg" className="rounded-full px-8 h-12 text-sm bg-primary hover:bg-primary/90 text-white" asChild data-testid="hero-cta-shop">
              <Link href="/produk">Belanja Sekarang</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-sm border-primary/30 hover:bg-primary/5" asChild data-testid="hero-cta-consult">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Konsultasi Gratis</a>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50">
            {[
              { icon: ShieldCheck, text: "100% Original" },
              { icon: Award, text: "Aman & Berkualitas" },
              { icon: Zap, text: "Teruji Klinis" },
              { icon: Star, text: "Ribuan Customer" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-foreground/70">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-3xl -z-10" />
          <img
            src={heroImageUrl}
            alt="AIS Beauty — Beauty Starts From Within"
            className="w-full h-auto max-h-[560px] object-cover rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* PRODUCT STRIP */}
      <section className="py-10 bg-muted/30 border-y border-border/40 overflow-x-auto">
        <div className="flex gap-8 md:gap-16 items-center px-6 w-max mx-auto">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/produk/${p.slug}`}
              className="flex flex-col items-center gap-3 w-32 shrink-0 group cursor-pointer"
              data-testid={`strip-product-${p.slug}`}
            >
              <div className={`w-24 h-24 rounded-full ${p.color} p-3 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <span className="font-serif text-sm font-medium text-center leading-tight">{p.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="py-20 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Produk Premium Kami</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Diformulasikan dengan bahan terbaik untuk memberikan hasil nyata bagi kecantikan dan kesehatan Anda.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="rounded-full px-8 border-primary/30 hover:bg-primary/5" data-testid="button-view-all-products">
            <Link href="/produk">Lihat Semua Produk <ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-card/50 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Mengapa AIS Beauty?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "Produk Original", desc: "Jaminan 100% asli" },
              { icon: MessageCircle, title: "Konsultasi Gratis", desc: "Bantuan pakar kecantikan" },
              { icon: Zap, title: "Pengiriman Cepat", desc: "Ke seluruh Indonesia" },
              { icon: Award, title: "Aman & Terpercaya", desc: "Sertifikasi resmi" },
              { icon: Wallet, title: "COD Available", desc: "Bayar di tempat" },
              { icon: Gem, title: "Premium Quality", desc: "Bahan kualitas terbaik" },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/60 shadow-sm"
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-base">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS PREVIEW */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-2">Kata Mereka</h2>
              <p className="text-muted-foreground text-sm">Ribuan wanita Indonesia telah membuktikan khasiatnya.</p>
            </div>
            <Button asChild variant="ghost" className="w-fit" data-testid="button-all-testimonials">
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
                <Card className="border-none shadow-md bg-background h-full">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-sm text-foreground/80 italic leading-relaxed flex-1">"{t.text}"</p>
                    <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h5 className="font-semibold text-sm">{t.name}</h5>
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

      {/* BLOG PREVIEW */}
      <section className="py-20 bg-card/50 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-2">Jurnal Kecantikan</h2>
              <p className="text-muted-foreground text-sm">Tips &amp; insight seputar wellness dan kecantikan.</p>
            </div>
            <Button asChild variant="ghost" className="w-fit" data-testid="button-all-blog">
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
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-sm">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs font-semibold text-primary tracking-wider uppercase mb-2 block">{blog.cat}</span>
                <h3 className="text-lg font-serif font-medium mb-2 group-hover:text-primary transition-colors leading-snug">{blog.title}</h3>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Baca Selengkapnya <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ PREVIEW */}
      <section className="py-20 px-4 md:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-3">Pertanyaan Umum</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {[
            { q: "Apakah produk original?", a: "Ya, semua produk AIS Beauty 100% original dan memiliki sertifikasi keamanan yang terpercaya." },
            { q: "Apakah bisa COD?", a: "Ya, tersedia metode pembayaran Cash on Delivery (COD) untuk area tertentu di seluruh Indonesia." },
            { q: "Berapa lama waktu pengiriman?", a: "Pesanan diproses cepat dalam 1x24 jam dan dikirim ke seluruh Indonesia dengan estimasi 2-5 hari kerja." },
            { q: "Bagaimana cara konsultasi produk?", a: "Bisa langsung melalui WhatsApp AIS Beauty yang tertera pada website." },
          ].map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="rounded-full px-6 border-primary/30" data-testid="button-all-faq">
            <Link href="/faq">Lihat Semua FAQ</Link>
          </Button>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-primary/8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif mb-4">Mulai Perjalanan Beauty-mu Hari Ini</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm leading-relaxed">
              Konsultasikan kebutuhan kecantikan dan kesehatanmu bersama tim AIS Beauty. Gratis, tanpa komitmen.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full px-10 h-12 bg-green-600 hover:bg-green-700 text-white"
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
