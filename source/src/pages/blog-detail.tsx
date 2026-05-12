import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const blogContent: Record<string, { title: string; cat: string; date: string; readTime: string; img: string; body: string[] }> = {
  "perawatan-kulit-dari-dalam": {
    title: "Cara Merawat Kulit Dari Dalam",
    cat: "Skincare",
    date: "10 Mei 2025",
    readTime: "5 menit",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=90&auto=format&fit=crop",
    body: [
      "Merawat kulit tidak cukup hanya dari luar. Banyak wanita menghabiskan jutaan rupiah untuk produk skincare topikal, namun melupakan bahwa kecantikan sejati dimulai dari dalam — dari apa yang kita konsumsi setiap harinya.",
      "Kulit kita adalah cermin dari kondisi kesehatan tubuh secara keseluruhan. Ketika tubuh kekurangan nutrisi penting seperti kolagen, vitamin C, dan antioksidan, kulit akan tampak kusam, kering, dan lebih rentan terhadap tanda-tanda penuaan dini.",
      "Kolagen adalah protein utama yang menjaga struktur dan elastisitas kulit. Setelah usia 25 tahun, produksi kolagen alami tubuh mulai menurun sekitar 1-1,5% per tahun. Inilah mengapa suplemen kolagen premium seperti DVN Collagen menjadi investasi penting dalam rutinitas kecantikanmu.",
      "Selain kolagen, antioksidan berperan penting dalam melindungi kulit dari kerusakan akibat radikal bebas. L-Glutathione, yang terkandung dalam DVN Collagen, adalah antioksidan master yang membantu mencerahkan kulit dan mengurangi produksi melanin berlebih.",
      "Hidrasi dari dalam juga tak kalah penting. Sodium Hyaluronate membantu menarik dan mempertahankan kelembaban pada lapisan kulit terdalam, memberikan efek plumping yang membuat kulit tampak lebih kenyal dan muda.",
      "Kombinasikan suplemen berkualitas dengan pola makan sehat: perbanyak konsumsi sayuran hijau, buah-buahan kaya vitamin C, protein tanpa lemak, dan lemak sehat. Minum cukup air putih (minimal 8 gelas per hari) untuk mendukung proses regenerasi sel kulit.",
      "Dengan pendekatan holistik — merawat kulit dari dalam dan luar secara bersamaan — kamu akan melihat perubahan yang lebih signifikan dan berkelanjutan dibandingkan sekadar mengandalkan produk topikal saja.",
    ],
  },
  "tips-glowing-modern": {
    title: "Rahasia Kulit Glowing Wanita Modern",
    cat: "Lifestyle",
    date: "8 Mei 2025",
    readTime: "4 menit",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=90&auto=format&fit=crop",
    body: [
      "Di era modern yang serba cepat ini, menjaga kulit tetap glowing dan sehat memerlukan pendekatan yang cerdas dan efisien. Wanita modern tidak punya banyak waktu untuk rutinitas perawatan yang panjang — mereka butuh solusi yang efektif dan praktis.",
      "Rahasia pertama kulit glowing wanita modern adalah konsistensi. Lebih baik melakukan rutinitas perawatan sederhana secara konsisten setiap hari daripada melakukan perawatan intensif tapi tidak teratur.",
      "Suplemen kecantikan oral seperti S-GLOW Chewable dari AIS Beauty adalah solusi modern yang praktis. Cukup konsumsi 1-2 tablet kunyah per hari — bahkan bisa dikonsumsi sebagai camilan sehat — untuk mendapatkan manfaat kolagen dan antioksidan yang optimal.",
      "Tidur yang cukup (7-8 jam per malam) adalah perawatan kecantikan gratis yang sering diabaikan. Saat tidur, tubuh memproduksi growth hormone yang membantu regenerasi sel kulit. Kurang tidur dapat menyebabkan kulit kusam, mata bengkak, dan mempercepat penuaan.",
      "Manajemen stres juga krusial untuk kulit glowing. Stres berlebihan meningkatkan hormon kortisol yang dapat memicu peradangan, jerawat, dan kerusakan kolagen. Praktikkan meditasi, yoga, atau aktivitas yang kamu nikmati untuk menjaga keseimbangan mental.",
      "Kurangi paparan sinar UV dengan menggunakan sunscreen SPF 30+ setiap hari, bahkan saat cuaca mendung. Sinar UV adalah penyebab utama penuaan dini dan hiperpigmentasi pada kulit.",
      "Dengan mengombinasikan gaya hidup sehat, suplemen berkualitas, dan rutinitas perawatan yang konsisten, kulit glowing bukan lagi impian — itu adalah realita yang bisa kamu capai.",
    ],
  },
  "kolagen-anti-aging": {
    title: "Pentingnya Kolagen Untuk Anti Aging",
    cat: "Wellness",
    date: "5 Mei 2025",
    readTime: "6 menit",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=90&auto=format&fit=crop",
    body: [
      "Kolagen adalah protein paling melimpah dalam tubuh manusia, menyusun sekitar 30% dari total protein tubuh. Namun seiring bertambahnya usia, produksi kolagen alami tubuh terus menurun — dan inilah yang menyebabkan munculnya tanda-tanda penuaan pada kulit.",
      "Pada usia 20-an, penurunan produksi kolagen mulai terjadi secara gradual. Memasuki usia 30-an, penurunan ini semakin terasa — kulit mulai kehilangan elastisitasnya, garis-garis halus mulai muncul, dan tekstur kulit tidak lagi sehalus dulu.",
      "Faktor eksternal seperti paparan sinar UV, polusi, rokok, dan pola makan tidak sehat dapat mempercepat kerusakan kolagen secara dramatis. Inilah mengapa perlindungan dan suplemen kolagen menjadi semakin penting di era modern ini.",
      "Suplemen kolagen oral terbukti efektif dalam membantu tubuh mempertahankan dan memproduksi kolagen. Kolagen yang dikonsumsi secara oral dipecah menjadi peptida dan asam amino yang diserap usus, kemudian digunakan tubuh sebagai 'bahan baku' untuk sintesis kolagen baru.",
      "DVN Collagen dari AIS Beauty mengandung kolagen hidrolisis berkualitas tinggi yang mudah diserap tubuh, dikombinasikan dengan Sodium Hyaluronate untuk hidrasi mendalam, dan Vitamin C yang berperan sebagai kofaktor esensial dalam sintesis kolagen.",
      "Pomegranate Extract dalam DVN Collagen kaya akan punicalagin dan asam ellagic yang terbukti secara ilmiah dapat melindungi kolagen dari kerusakan oksidatif dan membantu mempertahankan elastisitas kulit.",
      "Mulailah suplemen kolagen sejak dini — idealnya di pertengahan usia 20-an — sebagai langkah preventif yang cerdas. Lebih mudah mempertahankan kolagen yang ada daripada memulihkannya setelah kerusakan terjadi.",
    ],
  },
  "tips-feminine-care": {
    title: "Tips Feminine Care Modern",
    cat: "Feminine Care",
    date: "2 Mei 2025",
    readTime: "5 menit",
    img: "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=1200&q=90&auto=format&fit=crop",
    body: [
      "Kesehatan wanita adalah hal yang kompleks dan sering kali diabaikan. Di tengah kesibukan sehari-hari, banyak wanita modern yang kurang memperhatikan keseimbangan dan kenyamanan tubuhnya sendiri.",
      "Feminine care yang baik dimulai dari pemahaman tentang tubuh sendiri. Setiap wanita memiliki kebutuhan yang unik, dan penting untuk mendengarkan sinyal-sinyal yang diberikan tubuhmu.",
      "Suplemen feminine care seperti Novia dari AIS Beauty diformulasikan khusus untuk mendukung keseimbangan dan kenyamanan wanita modern. Dengan bahan-bahan alami pilihan berkualitas tinggi dalam 60 kapsul vegetable, Novia membantu menjaga keseimbangan tubuh dari dalam.",
      "Olahraga rutin minimal 30 menit per hari sangat bermanfaat untuk kesehatan wanita. Aktivitas fisik membantu menjaga keseimbangan hormon, meningkatkan sirkulasi darah, mengurangi stres, dan meningkatkan mood secara keseluruhan.",
      "Pola makan yang seimbang dengan karbohidrat kompleks, protein berkualitas, lemak sehat, dan banyak serat sangat mendukung kesehatan wanita secara holistik. Kurangi konsumsi makanan olahan, gula berlebih, dan kafein yang dapat mempengaruhi keseimbangan hormonal.",
      "Manajemen stres adalah bagian tak terpisahkan dari feminine care. Stres kronis dapat mengganggu keseimbangan hormon dan memengaruhi berbagai aspek kesehatan wanita. Temukan aktivitas yang membantu kamu rileks — yoga, meditasi, membaca, atau hobi lainnya.",
      "Konsultasi rutin dengan tenaga kesehatan profesional juga penting. Jangan ragu untuk berkonsultasi jika kamu merasakan perubahan yang tidak biasa pada tubuhmu. Tim AIS Beauty juga siap membantu melalui layanan konsultasi gratis via WhatsApp.",
    ],
  },
  "stamina-wellness": {
    title: "Menjaga Stamina & Wellness Tubuh",
    cat: "Wellness",
    date: "28 April 2025",
    readTime: "4 menit",
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=90&auto=format&fit=crop",
    body: [
      "Stamina yang baik adalah fondasi dari produktivitas dan kualitas hidup yang optimal. Tanpa stamina yang memadai, bahkan aktivitas sehari-hari pun bisa terasa berat dan melelahkan.",
      "Bagi pria aktif, menjaga vitalitas dan stamina adalah prioritas. Tuntutan pekerjaan, tanggung jawab keluarga, dan aktivitas sosial yang padat membutuhkan energi dan ketahanan fisik yang prima.",
      "Suplemen seperti Erojan dari AIS Beauty diformulasikan khusus untuk membantu menunjang stamina pria. Dengan formula 60 kapsul vegetable premium dari bahan-bahan herbal pilihan, Erojan membantu mendukung vitalitas dan aktivitas harian agar tetap optimal.",
      "Tidur berkualitas adalah investasi stamina terbaik. Selama tidur, tubuh melakukan proses pemulihan dan regenerasi yang krusial. Targetkan 7-9 jam tidur per malam dengan jadwal yang konsisten untuk mendapatkan manfaat optimal.",
      "Nutrisi yang tepat sangat menentukan level energi dan stamina. Protein berkualitas, karbohidrat kompleks, dan lemak sehat adalah 'bahan bakar' yang tubuhmu butuhkan. Jangan lewatkan sarapan dan jaga pola makan yang teratur.",
      "Hidrasi yang cukup sering diremehkan. Dehidrasi bahkan yang ringan pun dapat menurunkan performa fisik dan mental secara signifikan. Minum minimal 2-3 liter air putih per hari, lebih banyak jika kamu aktif berolahraga.",
      "Bio-Lingzhi Pro dari AIS Beauty mengandung Ganoderma Lucidium Extract yang secara tradisional digunakan untuk mendukung sirkulasi darah dan daya tahan tubuh — fondasi penting dari stamina yang optimal dan berkelanjutan.",
    ],
  },
};

