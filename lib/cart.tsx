"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { pkr, type Shoe } from "./shoes";

type Ctx = { items: Shoe[]; open: boolean; setOpen: (b: boolean) => void; add: (s: Shoe) => void; remove: (id: string) => void; checkout: () => void };
const C = createContext<Ctx>(null!);
export const useCart = () => useContext(C);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Shoe[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { try { setItems(JSON.parse(localStorage.getItem("cart") || "[]")); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(items)); }, [items, ready]);

  // every pair is one-of-one, so no quantities
  const add = (s: Shoe) => { setItems((p) => (p.some((x) => x.id === s.id) ? p : [...p, s])); setOpen(true); };
  const remove = (id: string) => setItems((p) => p.filter((x) => x.id !== id));
  const checkout = () => {
    const lines = items.map((s, i) => `${i + 1}. ${s.brand} ${s.name} — ${s.size} — ${pkr(s.price)}`);
    const total = items.reduce((a, s) => a + s.price, 0);
    const msg = `Salam! I'd like to order these pairs:\n\n${lines.join("\n")}\n\nTotal: ${pkr(total)}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
  };
  return <C.Provider value={{ items, open, setOpen, add, remove, checkout }}>{children}</C.Provider>;
}
