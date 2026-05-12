import { motion } from "framer-motion";
import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP } from "@/lib/products";

const faqCategories = [
  {
    category: "Produk & Keaslian",
    faqs: [
      { q: "Apakah produk AIS Beauty 100% original?", a: "Ya, semua produk yang kami jual adalah 100% original dan bergaransi keaslian. Kami hanya menjual produk resmi yang bersumber langsung dari distributor terpercaya." },
      { q: "Apakah produk sudah terdaftar di BPOM?", a: "Produk-produk kami telah memiliki izin edar yang sesuai dengan regulasi yang berlaku di Indonesia. Informasi lengkap dapat dilihat pada kemasan produk masing-masing." },
      { q: "Berapa lama masa kadaluarsa produk?", a: "Setiap produk memiliki tanggal kadaluarsa yang tertera jelas pada kemasan. Kami selalu menjaga stok agar produk yang sampai ke tangan pelanggan masih memiliki masa kadaluarsa yang panjang." },
    ],
  },
  {
    category: "Pemesanan & Pembayaran",
    faqs: [
      { q: "Apakah tersedia metode COD (Cash on Delivery)?", a: "Ya, kami menyediakan metode pembayaran COD untuk area tertentu di Indonesia. Hubungi kami via WhatsApp untuk mengetahui apakah area Anda tersedia layanan COD." },
      { q: "Metode pembayaran apa saja yang diterima?", a: "Kami menerima pembayaran via: COD, Transfer BCA (8610707565 a.n Nopa Setiyoko), Transfer Mandiri (1370024315588 a.n Nopa Setiyoko), DANA (085226145581), dan GOPAY (085226145581)." },
      { q: "Bagaimana cara melakukan pemesanan?", a: "Pemesanan dapat dilakukan langsung melalui WhatsApp kami di +6289518220436. Tim kami akan membantu proses pemesanan Anda dengan cepat dan mudah." },
      { q: "Apakah harga yang tertera sudah termasuk ongkos kirim?", a: "Harga produk belum termasuk ongkos kirim. Ongkir dihitung berdasarkan lokasi tujuan pengiriman. Informasi lengkap akan diberikan saat proses pemesanan." },
    ],
  },
  {
    category: "Pengiriman",
    faqs: [
      { q: "Berapa lama waktu pengiriman?", a: "Pesanan diproses dalam 1x24 jam setelah pembayaran dikonfirmasi. Estimasi pengiriman 2-5 hari kerja untuk Pulau Jawa, dan 4-7 hari kerja untuk luar Pulau Jawa." },
      { q: "Apakah bisa dikirim ke seluruh Indonesia?", a: "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia melalui jasa pengiriman terpercaya." },
      { q: "Bagaimana jika produk rusak saat pengiriman?", a: "Jika produk rusak atau tidak sesuai saat diterima, segera hubungi kami via WhatsApp dengan menyertakan foto produk dan nomor pesanan. Kami akan menindaklanjuti dengan cepat." },
    ],
  },
  {
    category: "Penggunaan & Keamanan",
    faqs: [
      { q: "Apakah produk aman dikonsumsi setiap hari?", a: "Produk kami diformulasikan untuk pemakaian harian dan aman dikonsumsi sesuai aturan pakai yang tertera pada kemasan masing-masing produk." },
      { q: "Berapa lama hasil baru terlihat?", a: "Hasil bervariasi tergantung kondisi tubuh dan konsistensi penggunaan. Umumnya hasil mulai terlihat setelah 2-4 minggu pemakaian rutin. Untuk hasil optimal, konsumsi secara konsisten minimal 1-3 bulan." },
      { q: "Apakah ada efek samping?", a: "Produk kami menggunakan bahan-bahan berkualitas yang aman. Namun, jika Anda memiliki kondisi kesehatan tertentu, sedang hamil/menyusui, atau mengonsumsi obat tertentu, konsultasikan dengan dokter sebelum penggunaan." },
      { q: "Bolehkah mengonsumsi lebih dari satu produk secara bersamaan?", a: "Bisa. Namun untuk saran terbaik sesuai kondisi Anda, silakan konsultasi gratis dengan tim kami via WhatsApp." },
    ],
  },
  {
    category: "Konsultasi & Layanan",
    faqs: [
      { q: "Bagaimana cara konsultasi produk?", a: "Konsultasi gratis bisa dilakukan langsung via WhatsApp di +6289518220436. Tim kami siap membantu Senin-Minggu, pukul 08.00-22.00 WIB." },
      { q: "Apakah ada layanan after-sales?", a: "Ya, kami berkomitmen memberikan layanan terbaik bahkan setelah pembelian. Hubungi kami kapan saja jika ada pertanyaan atau kendala." },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background font-sans pt-16 md:pt-20">
      <Navbar />

      {/* HEADER */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            FAQ
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Pertanyaan yang Sering Ditanyakan</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Temukan jawaban untuk pertanyaan-pertanyaan umum seputar produk, pemesanan, dan layanan AIS Beauty Store.
          </p>
        </motion.div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-4xl mx-auto">
        <div className="space-y-8">
          {faqCategories.map((group, gi) => (
            <motion.div
              key={gi}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <h2 className="text-xl font-serif font-semibold mb-4 text-primary">{group.category}</h2>
              <Accordion type="single" collapsible className="w-full space-y-2">
                {group.faqs.map((faq, fi) => (
                  <AccordionItem
                    key={fi}
                    value={`${gi}-${fi}`}
                    className="border rounded-xl px-5 bg-white/40 backdrop-blur-sm"
                    data-testid={`faq-item-${gi}-${fi}`}
                  >
                    <AccordionTrigger className="text-left font-medium text-sm py-4">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-4 leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STILL HAVE QUESTIONS */}
      <section className="py-16 px-4 md:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-serif mb-3">Masih Ada Pertanyaan?</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Tim kami siap membantu Anda. Hubungi kami via WhatsApp untuk konsultasi gratis dan cepat.
          </p>
          <Button
            asChild
            className="rounded-full px-8 bg-green-600 hover:bg-green-700 text-white"
            data-testid="faq-whatsapp-cta"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Tanya via WhatsApp
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
