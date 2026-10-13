# re/sole — thrifted shoes store (Next.js + TS)
1. `npm i`  2. `cp .env.example .env.local` and fill in  3. `npm run dev`
- Public site: `/` · Admin: `/admin` (password from `.env.local`)
- Data lives in `lib/shoes.ts` (localStorage placeholder). Swap `listShoes/saveShoe/removeShoe` for Worker + D1 calls later; image URLs will come from R2.
- Checkout opens WhatsApp using `NEXT_PUBLIC_WHATSAPP` (country code, no +).
