import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock, MapPin, Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WHATSAPP } from "@/lib/products";

export default function Kontak() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Halo AIS Beauty!\n\nNama: ${form.name}\nNo. HP: ${form.phone}\n\nPesan:\n${form.message}`);
    window.open(`https://wa.me/6289518220436?text=${msg}`, "_blank");
    setSent(true);
    setForm({ name: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background font-sans pt-16 md:pt-20">
      <Navbar />

      {/* HEADER */}
      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background text-center">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            Kontak
          </span>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Hubungi Kami</h1>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
            Ada pertanyaan, konsultasi produk, atau ingin memesan? Kami siap membantu Anda dengan senang hati.
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARDS */}
      <section className="px-4 md:px-8 lg:px-16 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: MessageCircle, title: "WhatsApp", value: "+62 895-1822-0436", href: WHATSAPP, color: "text-green-600 bg-green-50" },
            { icon: Mail, title: "Email", value: "aisbeauty.store@gmail.com", href: "mailto:aisbeauty.store@gmail.com", color: "text-primary bg-primary/8" },
            { icon: Clock, title: "Jam Operasional", value: "Senin - Minggu 08.00–22.00 WIB", href: null, color: "text-secondary bg-secondary/10" },
            { icon: MapPin, title: "Layanan Area", value: "Seluruh Indonesia", href: null, color: "text-primary bg-primary/8" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="border-none shadow-sm bg-white/60 hover:shadow-md transition-shadow h-full">
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-sm mb-1">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="px-4 md:px-8 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* FORM */}
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-serif mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                <Input
                  placeholder="Nama kamu"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="rounded-xl border-border/60"
                  data-testid="input-contact-name"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Nomor HP / WhatsApp</label>
                <Input
                  placeholder="+62..."
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  className="rounded-xl border-border/60"
                  data-testid="input-contact-phone"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Pesan / Pertanyaan</label>
                <textarea
                  placeholder="Tulis pertanyaan atau pesanmu di sini..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full rounded-xl border border-border/60 bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                  data-testid="input-contact-message"
                />
              </div>
              {sent && (
                <p className="text-green-600 text-sm font-medium">Pesan terkirim! Kami akan segera merespons.</p>
              )}
              <Button
                type="submit"
                className="w-full rounded-full h-11 bg-primary hover:bg-primary/90 text-white"
                data-testid="button-contact-submit"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim via WhatsApp
              </Button>
            </form>
          </motion.div>

          {/* PAYMENT INFO */}
          <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif mb-6">Informasi Pembayaran</h2>
              <div className="space-y-4">
                <Card className="border-none bg-white/60 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-serif font-semibold mb-3">Transfer Bank BCA</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">No. Rekening:</span> 8610707565</p>
                      <p><span className="font-medium text-foreground">Atas Nama:</span> Nopa Setiyoko</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none bg-white/60 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-serif font-semibold mb-3">Transfer Bank Mandiri</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">No. Rekening:</span> 1370024315588</p>
                      <p><span className="font-medium text-foreground">Atas Nama:</span> Nopa Setiyoko</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none bg-white/60 shadow-sm">
                  <CardContent className="p-5">
                    <h4 className="font-serif font-semibold mb-3">DANA & GOPAY</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><span className="font-medium text-foreground">No. Telepon:</span> 085226145581</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none bg-green-50/60 shadow-sm border border-green-200/50">
                  <CardContent className="p-5">
                    <h4 className="font-serif font-semibold mb-1 text-green-800">COD (Cash on Delivery)</h4>
                    <p className="text-sm text-green-700">Tersedia untuk area tertentu. Hubungi kami untuk konfirmasi area COD.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="font-serif font-semibold text-base mb-3">Ikuti Kami</h3>
              <div className="flex gap-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 text-primary text-sm hover:bg-primary/15 transition-colors" data-testid="contact-instagram">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 text-primary text-sm hover:bg-primary/15 transition-colors" data-testid="contact-facebook">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
