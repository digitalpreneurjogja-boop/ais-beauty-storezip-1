import { Link } from "wouter";
import { Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/products";
import { useCheckout } from "@/lib/checkout-context";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { openCheckout } = useCheckout();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      data-testid={`card-product-${product.id}`}
    >
      <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-400 group overflow-hidden bg-white/60 backdrop-blur-sm">
        <Link href={`/produk/${product.slug}`} data-testid={`link-product-${product.slug}`}>
          <div className={`relative aspect-square flex items-center justify-center p-8 ${product.color} overflow-hidden cursor-pointer`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 z-10 relative"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
          </div>
        </Link>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
            <span className="text-xs text-muted-foreground ml-1">5.0 (1250+)</span>
          </div>
          <div>
            <h3 className="text-xl font-serif font-semibold mb-1">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.tagline}</p>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{product.desc}</p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
            <span className="text-lg font-bold text-foreground">{product.price}</span>
            <Button
              size="sm"
              onClick={() => openCheckout(product)}
              className="rounded-full bg-primary hover:bg-primary/90 text-white text-xs px-4 gap-1.5"
              data-testid={`button-buy-${product.slug}`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Beli Sekarang
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
