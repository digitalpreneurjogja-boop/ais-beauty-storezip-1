import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, CheckCircle, Loader2, Star, ChevronDown, Minus, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/lib/checkout-context";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

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

const PAYMENT_METHODS = [
  { id: "cod",     label: "COD",     sub: "Bayar di tempat",                   icon: "💵", detail: null },
  { id: "bca",     label: "BCA",     sub: "8610707565 · A.n Nopa Setiyoko",    icon: "🏦", detail: "8610707565" },
  { id: "mandiri", label: "Mandiri", sub: "1370024315588 · A.n Nopa Setiyoko", icon: "🏦", detail: "1370024315588" },
  { id: "dana",    label: "DANA",    sub: "085226145581",                       icon: "💙", detail: "085226145581" },
  { id: "gopay",   label: "GoPay",   sub: "085226145581",                       icon: "💚", detail: "085226145581" },
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

const EMPTY_FORM: FormState = {
  name: "", phone: "", address: "",
  city: "", province: "", postal: "", notes: "",
};

type SubmitState = "idle" | "loading" | "success";

export default function CheckoutModal() {
  const { open, selectedProduct, closeCheckout } = useCheckout();

  const [product, setProduct] = useState<Product>(products[0]);
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState("bca");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [provinceOpen, setProvinceOpen] = useState(false);

  useEffect(() => {
    if (selectedProduct) setProduct(selectedProduct);
    if (open) {
      setQty(1);
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitState("idle");
      setPayment("bca");
    }
  }, [open, selectedProduct]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""));
  const subtotal = priceNum * qty;
  const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID").replace(/,/g, ".")}`;

  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === payment)!;

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi";
    if (!form.phone.trim()) e.phone = "No. WhatsApp wajib diisi";
    else if (!/^(\+62|62|0)[0-9]{8,13}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Format nomor tidak valid";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!form.city.trim()) e.city = "Kota wajib diisi";
    if (!form.province) e.province = "Provinsi wajib dipilih";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      "🛍️ *PESANAN BARU — AIS Beauty Store*",
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "📦 *DETAIL PRODUK*",
      "━━━━━━━━━━━━━━━━━━━━",
      `• Produk     : ${product.name}`,
      `• Jumlah     : ${qty} pcs`,
      `• Harga      : ${product.price}`,
      `• Subtotal   : ${formatRp(subtotal)}`,
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
      `• Metode     : ${selectedPayment.label}`,
      selectedPayment.detail ? `• No. Rek/Akun: ${selectedPayment.detail}` : null,
      `• Total      : ${formatRp(subtotal)}`,
      form.notes ? `• Catatan    : ${form.notes}` : null,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "Mohon konfirmasi pesanan saya. Terima kasih! 🙏",
    ];
    return lines.filter((l) => l !== null).join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector("[data-has-error='true']");
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitState("loading");

    setTimeout(() => {
      setSubmitState("success");
      const msg = buildWhatsAppMessage();
      setTimeout(() => {
        window.open(`https://wa.me/6289518220436?text=${encodeURIComponent(msg)}`, "_blank");
        closeCheckout();
        setSubmitState("idle");
      }, 1400);
    }, 1000);
  };

  const setField = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={closeCheckout}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center p-0 sm:p-4"
          >
            <div
              className="relative w-full sm:max-w-4xl max-h-[96vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-background shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="shrink-0 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-border/50 bg-background/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold leading-tight">Checkout Pesanan</h2>
                    <p className="text-xs text-muted-foreground">AIS Beauty Store · Produk 100% Original</p>
                  </div>
                </div>
                <button
                  onClick={closeCheckout}
                  className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors"
                  data-testid="button-close-checkout"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* SUCCESS OVERLAY */}
              <AnimatePresence>
                {submitState === "success" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/98 backdrop-blur-sm gap-5"
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
                      <h3 className="font-serif text-2xl font-semibold mb-1">Pesanan Siap Dikirim!</h3>
                      <p className="text-muted-foreground text-sm">Mengalihkan ke WhatsApp...</p>
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

              {/* SCROLLABLE BODY */}
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 lg:grid-cols-5 min-h-full">

                  {/* LEFT — FORM */}
                  <div className="lg:col-span-3 p-5 sm:p-8 space-y-7 border-r border-border/30">

                    {/* PRODUCT SELECTOR */}
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Produk Dipilih</h3>
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        {products.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setProduct(p)}
                            className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${product.id === p.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-primary/40 bg-white/40"}`}
                            data-testid={`checkout-product-select-${p.slug}`}
                          >
                            <div className={`w-10 h-10 rounded-lg ${p.color} flex items-center justify-center`}>
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain p-0.5" />
                            </div>
                            <span className="text-[9px] font-medium text-center leading-tight line-clamp-2">{p.name}</span>
                            {product.id === p.id && (
                              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2.5 h-2.5 text-white" />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      <div className={`flex items-center gap-4 p-4 rounded-2xl ${product.color} border border-white/60`}>
                        <div className="w-16 h-16 rounded-xl bg-white/60 flex items-center justify-center shrink-0 p-1.5">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif font-semibold text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.tagline}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />)}
                            <span className="text-xs text-muted-foreground ml-0.5">5.0</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="font-bold text-sm">{product.price}</span>
                          <div className="flex items-center gap-1.5 bg-white/70 rounded-full px-2 py-1 border border-white/80">
                            <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" data-testid="checkout-qty-minus">
                              <Minus className="w-3 h-3 text-primary" />
                            </button>
                            <span className="w-5 text-center text-sm font-semibold">{qty}</span>
                            <button type="button" onClick={() => setQty(qty + 1)} className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors" data-testid="checkout-qty-plus">
                              <Plus className="w-3 h-3 text-primary" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CUSTOMER DATA */}
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Data Pembeli</h3>
                      <div className="space-y-3">

                        <Field label="Nama Lengkap" required error={errors.name}>
                          <Input
                            placeholder="Nama lengkap penerima"
                            value={form.name}
                            onChange={(e) => setField("name", e.target.value)}
                            className={inputCls(!!errors.name)}
                            data-testid="checkout-input-name"
                            data-has-error={!!errors.name}
                          />
                        </Field>

                        <Field label="Nomor WhatsApp / HP" required error={errors.phone}>
                          <Input
                            placeholder="+62 atau 08..."
                            value={form.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            type="tel"
                            className={inputCls(!!errors.phone)}
                            data-testid="checkout-input-phone"
                            data-has-error={!!errors.phone}
                          />
                        </Field>

                        <Field label="Alamat Lengkap" required error={errors.address}>
                          <textarea
                            placeholder="Nama jalan, no. rumah, RT/RW, kelurahan, kecamatan..."
                            value={form.address}
                            onChange={(e) => setField("address", e.target.value)}
                            rows={3}
                            className={`w-full rounded-xl border px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none bg-background transition-colors ${errors.address ? "border-destructive" : "border-border/60 hover:border-border"}`}
                            data-testid="checkout-input-address"
                            data-has-error={!!errors.address}
                          />
                          {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Kota / Kabupaten" required error={errors.city}>
                            <Input
                              placeholder="Kota tujuan"
                              value={form.city}
                              onChange={(e) => setField("city", e.target.value)}
                              className={inputCls(!!errors.city)}
                              data-testid="checkout-input-city"
                              data-has-error={!!errors.city}
                            />
                          </Field>
                          <Field label="Kode Pos">
                            <Input
                              placeholder="12345"
                              value={form.postal}
                              onChange={(e) => setField("postal", e.target.value)}
                              className={inputCls(false)}
                              data-testid="checkout-input-postal"
                            />
                          </Field>
                        </div>

                        <Field label="Provinsi" required error={errors.province}>
                          <div className="relative" data-has-error={!!errors.province}>
                            <button
                              type="button"
                              onClick={() => setProvinceOpen(!provinceOpen)}
                              className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm bg-background hover:border-border transition-colors text-left ${errors.province ? "border-destructive" : "border-border/60"} ${!form.province ? "text-muted-foreground" : "text-foreground"}`}
                              data-testid="checkout-province-select"
                            >
                              {form.province || "Pilih Provinsi"}
                              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${provinceOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {provinceOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute z-20 top-full mt-1 w-full bg-background border border-border rounded-xl shadow-lg max-h-44 overflow-y-auto"
                                >
                                  {PROVINCES.map((prov) => (
                                    <button
                                      key={prov}
                                      type="button"
                                      onClick={() => { setField("province", prov); setProvinceOpen(false); }}
                                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors ${form.province === prov ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}
                                    >
                                      {prov}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Field>

                        <Field label="Catatan Pesanan">
                          <Input
                            placeholder="Catatan untuk penjual (opsional)"
                            value={form.notes}
                            onChange={(e) => setField("notes", e.target.value)}
                            className={inputCls(false)}
                            data-testid="checkout-input-notes"
                          />
                        </Field>
                      </div>
                    </div>

                    {/* PAYMENT METHOD */}
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Metode Pembayaran</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {PAYMENT_METHODS.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPayment(m.id)}
                            className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center ${payment === m.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-primary/30 bg-white/40"}`}
                            data-testid={`checkout-payment-${m.id}`}
                          >
                            <span className="text-xl">{m.icon}</span>
                            <span className="text-xs font-semibold leading-tight">{m.label}</span>
                          </button>
                        ))}
                      </div>

                      <AnimatePresence>
                        {payment !== "cod" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/15 overflow-hidden"
                          >
                            <p className="text-xs font-semibold text-primary mb-1">Info Transfer {selectedPayment.label}:</p>
                            <p className="text-sm font-mono font-bold text-foreground">{selectedPayment.detail}</p>
                            {(payment === "bca" || payment === "mandiri") && (
                              <p className="text-xs text-muted-foreground mt-0.5">A.n Nopa Setiyoko</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* MOBILE SUBMIT BUTTON */}
                    <div className="lg:hidden pt-2 pb-4">
                      <SubmitButton submitState={submitState} />
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        Kamu akan diarahkan ke WhatsApp untuk konfirmasi
                      </p>
                    </div>
                  </div>

                  {/* RIGHT — ORDER SUMMARY */}
                  <div className="lg:col-span-2 p-5 sm:p-8 bg-muted/20 flex flex-col gap-5">
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Ringkasan Pesanan</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-start text-sm">
                          <span className="text-muted-foreground flex-1 pr-4">{product.name} × {qty}</span>
                          <span className="font-semibold shrink-0">{formatRp(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ongkos Kirim</span>
                          <span className="text-green-600 font-medium text-xs">Dikonfirmasi via WA</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Pembayaran</span>
                          <span className="font-medium">{selectedPayment.label}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border/60">
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-semibold">Total</span>
                          <span className="font-bold text-xl text-primary">{formatRp(subtotal)}</span>
                        </div>
                      </div>
                    </div>

                    {/* TRUST BADGES */}
                    <div className="space-y-2">
                      {[
                        "100% Produk Original",
                        "Pembayaran Aman & Terpercaya",
                        "Pengiriman ke Seluruh Indonesia",
                        "Konsultasi Gratis via WhatsApp",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* DESKTOP SUBMIT BUTTON */}
                    <div className="hidden lg:block lg:mt-auto">
                      <SubmitButton submitState={submitState} />
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        Kamu akan diarahkan ke WhatsApp untuk konfirmasi
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SubmitButton({ submitState }: { submitState: "idle" | "loading" | "success" }) {
  return (
    <Button
      type="submit"
      disabled={submitState !== "idle"}
      className="w-full h-12 rounded-full text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-90 relative overflow-hidden"
      style={{
        background:
          submitState === "idle"
            ? "linear-gradient(135deg, #C9968A 0%, #E8B4A0 50%, #C9968A 100%)"
            : submitState === "loading"
            ? "linear-gradient(135deg, #b08070 0%, #d49e8e 100%)"
            : "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      }}
      data-testid="checkout-submit"
    >
      <AnimatePresence mode="wait">
        {submitState === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 justify-center absolute inset-0"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            Memproses Pesanan...
          </motion.span>
        )}
        {submitState === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 justify-center absolute inset-0"
          >
            <CheckCircle className="w-4 h-4" />
            Berhasil!
          </motion.span>
        )}
        {submitState === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-2 justify-center absolute inset-0"
          >
            <MessageCircle className="w-4 h-4" />
            Kirim Pesan Via WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}

function inputCls(hasError: boolean) {
  return `rounded-xl border bg-background text-sm transition-colors ${
    hasError ? "border-destructive focus-visible:ring-destructive" : "border-border/60 hover:border-border"
  }`;
}

function Field({
  label, required, error, children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium mb-1.5 block text-foreground/80">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-xs mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
