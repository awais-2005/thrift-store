export type Shoe = {
  id: string; brand: string; name: string; price: number; size: string;
  condition: "like new" | "good" | "fair"; image?: string; sold: boolean; createdAt: number;
};

export const pkr = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

/* ---- Data layer ----
 * localStorage placeholder. When the Cloudflare Worker + D1 + R2 backend is ready,
 * replace ONLY the bodies of these 3 functions with fetch() calls; the UI won't change. */
const KEY = "shoes-v1";
const day = 86400000;
const seed = (): Shoe[] => [
  { id: "1", brand: "nike", name: "air max 90", price: 7500, size: "EU 42", condition: "like new", sold: false, createdAt: Date.now() - day, image: "/assets/shoe1.png" },
  { id: "2", brand: "adidas", name: "samba og", price: 6800, size: "EU 41", condition: "good", sold: false, createdAt: Date.now() - 2 * day, image: "/assets/shoe2.png" },
  { id: "3", brand: "new balance", name: "530", price: 8200, size: "EU 43", condition: "like new", sold: false, createdAt: Date.now() - 3 * day, image: "/assets/shoe3.png" },
  { id: "4", brand: "converse", name: "chuck 70 high", price: 4500, size: "EU 40", condition: "fair", sold: false, createdAt: Date.now() - 4 * day, image: "/assets/shoe4.png" },
  { id: "5", brand: "puma", name: "suede classic", price: 5200, size: "EU 44", condition: "good", sold: true, createdAt: Date.now() - 12 * day, image: "/assets/shoe5.png" },
  { id: "6", brand: "vans", name: "old skool", price: 4900, size: "EU 42", condition: "good", sold: false, createdAt: Date.now() - 15 * day, image: "/assets/shoe6.png" },
];
const read = (): Shoe[] => {
  // const raw = localStorage.getItem(KEY);
  // if (raw) return JSON.parse(raw);
  const s = seed(); localStorage.setItem(KEY, JSON.stringify(s)); return s;
};
const write = (s: Shoe[]) => localStorage.setItem(KEY, JSON.stringify(s));

export const listShoes = async (): Promise<Shoe[]> => read().sort((a, b) => b.createdAt - a.createdAt);
export const saveShoe = async (shoe: Shoe) => {
  const all = read(); const i = all.findIndex((s) => s.id === shoe.id);
  if (i >= 0) all[i] = shoe; else all.push(shoe);
  write(all);
};
export const removeShoe = async (id: string) => write(read().filter((s) => s.id !== id));
