"use client";
import { useCart } from "@/lib/cart";
import { pkr } from "@/lib/shoes";
import ShoeImage from "./ShoeImage";
import Image from "next/image";

export default function Header() {
  const { items, open, setOpen, remove, checkout } = useCart();
  const total = items.reduce((a, s) => a + s.price, 0);
  return (
    <>
      <div className="announce">free delivery over rs 10,000 · every pair cleaned & inspected</div>
      <header className="nav">
        <Image src="/assets/rekickz-logo.png" alt="ReKickz" height={40} width={120} />
        <button className="btn btn-line" onClick={() => setOpen(true)}>bag ({items.length})</button>
      </header>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="drawer-head"><h3>your bag</h3><button className="btn btn-line" onClick={() => setOpen(false)}>close</button></div>
        <div className="drawer-body">
          {items.length === 0 && <p className="ash">nothing here yet.</p>}
          {items.map((s) => (
            <div key={s.id} className="line">
              <div className="thumb"><ShoeImage src={s.image} alt={s.name} /></div>
              <div style={{ flex: 1 }}><h3>{s.brand} {s.name}</h3><p className="mono ash">{s.size} · {pkr(s.price)}</p></div>
              <button className="link" onClick={() => remove(s.id)}>remove</button>
            </div>
          ))}
        </div>
        <div className="drawer-foot">
          <p className="mono"><span>total</span> <b>{pkr(total)}</b></p>
          <button className="btn btn-dark" disabled={!items.length} onClick={checkout}>checkout on whatsapp</button>
        </div>
      </aside>
    </>
  );
}
