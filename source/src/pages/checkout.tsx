import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MessageCircle, CheckCircle, Trash2, Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/lib/products";

const PAYMENT_METHODS = [
  { id: "cod",     label: "COD (Cash on Delivery)",                              detail: null },
  { id: "bca",     label: "Transfer BCA – 8610707565 (A.n Nopa Setiyoko)",       detail: "8610707565" },
  { id: "mandiri", label: "Transfer Mandiri – 1370024315588 (A.n Nopa Setiyoko)", detail: "1370024315588" },
  { id: "dana",    label: "DANA – 085226145581",                                  detail: "085226145581" },
  { id: "gopay",   label: "GOPAY – 085226145581",                                 detail: "085226145581" },
];

const PROVINCES = [
  "Aceh","Bali","Banten","Bengkulu","DI Yogyakarta","DKI Jakarta",
  "Gorontalo","Jambi","Jawa Barat","Jawa Tengah","Jawa Timur",
  "Kalimantan Barat","Kalimantan Selatan","Kalimantan Tengah",
  "Kalimantan Timur","Kalimantan Utara","Kepulauan Bangka Belitung",
  "Kepulauan Riau","Lampung","Maluku","Maluku Utara","Nusa Tenggara Barat",
  "Nusa Tenggara Timur","Papua","Papua Barat","Riau","Sulawesi Barat",
  "Sulawesi Selatan","Sulawesi Tengah","Sulawesi Tenggara","Sulawesi Utara",
  "Sumatera Barat","Sumatera Selatan","Sumatera Utara",
];

interface FormState {
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postal: string;
  notes: string;
}

type SubmitState = "idle" | "loading" | "success";

