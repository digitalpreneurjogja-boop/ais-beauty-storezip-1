import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    slug: "perawatan-kulit-dari-dalam",
    title: "Cara Merawat Kulit Dari Dalam",
    excerpt: "Rahasia kulit glowing bukan hanya dari perawatan luar, tapi juga dari dalam. Pelajari bagaimana nutrisi dan suplemen tepat bisa mengubah kondisi kulitmu secara dramatis.",
    cat: "Skincare",
    readTime: "5 menit",
    date: "10 Mei 2025",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=700&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    slug: "tips-glowing-modern",
    title: "Rahasia Kulit Glowing Wanita Modern",
    excerpt: "Di era modern ini, kulit glowing bukan lagi privilege segelintir orang. Temukan tips dan trik dari para pakar kecantikan untuk mendapatkan kulit bercahaya setiap hari.",
    cat: "Lifestyle",
    readTime: "4 menit",
    date: "8 Mei 2025",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80&auto=format&fit=crop",
    featured: false,
  },
  {
    slug: "kolagen-anti-aging",
    title: "Pentingnya Kolagen Untuk Anti Aging",
    excerpt: "Kolagen adalah protein struktural yang menjaga elastisitas dan kekencangan kulit. Kenapa produksinya menurun seiring usia dan bagaimana cara mengatasinya?",
    cat: "Wellness",
    readTime: "6 menit",
    date: "5 Mei 2025",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=700&q=80&auto=format&fit=crop",
    featured: false,
  },
  {
    slug: "tips-feminine-care",
    title: "Tips Feminine Care Modern",
    excerpt: "Merawat kesehatan wanita dari dalam adalah investasi jangka panjang. Panduan lengkap untuk menjaga keseimbangan dan kenyamanan tubuh wanita modern.",
    cat: "Feminine Care",
    readTime: "5 menit",
    date: "2 Mei 2025",
    img: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=700&q=80&auto=format&fit=crop",
    featured: false,
  },
  {
    slug: "stamina-wellness",
    title: "Menjaga Stamina & Wellness Tubuh",
    excerpt: "Stamina yang baik adalah kunci produktivitas dan kualitas hidup. Temukan cara-cara alami untuk menjaga vitalitas dan energi tubuh sepanjang hari.",
    cat: "Wellness",
    readTime: "4 menit",
    date: "28 April 2025",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80&auto=format&fit=crop",
    featured: false,
  },
];

const categories = ["Semua", "Skincare", "Lifestyle", "Wellness", "Feminine Care"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const featured = blogPosts.find((b) => b.featured);
  const filtered = blogPosts
    .filter((b) => !b.featured)
    .filter((b) => activeCategory === "Semua" || b.cat === activeCategory);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HEADER */}
      <section className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Jurnal Kecantikan
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Blog AIS Beauty</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Tips, insight, dan inspirasi seputar kecantikan, wellness, dan gaya hidup sehat untuk wanita dan pria Indonesia modern.
          </p>
        </motion.div>
      </section>

      {/* FEATURED POST */}
      {featured && (
        <section className="px-4 md:px-8 lg:px-16 pb-12 max-w-7xl mx-auto">
          <Link href={`/blog/${featured.slug}`} className="block group" data-testid="blog-featured">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 md:p-12 bg-card flex flex-col justify-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">{featured.cat}</span>
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Artikel Unggulan</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif group-hover:text-primary transition-colors leading-snug">{featured.title}</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featured.readTime}</span>
                  <span>{featured.date}</span>
                </div>
                <span className="text-sm font-medium text-primary flex items-center gap-1 mt-2">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* FILTERS */}
      <section className="px-4 md:px-8 lg:px-16 py-4 border-b border-border/40 bg-background/95 backdrop-blur-md sticky top-16 md:top-20 z-40">
        <div className="max-w-7xl mx-auto flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full text-xs px-4 ${activeCategory === cat ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"}`}
              data-testid={`blog-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Tag className="w-3 h-3 mr-1" />{cat}
            </Button>
          ))}
        </div>
      </section>

      {/* POST GRID */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block" data-testid={`blog-card-${post.slug}`}>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 shadow-sm">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.cat}</span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="text-xl font-serif font-medium mb-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">{post.excerpt}</p>
                <span className="text-sm font-medium text-primary flex items-center gap-1">
                  Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
