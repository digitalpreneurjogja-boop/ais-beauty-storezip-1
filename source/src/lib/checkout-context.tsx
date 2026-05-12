import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/lib/products";

interface CheckoutContextValue {
  open: boolean;
  selectedProduct: Product | null;
  openCheckout: (product?: Product) => void;
  closeCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextValue>({
  open: false,
  selectedProduct: null,
  openCheckout: () => {},
  closeCheckout: () => {},
});

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openCheckout = (product?: Product) => {
    if (product) setSelectedProduct(product);
    setOpen(true);
  };

  const closeCheckout = () => {
    setOpen(false);
  };

  return (
    <CheckoutContext.Provider value={{ open, selectedProduct, openCheckout, closeCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  return useContext(CheckoutContext);
}
