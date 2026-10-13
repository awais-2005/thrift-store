import Image from "next/image";

// Real photo if provided (R2 URL later), otherwise a monochrome shoe-silhouette placeholder.
export default function ShoeImage({ src, alt, dark }: { src?: string; alt: string; dark?: boolean }) {
  if (src) return <Image src={src} alt={alt} fill style={{ objectFit: "contain" }} />;
  return (
    <svg viewBox="0 0 200 120" className="shoe-img" role="img" aria-label={alt}>
      <path d="M12 86c0-10 4-14 12-16l30-10 12-26c2-4 8-5 11-2l16 18c6 7 14 11 24 13l50 10c10 2 21 8 21 24v4c0 5-4 8-8 8H20c-5 0-8-4-8-9z" fill={dark ? "#3b3b3b" : "#d7d7d7"} />
      <path d="M12 94h176" stroke={dark ? "#737780" : "#a1a4aa"} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
