import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck, Heart, Leaf, Award, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP } from "@/lib/products";

const brandImg = "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&q=90&auto=format&fit=crop";
const teamImg = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80&auto=format&fit=crop";

const values = [
  { icon: ShieldCheck, title: "Kualitas Terjamin", desc: "Setiap produk kami melewati seleksi ketat untuk memastikan standar kualitas premium yang konsisten." },
  { icon: Heart, title: "Peduli Pelanggan", desc: "Kami berkomitmen memberikan pengalaman berbelanja yang menyenangkan dan layanan konsultasi terbaik." },
  { icon: Leaf, title: "Bahan Alami", desc: "Menggunakan bahan-bahan alami pilihan berkualitas tinggi yang aman dan efektif." },
  { icon: Award, title: "Terpercaya", desc: "Dipercaya oleh ribuan pelanggan di seluruh Indonesia sejak awal berdiri." },
];

const milestones = [
  { year: "2020", title: "Awal Berdiri", desc: "AIS Beauty Store didirikan dengan misi membantu kecantikan dari dalam." },
  { year: "2021", title: "Produk Pertama", desc: "Meluncurkan DVN Collagen dan mendapatkan respons luar biasa dari pelanggan." },
  { year: "2022", title: "Ekspansi Produk", desc: "Melengkapi rangkaian dengan Novia, S-GLOW, Erojan, dan Bio-Lingzhi Pro." },
  { year: "2023", title: "10.000+ Pelanggan", desc: "Mencapai lebih dari 10.000 pelanggan puas di seluruh Indonesia." },
  { year: "2024", title: "Premium Online Store", desc: "Meluncurkan platform digital premium untuk pengalaman berbelanja terbaik." },
];

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HERO */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-5xl font-serif mb-4">Cerita di Balik AIS Beauty</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Kami percaya bahwa kecantikan sejati terpancar dari dalam — dari tubuh yang sehat, jiwa yang tenang, dan kepercayaan diri yang tulus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={brandImg} alt="AIS Beauty Story" className="w-full rounded-3xl shadow-xl object-cover aspect-[4/3]" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-serif">Misi Kami</h2>
            <div className="w-14 h-0.5 bg-primary rounded-full" />
            <p className="text-muted-foreground leading-relaxed">
              AIS Beauty Store hadir dengan satu tujuan: membantu wanita dan pria Indonesia meraih kecantikan serta kesehatan optimal dari dalam. Kami percaya bahwa perawatan terbaik dimulai dari nutrisi yang tepat, bukan sekadar perawatan luar.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Berawal dari keprihatinan terhadap banyaknya produk kecantikan yang tidak aman beredar di pasar, kami berkomitmen menghadirkan rangkaian suplemen premium yang terformulasi dengan standar tinggi, menggunakan bahan-bahan alami pilihan berkualitas, dan telah teruji keamanannya.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hari ini, AIS Beauty melayani ribuan pelanggan setia di seluruh Indonesia dengan produk-produk yang tidak hanya efektif, tetapi juga memberikan pengalaman kecantikan yang mewah dan menyenangkan.
            </p>
            <Button asChild className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white mt-2" data-testid="button-shop-from-about">
              <Link href="/produk">Lihat Produk Kami <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-16 bg-muted/30 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Nilai-nilai Kami</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">Yang mendorong setiap keputusan dan produk yang kami hadirkan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION MISSION */}
      <section className="px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
            <h3 className="text-2xl font-serif mb-4 text-primary">Visi Kami</h3>
            <p className="text-muted-foreground leading-relaxed">
              Menjadi brand kecantikan dan wellness terpercaya nomor 1 di Indonesia yang membantu setiap individu meraih kecantikan dan kesehatan terbaik dari dalam, dengan produk-produk premium yang aman, efektif, dan terjangkau.
            </p>
          </div>
          <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
            <h3 className="text-2xl font-serif mb-4 text-secondary">Misi Kami</h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex gap-2"><span className="text-primary mt-0.5">•</span> Menghadirkan produk suplemen premium berkualitas tinggi dengan bahan-bahan terpilih.</li>
              <li className="flex gap-2"><span className="text-primary mt-0.5">•</span> Memberikan edukasi kecantikan yang tepat kepada masyarakat Indonesia.</li>
              <li className="flex gap-2"><span className="text-primary mt-0.5">•</span> Membangun komunitas perempuan Indonesia yang percaya diri dan sehat.</li>
              <li className="flex gap-2"><span className="text-primary mt-0.5">•</span> Memberikan layanan konsultasi terbaik yang personal dan terpercaya.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="py-16 bg-muted/30 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Perjalanan Kami</h2>
          </div>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0 w-16 text-right">
                  <span className="font-serif font-bold text-primary text-lg">{m.year}</span>
                </div>
                <div className="w-px bg-border/60 self-stretch relative">
                  <div className="absolute top-1.5 -left-1.5 w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="pb-6">
                  <h4 className="font-serif font-semibold text-base mb-1">{m.title}</h4>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "10.000+", label: "Pelanggan Puas" },
            { value: "5", label: "Produk Premium" },
            { value: "5.0", label: "Rating Rata-rata" },
            { value: "34", label: "Provinsi Terlayani" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card/60 border border-border/50"
            >
              <div className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-primary/8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4">Bergabunglah Bersama Ribuan Pelanggan Puas</h2>
          <p className="text-muted-foreground mb-8 text-sm">Mulai perjalanan kecantikanmu hari ini bersama AIS Beauty.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white" data-testid="button-shop-cta">
              <Link href="/produk">Belanja Sekarang</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 border-primary/30" data-testid="button-contact-cta">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">Hubungi Kami</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
