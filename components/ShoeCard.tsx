"use client";
import { pkr, type Shoe } from "@/lib/shoes";
import { useCart } from "@/lib/cart";
import ShoeImage from "./ShoeImage";

export default function ShoeCard({ shoe, rank }: { shoe: Shoe; rank?: number }) {
  const { add, items } = useCart();
  const inBag = items.some((i) => i.id === shoe.id);
  const isNew = Date.now() - shoe.createdAt < 7 * 86400000;
  return (
    <article className="card">
      {rank && <span className="rank">{rank}</span>}
      {shoe.sold ? <span className="badge sold">Sold out</span> : isNew ? <span className="badge new">New in</span> : null}
      <div className="card-img"><ShoeImage src={shoe.image} alt={`${shoe.brand} ${shoe.name}`} /></div>
      <div className="card-meta">
        <div className="logo">{shoe.brand[0]}</div>
        <div>
          <h3>{shoe.name}</h3>
          <p className="mono ash">by {shoe.brand} · {shoe.size} · {shoe.condition}</p>
          <p className="mono">{pkr(shoe.price)}</p>
        </div>
      </div>
    </article>
  );
}
