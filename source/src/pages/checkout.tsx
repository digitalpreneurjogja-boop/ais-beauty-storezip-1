import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, CheckCircle, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, WHATSAPP } from "@/lib/products";

const paymentMethods = [
  { id: "cod", label: "COD (Cash on Delivery)" },
  { id: "bca", label: "Transfer BCA – 8610707565 (A.n Nopa Setiyoko)" },
  { id: "mandiri", label: "Transfer Mandiri – 1370024315588 (A.n Nopa Setiyoko)" },
  { id: "dana", label: "DANA – 085226145581" },
  { id: "gopay", label: "GOPAY – 085226145581" },
];

export default function Checkout() {
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1 });
  const [payment, setPayment] = useState("bca");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });

  const cartItems = products.filter((p) => cart[p.id] > 0);
  const totalPrice = cartItems.reduce((sum, p) => {
    const priceNum = parseInt(p.price.replace(/[^0-9]/g, ""));
    return sum + priceNum * (cart[p.id] || 0);
  }, 0);

  const formatRp = (num: number) => `Rp${num.toLocaleString("id-ID").replace(/,/g, ".")}`;

  const handleWhatsApp = () => {
    const orderLines = cartItems
      .map((p) => `• ${p.name} x${cart[p.id]} = ${formatRp(parseInt(p.price.replace(/[^0-9]/g, "")) * cart[p.id])}`)
      .join("\n");
    const paymentLabel = paymentMethods.find((m) => m.id === payment)?.label || payment;
    const msg = encodeURIComponent(
      `Halo AIS Beauty! Saya ingin memesan:\n\n${orderLines}\n\nTotal: ${formatRp(totalPrice)}\n\nPembayaran: ${paymentLabel}\n\nNama: ${form.name}\nNo. HP: ${form.phone}\nAlamat: ${form.address}, ${form.city}\n${form.notes ? `Catatan: ${form.notes}` : ""}`
    );
    window.open(`https://wa.me/6289518220436?text=${msg}`, "_blank");
  };

  const addProduct = (id: number) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeProduct = (id: number) => setCart((prev) => { const n = { ...prev }; delete n[id]; return n; });
  const updateQty = (id: number, qty: number) => qty < 1 ? removeProduct(id) : setCart((prev) => ({ ...prev, [id]: qty }));

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* HEADER */}
      <section className="py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif mb-1">Checkout</h1>
          <p className="text-muted-foreground text-sm">Selesaikan pesananmu dan hubungi kami via WhatsApp.</p>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 pb-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: FORM */}
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
                          <button
                            onClick={() => updateQty(p.id, cart[p.id] - 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                            data-testid={`button-qty-minus-${p.id}`}
                          >-</button>
                          <span className="w-5 text-center text-sm font-medium">{cart[p.id]}</span>
                          <button
                            onClick={() => updateQty(p.id, cart[p.id] + 1)}
                            className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-sm hover:bg-muted transition-colors"
                            data-testid={`button-qty-plus-${p.id}`}
                          >+</button>
                          <button
                            onClick={() => removeProduct(p.id)}
                            className="w-7 h-7 rounded-full text-destructive/70 hover:bg-destructive/10 flex items-center justify-center transition-colors"
                            data-testid={`button-remove-${p.id}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addProduct(p.id)}
                          className="rounded-full text-xs border-primary/30 hover:bg-primary/5 text-primary shrink-0"
                          data-testid={`button-add-${p.id}`}
                        >
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                    <Input placeholder="Nama penerima" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl" data-testid="input-checkout-name" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-1.5 block">No. WhatsApp</label>
                    <Input placeholder="+62..." value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl" data-testid="input-checkout-phone" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm font-medium mb-1.5 block">Alamat Lengkap</label>
                    <textarea
                      placeholder="Jalan, nomor rumah, RT/RW, kelurahan, kecamatan..."
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      rows={3}
                      className="w-full rounded-xl border border-border/60 bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                      data-testid="input-checkout-address"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Kota / Kabupaten</label>
                    <Input placeholder="Kota tujuan" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="rounded-xl" data-testid="input-checkout-city" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Catatan (Opsional)</label>
                    <Input placeholder="Catatan untuk penjual" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="rounded-xl" data-testid="input-checkout-notes" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PAYMENT METHOD */}
            <Card className="border-none shadow-sm bg-white/60">
              <CardContent className="p-6">
                <h2 className="font-serif text-xl mb-4">Metode Pembayaran</h2>
                <div className="space-y-2">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${payment === m.id ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/40"}`}
                      data-testid={`payment-option-${m.id}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payment === m.id}
                        onChange={() => setPayment(m.id)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium">{m.label}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
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
                            <p className="text-muted-foreground text-xs">x{cart[p.id]}</p>
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
                      <span className="text-green-600 font-medium">Konfirmasi WA</span>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-primary text-lg">{formatRp(totalPrice)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleWhatsApp}
                    disabled={cartItems.length === 0}
                    className="w-full rounded-full h-11 bg-green-600 hover:bg-green-700 text-white"
                    data-testid="button-checkout-whatsapp"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Pesan via WhatsApp
                  </Button>

                  <div className="space-y-1.5 pt-1">
                    {[
                      "100% Produk Original",
                      "Pembayaran Aman",
                      "Pengiriman ke Seluruh Indonesia",
                    ].map((item, i) => (
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

      <Footer />
    </div>
  );
}
