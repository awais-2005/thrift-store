
import { Shoe } from "@/lib/shoes";
import React from "react";

export default function ProductCard({ shoe, rank }: { shoe: Shoe; rank?: number }) {
    return (
        <div className="relative flex max-w-75 md:max-w-73 w-full flex-col overflow-hidden bg-[#c9c9c9] font-sans text-black">
            {/* Product image area */}
            <div className="relative h-55 overflow-hidden bg-[#c9c9c9]">
                {/* Oversized background number */}
                <span className="absolute left-2 -top-5 select-none text-[180px] italic font-black leading-none tracking-[-18px] text-white/50">
                    {rank || 1}
                </span>

                {/* Sold out badge */}
                <span className="absolute right-3 top-3 z-10 rounded-sm bg-[#858993] px-3 py-1 text-[10px] font-medium text-white">
                    Sold Out
                </span>

                {/* Shoe image: place airmax-shoe.png in your public folder */}
                <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="absolute left-[5%] top-5 z-20 w-[90%] h-auto object-cover"
                />
            </div>

            {/* Product information */}
            <div className="flex min-h-24 items-start gap-3 bg-[#c9c9c9] px-3 pb-4 pt-3">
                {/* Nike-style icon tile */}
                <div className="flex h-17 w-17 shrink-0 items-center justify-center rounded-[10px] bg-black">
                    <svg
                        viewBox="0 0 48 32"
                        className="w-9"
                        fill="white"
                        aria-label={`Nike-style swoosh for ${shoe.name}`}
                    >
                        <path d="M3 22 L3 27 Q5 31 12 28 L44 12 L15 23 Q7 26 7 20 L7 15 Z" />
                    </svg>
                </div>

                <div className="min-w-0 pt-1 text-[11px] leading-normal">
                    <h2 className="font-extrabold tracking-tight">
                        {shoe.name}
                    </h2>
                    <p className="text-[10px] font-medium">by NIKE</p>
                    <p className="mt-0.5 font-semibold">£179.00</p>
                </div>
            </div>
        </div>
    );
}
