"use client";
import { useEffect, useState } from "react";
import { listShoes, pkr, type Shoe } from "@/lib/shoes";
import { useCart } from "@/lib/cart";
import ShoeCard from "@/components/ShoeCard";
import ShoeImage from "@/components/ShoeImage";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [q, setQ] = useState("");
  const { add } = useCart();
  useEffect(() => { listShoes().then(setShoes); }, []);

  const available = shoes.filter((s) => !s.sold);
  const featured = available[0];
  const top = available.slice(0, 4);
  const filtered = shoes.filter((s) => `${s.brand} ${s.name} ${s.size}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <main>
      <section className="relative hero flex items-end lg:h-120">
        <div className="max-w-190 text-white">
          <h1>pre-loved.<br />re-walked.</h1>
          <p>one-of-one thrifted sneakers from karachi to khyber. cleaned, inspected, ready to go.</p>
        </div>
        <div className="absolute bottom-0 right-0 opacity-70 max-w-70 sm:max-w-80 md:max-w-100 lg:max-w-120 w-full h-full pointer-events-none ">
          <Image src="/assets/hero-bg.png" alt="pre-loved sneakers" fill className="hero-img" />
        </div>
        {/* <Image src="/assets/hero-bg.png" alt="pre-loved sneakers" width={600} height={400} className="hero-img" /> */}
        {/* {featured && (
          <div className="float-card">
            <div className="thumb"><ShoeImage src={featured.image} alt={featured.name} /></div>
            <div><h3>{featured.brand} {featured.name}</h3><p className="mono ash">by {featured.brand}</p><p className="mono"><b>{pkr(featured.price)}</b></p></div>
            <button className="btn btn-dark" onClick={() => add(featured)}>shop {featured.name}</button>
          </div>
        )} */}
      </section>

      <section className="rail">
        <div className="sec-head"><h2>Just in</h2></div>
        <div className="flex w-full flex-wrap justify-center md:justify-normal gap-px">{top.map((s, i) => <ProductCard key={s.id} shoe={s} rank={i + 1} />)}</div>
      </section>

      <section className="rail" id="shop">
        <div className="sec-head">
          <h2>all pairs</h2>
          <input placeholder="search brand, name, size…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="grid">{filtered.map((s) => <ShoeCard key={s.id} shoe={s} />)}</div>
        {!filtered.length && <p className="ash">no pairs match.</p>}
      </section>

      <section className="ink-bar">
        <p className="mono ash">how it works</p>
        <div><span>1. pick your pairs</span><span>2. checkout on whatsapp</span><span>3. we confirm & deliver</span></div>
      </section>
      <footer className="rail foot mono ash">re/sole · thrifted shoes · pakistan</footer>
    </main>
  );
}
