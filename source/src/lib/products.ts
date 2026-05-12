import dvnImg from "@assets/DVN._1778592781599.png";
import noviaImg from "@assets/Novia._1778592781602.png";
import sglowImg from "@assets/SGLOW_1778592781603.png";
import erojanImg from "@assets/ERojan_1778592781601.png";
import bioImg from "@assets/Bio-Lingzhi_Pro_AI_1778592781590.png";

export const WHATSAPP = "https://wa.me/6289518220436";

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
  tagline: string;
  desc: string;
  longDesc: string;
  benefits: string[];
  ingredients: string;
  usage: string;
  color: string;
  accentColor: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "DVN Collagen",
    slug: "dvn-collagen",
    price: "Rp999.000",
    image: dvnImg,
    tagline: "Kolagen Premium Tablet Kunyah",
    desc: "Kolagen premium untuk membantu menjaga kulit glowing, sehat, dan tampak lebih terawat dari dalam.",
    longDesc: "DVN Collagen adalah suplemen kolagen premium dalam bentuk tablet kunyah yang diformulasikan dengan Collagen, L-Glutathione, Sodium Hyaluronate, Vitamin C, dan Pomegranate Extract. Diformulasikan untuk membantu menjaga elastisitas kulit, mencerahkan warna kulit, dan memberikan tampilan glowing dari dalam.",
    benefits: ["Membantu kulit glowing dan bercahaya", "Mendukung perawatan anti aging", "Menjaga elastisitas dan kelembaban kulit", "Mengandung antioksidan tinggi", "Membantu mencerahkan kulit secara merata"],
    ingredients: "Collagen Hydrolysate, L-Glutathione, Sodium Hyaluronate, Vitamin C (Ascorbic Acid), Polygonum Cuspidatum Radix Extract, Pomegranate Extract",
    usage: "Konsumsi 1-2 tablet per hari setelah makan. Kunyah hingga habis sebelum ditelan. Untuk hasil optimal, konsumsi secara rutin.",
    color: "bg-pink-50",
    accentColor: "#F2A0AE",
    category: "Skincare",
  },
  {
    id: 2,
    name: "Novia",
    slug: "novia",
    price: "Rp990.000",
    image: noviaImg,
    tagline: "Suplemen Feminine Care Premium",
    desc: "Suplemen premium wanita modern untuk membantu menjaga kenyamanan dan percaya diri setiap hari.",
    longDesc: "Novia adalah suplemen feminine care premium yang diformulasikan khusus untuk kebutuhan wanita modern. Dengan 60 kapsul vegetable berkualitas tinggi, Novia membantu menjaga keseimbangan tubuh wanita, mendukung kenyamanan sehari-hari, dan meningkatkan rasa percaya diri dari dalam.",
    benefits: ["Mendukung perawatan feminine care", "Membantu kenyamanan tubuh wanita", "Mendukung rasa percaya diri", "Bahan alami pilihan berkualitas", "Cocok untuk wanita modern aktif"],
    ingredients: "Bahan alami pilihan berkualitas tinggi (lihat kemasan untuk informasi lengkap). 60 Vegetable Capsules.",
    usage: "Konsumsi sesuai aturan pakai yang tertera pada kemasan. Dianjurkan diminum bersama air putih setelah makan.",
    color: "bg-purple-50",
    accentColor: "#9B7BB8",
    category: "Feminine Care",
  },
  {
    id: 3,
    name: "S-GLOW Chewable",
    slug: "s-glow",
    price: "Rp990.000",
    image: sglowImg,
    tagline: "Tablet Kolagen Lemon & Peach",
    desc: "Tablet kunyah kolagen lemon & peach untuk membantu menjaga kesehatan kulit dari dalam.",
    longDesc: "S-GLOW Chewable adalah tablet kunyah kolagen premium dengan cita rasa lemon & peach yang menyegarkan. Diformulasikan oleh iBling dengan formula kolagen berkualitas yang dipadukan dengan ekstrak lemon dan peach untuk membantu menjaga kesehatan dan kecantikan kulit dari dalam secara menyenangkan.",
    benefits: ["Membantu kulit glowing dan cerah", "Sumber kolagen berkualitas tinggi", "Rasa lemon & peach yang menyegarkan", "Mendukung kesehatan kulit dari dalam", "Mudah dikonsumsi kapan saja"],
    ingredients: "Collagen Peptide, Lemon Extract, Peach Extract, Vitamin C, bahan pendukung lainnya. Net Weight 60g (60 tablets).",
    usage: "Konsumsi 1-2 tablet per hari. Kunyah hingga habis. Boleh dikonsumsi kapan saja.",
    color: "bg-yellow-50",
    accentColor: "#7DBEA8",
    category: "Skincare",
  },
  {
    id: 4,
    name: "Erojan",
    slug: "erojan",
    price: "Rp769.000",
    image: erojanImg,
    tagline: "Suplemen Stamina Pria Premium",
    desc: "Suplemen pria modern untuk membantu menunjang stamina dan aktivitas harian.",
    longDesc: "Erojan adalah suplemen premium yang secara tradisional digunakan untuk mendukung kesehatan dan energi pria. Dengan formula 60 kapsul vegetable premium, Erojan membantu menunjang stamina, menjaga vitalitas tubuh, dan mendukung aktivitas harian pria aktif agar tetap optimal sepanjang hari.",
    benefits: ["Membantu menunjang stamina pria", "Membantu menjaga vitalitas tubuh", "Mendukung aktivitas harian optimal", "Cocok untuk pria aktif dan dinamis", "Formula premium vegetable capsule"],
    ingredients: "Bahan herbal alami pilihan (lihat kemasan untuk informasi lengkap). 60 Vegetable Capsules.",
    usage: "Konsumsi sesuai aturan pakai yang tertera pada kemasan. Minum bersama air putih yang cukup.",
    color: "bg-slate-50",
    accentColor: "#2C3E50",
    category: "Men's Health",
  },
  {
    id: 5,
    name: "Bio-Lingzhi Pro",
    slug: "bio-lingzhi-pro",
    price: "Rp499.000",
    image: bioImg,
    tagline: "Herbal Premium Ganoderma Extract",
    desc: "Produk herbal premium berbahan alami yang secara tradisional digunakan membantu sirkulasi darah.",
    longDesc: "Bio-Lingzhi Pro adalah produk herbal premium berbahan Ganoderma Lucidium Extract (Lingzhi) yang telah lama dipercaya secara tradisional untuk membantu sirkulasi darah. Dengan 60 kapsul 500mg berkualitas tinggi, Bio-Lingzhi Pro mendukung daya tahan tubuh dan kesehatan secara menyeluruh dengan bahan alami berkualitas.",
    benefits: ["Membantu sirkulasi darah secara tradisional", "Mendukung daya tahan tubuh", "Bahan alami Ganoderma Lucidium berkualitas", "Dipercaya keluarga Indonesia", "Tersertifikasi BPOM"],
    ingredients: "Ganoderma Lucidium Extract (Lingzhi) 500mg per kapsul. 60 Kapsul.",
    usage: "Konsumsi 1 kapsul 2x sehari setelah makan pagi dan malam dengan air putih hangat.",
    color: "bg-green-50",
    accentColor: "#7A9E7E",
    category: "Herbal",
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
