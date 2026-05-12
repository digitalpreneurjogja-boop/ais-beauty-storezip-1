import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const categories = ["Semua", "Skincare", "Feminine Care", "Men's Health", "Herbal"];

export default function Produk() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "Semua" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background font-sans pt-16 md:pt-20">
      <Navbar />

      {/* PAGE HEADER */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Koleksi Premium
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Produk Kami</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Rangkaian produk premium untuk kulit glowing, tubuh sehat, dan percaya diri setiap hari. Diformulasikan dengan bahan berkualitas tinggi.
          </p>
        </motion.div>
      </section>

      {/* FILTERS */}
      <section className="px-4 md:px-8 lg:px-16 py-8 border-b border-border/50 sticky top-16 md:top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full text-xs px-4 ${activeCategory === cat ? "bg-primary hover:bg-primary/90 text-white" : "border-primary/20 hover:bg-primary/5"}`}
                data-testid={`filter-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </Button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 rounded-full border-primary/20 text-sm"
              data-testid="input-search-products"
            />
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">Produk tidak ditemukan.</p>
            <Button
              onClick={() => { setSearch(""); setActiveCategory("Semua"); }}
              variant="outline"
              className="mt-4 rounded-full"
              data-testid="button-reset-filter"
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