interface Props {
  slug: string;
}

export default function BlogDetail({ slug }: Props) {
  const post = blogContent[slug];

  if (!post) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <h2 className="text-2xl font-serif">Artikel tidak ditemukan</h2>
          <Button asChild className="rounded-full" data-testid="button-back-to-blog">
            <Link href="/blog">Kembali ke Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedSlugs = Object.keys(blogContent).filter((s) => s !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="px-4 md:px-8 lg:px-16 py-4 border-b border-border/40 bg-muted/20">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-48">{post.title}</span>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="px-4 md:px-8 py-12 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6 text-muted-foreground" data-testid="button-back-blog">
            <Link href="/blog"><ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Blog</Link>
          </Button>

          <div className="flex items-center gap-3 mb-4">
            <span className="flex items-center gap-1 text-xs font-semibold text-primary uppercase tracking-wider"><Tag className="w-3 h-3" />{post.cat}</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3 h-3" />{post.readTime}</span>
            <span className="text-xs text-muted-foreground">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">{post.title}</h1>

          <div className="aspect-[16/7] rounded-2xl overflow-hidden mb-10 shadow-lg">
            <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none">
            {post.body.map((para, i) => (
              <p key={i} className="text-foreground/80 leading-relaxed mb-5 text-base md:text-lg">
                {para}
              </p>
            ))}
          </div>
        </motion.div>
      </article>

      {/* RELATED POSTS */}
      <section className="px-4 md:px-8 lg:px-16 py-12 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif mb-6">Artikel Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedSlugs.map((s) => {
              const related = blogContent[s];
              return (
                <Link key={s} href={`/blog/${s}`} className="group block" data-testid={`related-blog-${s}`}>
                  <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3">
                    <img src={related.img} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1 block">{related.cat}</span>
                  <h3 className="font-serif font-medium group-hover:text-primary transition-colors leading-snug">{related.title}</h3>
                  <span className="text-sm text-muted-foreground flex items-center gap-1 mt-2">
                    Baca <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
