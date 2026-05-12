import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, CheckCircle, ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductBySlug, products, WHATSAPP } from "@/lib/products";
import { useCheckout } from "@/lib/checkout-context";

interface Props {
  slug: string;
}

const testimonialsByProduct: Record<string, { name: string; initials: string; text: string }[]> = {
  "dvn-collagen": [
    { name: "Amanda R.", initials: "AR", text: "DVN Collagen benar-benar mengubah kulit saya. Lebih cerah dan kenyal setelah 2 minggu." },
    { name: "Riana S.", initials: "RS", text: "Flek hitam saya memudar drastis setelah rutin konsumsi DVN. Kulit tampak lebih muda!" },
    { name: "Maya K.", initials: "MK", text: "Tablet kunyahnya enak dan praktis. Efeknya nyata banget untuk kulit glowing." },
  ],
  "novia": [
    { name: "Sari W.", initials: "SW", text: "Novia membantu saya merasa lebih nyaman dan percaya diri setiap hari." },
    { name: "Linda P.", initials: "LP", text: "Sudah 2 bulan konsumsi Novia, perbedaannya terasa sekali. Highly recommended!" },
    { name: "Eka M.", initials: "EM", text: "Produk feminine care terbaik yang pernah saya coba. Terima kasih AIS Beauty!" },
  ],
  "s-glow": [
    { name: "Dian A.", initials: "DA", text: "S-GLOW rasanya lemon peach yang segar. Kulit saya glowing parah sekarang!" },
    { name: "Fira H.", initials: "FH", text: "Enak dimakan sebagai camilan sehat. Efek kecantikannya terasa nyata." },
    { name: "Nita R.", initials: "NR", text: "Mudah dikonsumsi dan hasilnya keren banget. Kulit lebih lembab dan bercahaya." },
  ],
  "erojan": [
    { name: "Budi S.", initials: "BS", text: "Stamina meningkat drastis setelah konsumsi Erojan. Aktivitas harian lebih optimal." },
    { name: "Arief M.", initials: "AM", text: "Produk yang sangat membantu untuk pria aktif seperti saya. Recommend!" },
    { name: "Dimas P.", initials: "DP", text: "Vitalitas terjaga dengan baik. Sudah jadi andalan saya setiap hari." },
  ],
  "bio-lingzhi-pro": [
    { name: "Hendra K.", initials: "HK", text: "Sirkulasi darah terasa lebih lancar setelah konsumsi Bio-Lingzhi Pro. Sangat bermanfaat." },
    { name: "Ratna S.", initials: "RS", text: "Produk herbal berkualitas. Daya tahan tubuh saya meningkat signifikan." },
    { name: "Wahyu T.", initials: "WT", text: "Bahan alaminya membuat saya percaya diri mengonsumsinya setiap hari." },
  ],
};

export default function ProdukDetail({ slug }: Props) {
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-serif">Produk tidak ditemukan</h2>
          <Button asChild className="rounded-full" data-testid="button-back-to-products">
            <Link href="/produk">Kembali ke Produk</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const { openCheckout } = useCheckout();
  const testimonials = testimonialsByProduct[product.slug] || [];
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const waMessage = encodeURIComponent(`Halo AIS Beauty, saya ingin konsultasi tentang produk ${product.name}. Bisa bantu?`);
  const waLink = `https://wa.me/6289518220436?text=${waMessage}`;

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="px-4 md:px-8 lg:px-16 py-4 border-b border-border/40 bg-muted/20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/produk" className="hover:text-primary transition-colors">Produk</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </div>
      </div>

      {/* PRODUCT HERO */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`aspect-square rounded-3xl ${product.color} flex items-center justify-center p-10 shadow-lg`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit text-muted-foreground" data-testid="button-back">
              <Link href="/produk"><ArrowLeft className="w-4 h-4 mr-1" /> Kembali</Link>
            </Button>

            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-serif mt-1 mb-2">{product.name}</h1>
              <p className="text-muted-foreground text-sm">{product.tagline}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-muted-foreground">5.0 (1250+ ulasan)</span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">{product.longDesc}</p>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base">Manfaat Utama:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-foreground">{product.price}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">per botol</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => openCheckout(product)}
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white h-12"
                  data-testid="button-buy-product"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Beli Sekarang
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="flex-1 rounded-full border-green-600 text-green-600 hover:bg-green-50 h-12"
                  data-testid="button-consult-product"
                >
                  <a href={waLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Tanya Dulu
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground pt-2">
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> 100% Original</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> COD Available</span>
              <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-primary" /> Pengiriman Cepat</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DETAILS ACCORDION */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-5xl mx-auto">
        <Accordion type="single" collapsible defaultValue="ingredients" className="w-full space-y-3">
          <AccordionItem value="ingredients" className="border rounded-xl px-5">
            <AccordionTrigger className="font-serif text-base font-semibold">Bahan-bahan (Ingredients)</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{product.ingredients}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="usage" className="border rounded-xl px-5">
            <AccordionTrigger className="font-serif text-base font-semibold">Cara Penggunaan</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{product.usage}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="shipping" className="border rounded-xl px-5">
            <AccordionTrigger className="font-serif text-base font-semibold">Pengiriman &amp; Pembayaran</AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              Tersedia pengiriman ke seluruh Indonesia. Metode pembayaran: COD, BCA (8610707565), Mandiri (1370024315588), DANA/GOPAY (085226145581). A.n Nopa Setiyoko. Pesanan diproses dalam 1x24 jam.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="px-4 md:px-8 lg:px-16 py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Ulasan Pelanggan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <Card key={i} className="border-none shadow-md bg-background">
                  <CardContent className="p-5 flex flex-col gap-3">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                    </div>
                    <p className="text-sm text-foreground/80 italic leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/50">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{t.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold">{t.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      <section className="px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-center">Produk Lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
