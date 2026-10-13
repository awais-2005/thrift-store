"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listShoes, saveShoe, removeShoe, pkr, type Shoe } from "@/lib/shoes";

const blank = (): Shoe => ({ id: crypto.randomUUID(), brand: "", name: "", price: 0, size: "", condition: "good", image: "", sold: false, createdAt: Date.now() });

export default function Admin() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [form, setForm] = useState<Shoe>(blank());
  const r = useRouter();
  const load = () => listShoes().then(setShoes);
  useEffect(() => { load(); }, []);

  const set = <K extends keyof Shoe>(k: K, v: Shoe[K]) => setForm((f) => ({ ...f, [k]: v }));
  const submit = async (e: React.FormEvent) => { e.preventDefault(); await saveShoe(form); setForm(blank()); load(); };
  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); r.push("/admin/login"); };

  return (
    <main className="rail">
      <div className="sec-head"><h2>manage pairs</h2><button className="btn btn-line" onClick={logout}>log out</button></div>
      <form onSubmit={submit} className="admin-form">
        <input required placeholder="brand" value={form.brand} onChange={(e) => set("brand", e.target.value)} />
        <input required placeholder="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
        <input required type="number" min={0} placeholder="price (pkr)" value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))} />
        <input required placeholder="size e.g. EU 42" value={form.size} onChange={(e) => set("size", e.target.value)} />
        <select value={form.condition} onChange={(e) => set("condition", e.target.value as Shoe["condition"])}>
          <option>like new</option><option>good</option><option>fair</option>
        </select>
        <input placeholder="image url (r2 upload later)" value={form.image} onChange={(e) => set("image", e.target.value)} />
        <label className="check"><input type="checkbox" checked={form.sold} onChange={(e) => set("sold", e.target.checked)} /> sold out</label>
        <button className="btn btn-dark">{shoes.some((s) => s.id === form.id) ? "update pair" : "add pair"}</button>
      </form>
      <div className="rows">
        {shoes.map((s) => (
          <div key={s.id} className="row">
            <div style={{ flex: 1 }}><h3>{s.brand} {s.name}</h3><p className="mono ash">{s.size} · {s.condition} · {pkr(s.price)}{s.sold ? " · sold" : ""}</p></div>
            <button className="btn btn-line" onClick={() => { setForm(s); window.scrollTo({ top: 0, behavior: "smooth" }); }}>edit</button>
            <button className="btn btn-line" onClick={async () => { if (confirm("delete this pair?")) { await removeShoe(s.id); load(); } }}>delete</button>
          </div>
        ))}
      </div>
    </main>
  );
}
