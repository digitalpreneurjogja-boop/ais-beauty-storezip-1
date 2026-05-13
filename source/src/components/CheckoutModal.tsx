import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShoppingBag, CheckCircle, Loader2, Star,
  ChevronDown, Minus, Plus, MessageCircle, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckout } from "@/lib/checkout-context";
import { products } from "@/lib/products";

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
  name: string; phone: string; address: string;
  city: string; province: string; postal: string; notes: string;
}
const EMPTY_FORM: FormState = {
  name: "", phone: "", address: "", city: "", province: "", postal: "", notes: "",
};

type SubmitState = "idle" | "loading" | "success";
type Cart = Record<number, number>;

const formatRp = (n: number) => `Rp${n.toLocaleString("id-ID").replace(/,/g, ".")}`;
const priceOf = (p: typeof products[0]) => parseInt(p.price.replace(/[^0-9]/g, ""));

export default function CheckoutModal() {
  const { open, selectedProduct, closeCheckout } = useCheckout();

  const [cart, setCart] = useState<Cart>({});
  const [payment, setPayment] = useState("bca");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [provinceOpen, setProvinceOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setCart(selectedProduct ? { [selectedProduct.id]: 1 } : {});
      setForm(EMPTY_FORM);
      setErrors({});
      setSubmitState("idle");
      setPayment("bca");
      setProvinceOpen(false);
    }
  }, [open, selectedProduct]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const cartItems = products.filter((p) => (cart[p.id] ?? 0) > 0);
  const totalPrice = cartItems.reduce((s, p) => s + priceOf(p) * cart[p.id], 0);
  const totalQty   = cartItems.reduce((s, p) => s + cart[p.id], 0);

  const toggleProduct = (id: number) => {
    setCart((prev) => {
      if (prev[id]) { const n = { ...prev }; delete n[id]; return n; }
      return { ...prev, [id]: 1 };
    });
  };

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) {
      setCart((prev) => { const n = { ...prev }; delete n[id]; return n; });
    } else {
      setCart((prev) => ({ ...prev, [id]: qty }));
    }
  };

  const selectedPayment = PAYMENT_METHODS.find((m) => m.id === payment)!;

  const setField = (key: keyof FormState, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    if (cartItems.length === 0) return false;
    const e: Partial<FormState> = {};
    if (!form.name.trim())  e.name    = "Nama wajib diisi";
    if (!form.phone.trim()) e.phone   = "No. WhatsApp wajib diisi";
    else if (!/^(\+62|62|0)[0-9]{8,13}$/.test(form.phone.replace(/\s/g, "")))
                            e.phone   = "Format nomor tidak valid";
    if (!form.address.trim()) e.address = "Alamat wajib diisi";
    if (!form.city.trim())    e.city    = "Kota wajib diisi";
    if (!form.province)       e.province = "Provinsi wajib dipilih";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildMessage = () => {
    const orderLines = cartItems
      .map((p) => `  • ${p.name} × ${cart[p.id]} = ${formatRp(priceOf(p) * cart[p.id])}`)
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
      `• Metode     : ${selectedPayment.label}`,
      selectedPayment.detail ? `• No. Rek/Akun: ${selectedPayment.detail}` : null,
      `• Total      : ${formatRp(totalPrice)}`,
      form.notes ? `• Catatan    : ${form.notes}` : null,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "Mohon konfirmasi pesanan saya. Terima kasih! 🙏",
    ].filter((l) => l !== null).join("\n");
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
        closeCheckout();
        setSubmitState("idle");
      }, 1400);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
            onClick={closeCheckout}
          />

          {/* Modal */}
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
              <div className="shrink-0 flex items-center justify-between px-5 sm:px-8 py-4 border-b border-border/50 bg-background/95 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-semibold leading-tight">Checkout Pesanan</h2>
                    <p className="text-xs text-muted-foreground">
                      {totalQty > 0 ? `${totalQty} item dipilih · ${formatRp(totalPrice)}` : "Pilih produk yang ingin dipesan"}
                    </p>
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
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/98 backdrop-blur-sm gap-5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
                      <h3 className="font-serif text-2xl font-semibold mb-1">Pesanan Siap Dikirim!</h3>
                      <p className="text-muted-foreground text-sm">Mengalihkan ke WhatsApp...</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
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

                    {/* ── MULTI-PRODUCT SELECTOR ── */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                          Pilih Produk
                        </h3>
                        {cartItems.length > 0 && (
                          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {cartItems.length} produk dipilih
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        {products.map((p) => {
                          const isChecked = (cart[p.id] ?? 0) > 0;
                          const qty = cart[p.id] ?? 0;
                          return (
                            <motion.div
                              key={p.id}
                              layout
                              className={`flex items-center gap-3 p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none ${
                                isChecked
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border/40 hover:border-primary/30 bg-white/40"
                              }`}
                              onClick={() => toggleProduct(p.id)}
                              data-testid={`checkout-product-toggle-${p.slug}`}
                            >
                              {/* Checkbox */}
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
                                  isChecked ? "border-primary bg-primary" : "border-border/60 bg-white"
                                }`}
                              >
                                {isChecked && (
                                  <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                                  </motion.div>
                                )}
                              </div>

                              {/* Product image */}
                              <div className={`w-12 h-12 rounded-xl ${p.color} flex items-center justify-center shrink-0`}>
                                <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                              </div>

                              {/* Name + price */}
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm leading-tight">{p.name}</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                                  ))}
                                  <span className="text-[10px] text-muted-foreground ml-0.5">5.0</span>
                                </div>
                                <p className="text-primary font-bold text-sm mt-0.5">{p.price}</p>
                              </div>

                              {/* Quantity controls (only when checked) */}
                              <AnimatePresence>
                                {isChecked && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    transition={{ duration: 0.18 }}
                                    className="flex items-center gap-1.5 bg-white rounded-full px-2 py-1 border border-border/60 shadow-sm"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <button
                                      type="button"
                                      onClick={() => updateQty(p.id, qty - 1)}
                                      className="w-6 h-6 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                                      data-testid={`checkout-qty-minus-${p.id}`}
                                    >
                                      {qty <= 1
                                        ? <Trash2 className="w-3 h-3 text-destructive/70" />
                                        : <Minus className="w-3 h-3 text-primary" />
                                      }
                                    </button>
                                    <span className="w-5 text-center text-sm font-bold text-foreground">{qty}</span>
                                    <button
                                      type="button"
                                      onClick={() => updateQty(p.id, qty + 1)}
                                      className="w-6 h-6 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                                      data-testid={`checkout-qty-plus-${p.id}`}
                                    >
                                      <Plus className="w-3 h-3 text-primary" />
                                    </button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </div>

                      {cartItems.length === 0 && (
                        <p className="text-center text-xs text-muted-foreground mt-3 py-2">
                          Centang produk yang ingin dipesan
                        </p>
                      )}
                    </div>

                    {/* ── DATA PEMBELI ── */}
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Data Pembeli</h3>
                      <div className="space-y-3">

                        <Field label="Nama Lengkap" required error={errors.name}>
                          <Input placeholder="Nama lengkap penerima" value={form.name}
                            onChange={(e) => setField("name", e.target.value)}
                            className={inputCls(!!errors.name)} data-testid="checkout-input-name" />
                        </Field>

                        <Field label="Nomor WhatsApp / HP" required error={errors.phone}>
                          <Input placeholder="+62 atau 08..." value={form.phone} type="tel"
                            onChange={(e) => setField("phone", e.target.value)}
                            className={inputCls(!!errors.phone)} data-testid="checkout-input-phone" />
                        </Field>

                        <Field label="Alamat Lengkap" required error={errors.address}>
                          <textarea
                            placeholder="Nama jalan, no. rumah, RT/RW, kelurahan, kecamatan..."
                            value={form.address} onChange={(e) => setField("address", e.target.value)}
                            rows={3}
                            className={`w-full rounded-xl border px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none bg-background transition-colors ${errors.address ? "border-destructive" : "border-border/60 hover:border-border"}`}
                            data-testid="checkout-input-address"
                          />
                          {errors.address && <p className="text-destructive text-xs mt-1">{errors.address}</p>}
                        </Field>

                        <div className="grid grid-cols-2 gap-3">
                          <Field label="Kota / Kabupaten" required error={errors.city}>
                            <Input placeholder="Kota tujuan" value={form.city}
                              onChange={(e) => setField("city", e.target.value)}
                              className={inputCls(!!errors.city)} data-testid="checkout-input-city" />
                          </Field>
                          <Field label="Kode Pos">
                            <Input placeholder="12345" value={form.postal}
                              onChange={(e) => setField("postal", e.target.value)}
                              className={inputCls(false)} data-testid="checkout-input-postal" />
                          </Field>
                        </div>

                        <Field label="Provinsi" required error={errors.province}>
                          <div className="relative">
                            <button type="button" onClick={() => setProvinceOpen(!provinceOpen)}
                              className={`w-full flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm bg-background hover:border-border transition-colors text-left ${errors.province ? "border-destructive" : "border-border/60"} ${!form.province ? "text-muted-foreground" : "text-foreground"}`}
                              data-testid="checkout-province-select">
                              {form.province || "Pilih Provinsi"}
                              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${provinceOpen ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                              {provinceOpen && (
                                <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}
                                  className="absolute z-20 top-full mt-1 w-full bg-background border border-border rounded-xl shadow-lg max-h-44 overflow-y-auto">
                                  {PROVINCES.map((prov) => (
                                    <button key={prov} type="button"
                                      onClick={() => { setField("province", prov); setProvinceOpen(false); }}
                                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/5 transition-colors ${form.province === prov ? "text-primary font-medium bg-primary/5" : "text-foreground"}`}>
                                      {prov}
                                    </button>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </Field>

                        <Field label="Catatan Pesanan">
                          <Input placeholder="Catatan untuk penjual (opsional)" value={form.notes}
                            onChange={(e) => setField("notes", e.target.value)}
                            className={inputCls(false)} data-testid="checkout-input-notes" />
                        </Field>
                      </div>
                    </div>

                    {/* ── PAYMENT METHOD ── */}
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Metode Pembayaran</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {PAYMENT_METHODS.map((m) => (
                          <button key={m.id} type="button" onClick={() => setPayment(m.id)}
                            className={`flex flex-col items-center gap-1.5 p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center ${payment === m.id ? "border-primary bg-primary/5 shadow-sm" : "border-border/40 hover:border-primary/30 bg-white/40"}`}
                            data-testid={`checkout-payment-${m.id}`}>
                            <span className="text-xl">{m.icon}</span>
                            <span className="text-xs font-semibold leading-tight">{m.label}</span>
                          </button>
                        ))}
                      </div>
                      <AnimatePresence>
                        {payment !== "cod" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/15 overflow-hidden">
                            <p className="text-xs font-semibold text-primary mb-1">Info Transfer {selectedPayment.label}:</p>
                            <p className="text-sm font-mono font-bold text-foreground">{selectedPayment.detail}</p>
                            {(payment === "bca" || payment === "mandiri") && (
                              <p className="text-xs text-muted-foreground mt-0.5">A.n Nopa Setiyoko</p>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* MOBILE SUBMIT */}
                    <div className="lg:hidden pt-2 pb-4">
                      <SubmitButton submitState={submitState} disabled={cartItems.length === 0} />
                      <p className="text-center text-xs text-muted-foreground mt-2">
                        Kamu akan diarahkan ke WhatsApp untuk konfirmasi
                      </p>
                    </div>
                  </div>

                  {/* RIGHT — ORDER SUMMARY */}
                  <div className="lg:col-span-2 p-5 sm:p-8 bg-muted/20 flex flex-col gap-5">
                    <div>
                      <h3 className="font-serif font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Ringkasan Pesanan</h3>

                      {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-8 text-center">
                          <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
                          <p className="text-sm text-muted-foreground">Belum ada produk dipilih</p>
                          <p className="text-xs text-muted-foreground/70">Centang produk di sebelah kiri</p>
                        </div>
                      ) : (
                        <AnimatePresence>
                          <div className="space-y-3">
                            {cartItems.map((p) => (
                              <motion.div
                                key={p.id}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                layout
                                className="flex items-start gap-3"
                              >
                                <div className={`w-9 h-9 rounded-lg ${p.color} flex items-center justify-center shrink-0`}>
                                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-0.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                                  <p className="text-xs text-muted-foreground">×{cart[p.id]}</p>
                                </div>
                                <span className="text-sm font-bold shrink-0">
                                  {formatRp(priceOf(p) * cart[p.id])}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </AnimatePresence>
                      )}
                    </div>

                    {/* Pricing breakdown */}
                    <div className="border-t border-border/50 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({totalQty} item)</span>
                        <span className="font-medium">{formatRp(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ongkos Kirim</span>
                        <span className="text-green-600 font-medium text-xs">Konfirmasi via WA</span>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-3">
                      <div className="flex justify-between font-bold items-center">
                        <span className="text-base">Total</span>
                        <motion.span
                          key={totalPrice}
                          initial={{ scale: 1.12, color: "#d96c8a" }}
                          animate={{ scale: 1, color: "#d96c8a" }}
                          transition={{ duration: 0.25 }}
                          className="text-xl font-bold"
                          style={{ color: "#d96c8a" }}
                        >
                          {formatRp(totalPrice)}
                        </motion.span>
                      </div>
                    </div>

                    {/* DESKTOP SUBMIT */}
                    <div className="hidden lg:block space-y-3 mt-auto">
                      <SubmitButton submitState={submitState} disabled={cartItems.length === 0} />
                      <div className="space-y-1.5">
                        {["100% Produk Original", "Pembayaran Aman & Terpercaya", "Pengiriman ke Seluruh Indonesia"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>
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

function SubmitButton({ submitState, disabled }: { submitState: SubmitState; disabled: boolean }) {
  return (
    <Button
      type="submit"
      disabled={disabled || submitState !== "idle"}
      className="w-full rounded-full h-12 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60 relative overflow-hidden border-0"
      style={{
        background: submitState === "loading"
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
            Kirim Pesanan via WhatsApp
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}

function inputCls(hasError: boolean) {
  return `rounded-xl border bg-background text-sm transition-colors ${
    hasError ? "border-destructive" : "border-border/60 hover:border-border"
  }`;
}

function Field({ label, required, error, children }: {
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