export default function Checkout() {
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 });
  const [payment, setPayment] = useState("bca");
  const [form, setForm] = useState<FormState>({
    name: "", phone: "", address: "", city: "", province: "", postal: "", notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [provinceOpen, setProvinceOpen] = useState(false);

  const cartItems = products.filter((p) => cart[p.id] > 0);
  const totalPrice = cartItems.reduce((sum, p) => {
    return sum + parseInt(p.price.replace(/[^0-9]/g, "")) * (cart[p.id] || 0);
  }, 0);

  const formatRp = (num: number) => `Rp${num.toLocaleString("id-ID").replace(/,/g, ".")}`;

  const addProduct = (id: number) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeProduct = (id: number) => setCart((prev) => { const n = { ...prev }; delete n[id]; return n; });
  const updateQty = (id: number, qty: number) =>
    qty < 1 ? removeProduct(id) : setCart((prev) => ({ ...prev, [id]: qty }));

  const setField = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (cartItems.length === 0) return false;
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.phone.trim()) e.phone = "No. WhatsApp wajib diisi";
    else if (!/^(\+62|62|0)[0-9]{8,13}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Format nomor tidak valid";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!form.city.trim()) e.city = "Kota wajib diisi";
    if (!form.province) e.province = "Provinsi wajib dipilih";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const paymentInfo = PAYMENT_METHODS.find((m) => m.id === payment)!;
    const orderLines = cartItems
      .map((p) => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ""));
        return `  • ${p.name} × ${cart[p.id]} = ${formatRp(price * cart[p.id])}`;
      })
      .join("\n");

    return [
      "🛍️ *PESANAN BARU — AIS Beauty Store*",
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "📦 *DETAIL PRODUK*",
      "━━━━━━━━━━━━━━━━━━━━",
      orderLines,
      `  Total Produk : ${formatRp(totalPrice)}`,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "👤 *DATA PEMBELI*",
      "━━━━━━━━━━━━━━━━━━━━",
      `• Nama       : ${form.name}`,
      `• No. HP/WA  : ${form.phone}`,
      `• Alamat     : ${form.address}`,
      `• Kota       : ${form.city}`,
      `• Provinsi   : ${form.province}`,
      form.postal ? `• Kode Pos   : ${form.postal}` : null,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "💳 *PEMBAYARAN*",
      "━━━━━━━━━━━━━━━━━━━━",
      `• Metode     : ${paymentInfo.label}`,
      `• Total      : ${formatRp(totalPrice)}`,
      form.notes ? `• Catatan    : ${form.notes}` : null,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "Mohon konfirmasi pesanan saya. Terima kasih! 🙏",
    ]
      .filter((l) => l !== null)
      .join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState("loading");
    setTimeout(() => {
      setSubmitState("success");
      const msg = buildMessage();
      setTimeout(() => {
        window.open(`https://wa.me/6289518220436?text=${encodeURIComponent(msg)}`, "_blank");
        setSubmitState("idle");
      }, 1400);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif mb-1">Checkout</h1>
          <p className="text-muted-foreground text-sm">Selesaikan pesananmu dan hubungi kami via WhatsApp.</p>
        </div>
      </section>

      {/* SUCCESS OVERLAY */}
      <AnimatePresence>
        {submitState === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm gap-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-green-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h3 className="font-serif text-3xl font-semibold mb-2">Pesanan Siap!</h3>
              <p className="text-muted-foreground">Mengalihkan ke WhatsApp...</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20"
            >
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">+6289518220436</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit}>
        <section className="px-4 md:px-8 lg:px-16 pb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-0 pt-8">

            {/* LEFT — FORM */}
            <div className="lg:col-span-2 space-y-6">

              {/* PRODUCT SELECTION */}
              <Card className="border-none shadow-sm bg-white/60">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" /> Pilih Produk
                  </h2>
                  <div className="space-y-3">
                    {products.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-background/50">
                        <div className={`w-14 h-14 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                          <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{p.name}</p>
                          <p className="text-primary text-sm font-bold">{p.price}</p>
                        </div>
                        {cart[p.id] ? (
                          <div className="flex items-center gap-2">
                            <button type="button" onClick={() => updateQty(p.id, cart[p.id] - 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                              data-testid={`button-qty-minus-${p.id}`}>-</button>
                            <span className="w-5 text-center text-sm font-medium">{cart[p.id]}</span>
                            <button type="button" onClick={() => updateQty(p.id, cart[p.id] + 1)}
                              className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                              data-testid={`button-qty-plus-${p.id}`}>+</button>
                            <button type="button" onClick={() => removeProduct(p.id)}
                              className="w-7 h-7 rounded-full text-destructive/70 hover:bg-destructive/10 flex items-center justify-center transition-colors"
                              data-testid={`button-remove-${p.id}`}>
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <Button type="button" size="sm" variant="outline"
                            onClick={() => addProduct(p.id)}
                            className="rounded-full text-xs border-primary/30 hover:bg-primary/5 text-primary shrink-0"
                            data-testid={`button-add-${p.id}`}>
                            + Tambah
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* SHIPPING FORM */}
              <Card className="border-none shadow-sm bg-white/60">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl mb-4">Data Pengiriman</h2>
                  <div className="space-y-4">

                    <FormField label="Nama Lengkap" required error={errors.name}>
                      <Input placeholder="Nama penerima" value={form.name}
                        onChange={(e) => setField("name", e.target.value)}
                        className={inputCls(!!errors.name)} data-testid="input-checkout-name" />
                    </FormField>

                    <FormField label="No. WhatsApp / HP" required error={errors.phone}>
                      <Input placeholder="+62 atau 08..." value={form.phone} type="tel"
                        onChange={(e) => setField("phone", e.target.value)}
                        className={inputCls(!!errors.phone)} data-testid="input-checkout-phone" />
                    </FormField>

                    <FormField label="Alamat Lengkap" required error={errors.address}>
                      <textarea placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan..."
                        value={form.address} onChange={(e) => setField("address", e.target.value)}
                        rows={3}
                        className={`w-full rounded-xl border px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none bg-background transition-colors ${errors.address ? "border-destructive" : "border-border/60 hover:border-border"}`}
                        data-testid="input-checkout-address" />
                      {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField label="Kota / Kabupaten" required error={errors.city}>
                        <Input placeholder="Kota tujuan" value={form.city}
                          onChange={(e) => setField("city", e.target.value)}
                          className={inputCls(!!errors.city)} data-testid="input-checkout-city" />
                      </FormField>

                      <FormField label="Kode Pos">
                        <Input placeholder="12345" value={form.postal}
                          onChange={(e) => setField("postal", e.target.value)}
                          className={inputCls(false)} data-testid="input-checkout-postal" />
                      </FormField>
                    </div>

                    <FormField label="Provinsi" required error={errors.province}>
                      <div className="relative">
                        <button type="button" onClick={() => setProvinceOpen(!provinceOpen)}
                          className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm bg-background transition-colors text-left ${errors.province ? "border-destructive" : "border-border/60 hover:border-border"} ${!form.province ? "text-muted-foreground" : "text-foreground"}`}
                          data-testid="input-checkout-province">
                          {form.province || "Pilih Provinsi"}
                          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${provinceOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {provinceOpen && (
                            <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-20 top-full mt-1 w-full bg-background border border-border rounded-xl shadow-lg max-h-44 overflow-y-auto">
                              {PROVINCES.map((prov) => (
                                <button key={prov} type="button"
                                  onClick={() => { setField("province", prov); setProvinceOpen(false); }}
                                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors ${form.province === prov ? "text-primary font-medium bg-primary/5" : ""}`}>
                                  {prov}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </FormField>

                    <FormField label="Catatan (Opsional)">
                      <Input placeholder="Catatan untuk penjual" value={form.notes}
                        onChange={(e) => setField("notes", e.target.value)}
                        className={inputCls(false)} data-testid="input-checkout-notes" />
                    </FormField>
                  </div>
                </CardContent>
              </Card>

              {/* PAYMENT METHOD */}
              <Card className="border-none shadow-sm bg-white/60">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl mb-4">Metode Pembayaran</h2>
                  <div className="space-y-2">
                    {PAYMENT_METHODS.map((m) => (
                      <label key={m.id}
                        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payment === m.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/40"}`}
                        data-testid={`payment-option-${m.id}`}>
                        <input type="radio" name="payment" value={m.id}
                          checked={payment === m.id} onChange={() => setPayment(m.id)}
                          className="accent-primary" />
                        <span className="text-sm font-medium">{m.label}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-none shadow-md bg-white/70">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="font-serif text-xl">Ringkasan Pesanan</h2>

                    {cartItems.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-6">Belum ada produk dipilih.</p>
                    ) : (
                      <div className="space-y-3">
                        {cartItems.map((p) => (
                          <div key={p.id} className="flex justify-between items-center text-sm">
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-muted-foreground text-xs">×{cart[p.id]}</p>
                            </div>
                            <span className="font-medium">{formatRp(parseInt(p.price.replace(/[^0-9]/g, "")) * cart[p.id])}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-border/50 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatRp(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ongkos Kirim</span>
                        <span className="text-green-600 font-medium text-xs">Konfirmasi via WA</span>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-primary text-lg">{formatRp(totalPrice)}</span>
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <Button
                      type="submit"
                      disabled={cartItems.length === 0 || submitState !== "idle"}
                      className="w-full rounded-full h-12 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-80 relative overflow-hidden"
                      style={{
                        background:
                          submitState === "loading"
                            ? "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
                            : "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                      }}
                      data-testid="button-checkout-whatsapp"
                    >
                      <AnimatePresence mode="wait">
                        {submitState === "loading" ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2 justify-center absolute inset-0">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Memproses...
                          </motion.span>
                        ) : (
                          <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex items-center gap-2 justify-center absolute inset-0">
                            <MessageCircle className="w-4 h-4" />
                            Kirim Pesan Via WhatsApp
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>

                    <div className="space-y-1.5 pt-1">
                      {["100% Produk Original", "Pembayaran Aman", "Pengiriman ke Seluruh Indonesia"].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </form>

      <Footer />
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `rounded-xl border bg-background text-sm transition-colors ${
    hasError ? "border-destructive" : "border-border/60 hover:border-border"
  }`;
}

function FormField({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block text-foreground/80">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-xs mt-1">
          {error}
        </motion.p>
      )}
    </div>
  );
}
