import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP } from "@/lib/products";

const testimonials = [
  { name: "Amanda Rahayu", initials: "AR", product: "DVN Collagen", text: "Sejak rutin mengonsumsi DVN Collagen, kulit saya yang awalnya kusam jadi lebih kenyal dan cerah. Flek hitam juga memudar. Sangat merekomendasikan!", rating: 5 },
  { name: "Siti Nurhaliza", initials: "SN", product: "Bio-Lingzhi Pro", text: "Sangat cocok dengan Bio-Lingzhi. Sirkulasi darah lebih lancar dan badan tidak gampang capek. Sudah 3 bulan konsumsi rutin!", rating: 5 },
  { name: "Putri Maharani", initials: "PM", product: "Novia", text: "Novia membantu menyeimbangkan hormon saya. Kulit jadi jarang jerawatan dan mood lebih stabil. Highly recommended untuk wanita aktif!", rating: 5 },
  { name: "Dewi Lestari", initials: "DL", product: "S-GLOW Chewable", text: "S-GLOW rasanya enak dan efeknya luar biasa. Kulit saya glowing parah padahal tanpa makeup tebal. Love it!", rating: 5 },
  { name: "Riana Susanti", initials: "RS", product: "DVN Collagen", text: "Sudah 2 bulan pakai DVN Collagen, kulit jadi lebih lembab dan cerah. Orang-orang sering tanya skincare apa yang saya pakai hehe.", rating: 5 },
  { name: "Fitri Handayani", initials: "FH", product: "S-GLOW Chewable", text: "S-GLOW jadi favorit saya! Enak dimakan kayak camilan sehat. Efeknya nyata banget buat kulit glowing.", rating: 5 },
  { name: "Maya Kartika", initials: "MK", product: "Novia", text: "Produk feminine care terbaik yang pernah saya coba. Terima kasih AIS Beauty untuk produk yang berkualitas!", rating: 5 },
  { name: "Budi Santoso", initials: "BS", product: "Erojan", text: "Stamina meningkat drastis setelah konsumsi Erojan. Aktivitas harian lebih optimal dan tidak mudah lelah.", rating: 5 },
  { name: "Hendra Kusuma", initials: "HK", product: "Bio-Lingzhi Pro", text: "Sirkulasi darah terasa lebih lancar dan badan lebih fit. Bio-Lingzhi Pro sudah jadi andalan keluarga kami.", rating: 5 },
  { name: "Linda Permata", initials: "LP", product: "DVN Collagen", text: "Investasi terbaik untuk kulit! DVN Collagen hasilnya nyata dan saya merasa lebih percaya diri setiap hari.", rating: 5 },
  { name: "Dian Anggraini", initials: "DA", product: "S-GLOW Chewable", text: "Awalnya skeptis, tapi setelah 1 bulan minum S-GLOW, teman-teman mulai komentar kulit saya lebih glowing. I'm sold!", rating: 5 },
  { name: "Wahyu Triyono", initials: "WT", product: "Bio-Lingzhi Pro", text: "Bahan alaminya membuat saya percaya diri mengonsumsinya setiap hari. Daya tahan tubuh meningkat signifikan.", rating: 5 },
];

const beforeAfterItems = [
  { name: "Rina, 28th", product: "DVN Collagen", duration: "2 Bulan", result: "Kulit lebih cerah, flek berkurang 70%, tekstur lebih halus" },
  { name: "Sarah, 32th", product: "S-GLOW Chewable", duration: "6 Minggu", result: "Kulit glowing alami, lebih lembab, dan bercahaya" },
  { name: "Nita, 25th", product: "Novia", duration: "1 Bulan", result: "Lebih nyaman, percaya diri meningkat, kulit lebih bersih" },
];

export default function Testimoni() {
  return (
    <div className="min-h-screen bg-background font-sans pt-16 md:pt-20">
      <Navbar />

      {/* HEADER */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Testimoni Pelanggan
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Kata Mereka</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Ribuan wanita dan pria Indonesia telah membuktikan khasiat produk AIS Beauty. Inilah pengalaman nyata mereka.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            {[{ label: "Pelanggan Puas", value: "10.000+" }, { label: "Rating Rata-rata", value: "5.0" }, { label: "Ulasan Verified", value: "1.250+" }].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-serif font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIAL GRID */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.07 }}
            >
              <Card className="border-none shadow-sm hover:shadow-md transition-shadow bg-white/60 h-full" data-testid={`testimonial-card-${i}`}>
                <CardContent className="p-5 flex flex-col gap-3">
                  <Quote className="w-5 h-5 text-primary/40" />
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <p className="text-sm text-foreground/80 italic leading-relaxed flex-1">"{t.text}"</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">{t.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-muted-foreground">Verified Buyer</p>
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-primary/8 text-primary rounded-full">{t.product}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEFORE AFTER */}
      <section className="py-16 bg-muted/30 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Transformasi Nyata</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Hasil nyata dari pelanggan yang rutin menggunakan produk AIS Beauty.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beforeAfterItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/60 rounded-2xl p-6 border border-border/50 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.product} — {item.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current text-yellow-500" />)}
                </div>
                <p className="text-sm text-foreground/80">{item.result}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 text-center">
        <h2 className="text-3xl font-serif mb-4">Jadilah Bagian dari Keluarga AIS Beauty</h2>
        <p className="text-muted-foreground mb-8 text-sm">Konsultasikan kebutuhan kecantikanmu dan mulai transformasimu hari ini.</p>
        <Button asChild className="rounded-full px-10 bg-green-600 hover:bg-green-700 text-white" data-testid="button-testimonials-cta">
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Konsultasi Gratis via WhatsApp</a>
        </Button>
      </section>

      <Footer />
    </div>
  );
}
