"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [pw, setPw] = useState(""); const [err, setErr] = useState(false); const r = useRouter();
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    if (res.ok) r.push("/admin"); else setErr(true);
  };
  return (
    <main className="rail narrow">
      <h2>admin</h2>
      <form onSubmit={submit} className="stack">
        <input type="password" placeholder="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
        {err && <p className="ash">wrong password.</p>}
        <button className="btn btn-dark">sign in</button>
      </form>
    </main>
  );
}
