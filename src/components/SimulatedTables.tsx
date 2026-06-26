"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/translations";
import { generateRestaurantCode, generateTableCode } from "@/utils/crypto";

export default function SimulatedTables() {
  const { language, t } = useTranslation();
  return (
    <section id="demo-section" className="py-12 scroll-mt-20 relative">
      
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-orange-100/10 blur-3xl pointer-events-none -z-10" />

      <div className="text-center mb-12 flex flex-col gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 mx-auto bg-orange-50 border border-orange-200/50 rounded-full text-orange-700 text-[10px] font-black uppercase tracking-wider">
          <span>⚡</span>
          <span>Live Demo Simulator</span>
        </span>
        <h2 className="text-2xl md:text-3xl font-black text-stone-900 mt-2">
          {t("scan_demo")}
        </h2>
        <p className="text-xs md:text-sm text-stone-500 max-w-lg mx-auto leading-relaxed">
          {t("scan_demo_desc")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
        
        {/* Cafe Adda Table 01 */}
        <Link
          href={`/menu/${generateRestaurantCode("+917074266873")}?table=${generateTableCode("+917074266873", "01")}`}
          className="relative flex flex-col justify-between p-6 bg-gradient-to-br from-white to-stone-50/10 border border-stone-200/60 border-t-4 border-t-orange-500 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(234,88,12,0.1)] hover:border-orange-500/30 transition-all transform hover:-translate-y-1.5 group overflow-hidden"
        >
          {/* Decorative Top-Right Brass Table Badge */}
          <div className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-end justify-start p-3 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-md">
            <span className="text-[9px] font-black text-white tracking-tight">T-01</span>
          </div>

          <div className="pr-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider bg-orange-50 border border-orange-200/50 text-orange-700 rounded-md">
                {language === "en" ? "CAFE ADDA" : "ক্যাফে আড্ডা"}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            
            <h3 className="text-base font-black text-stone-900 group-hover:text-orange-600 transition-colors tracking-tight">
              {language === "en" ? "Cafe Adda" : "ক্যাফে আড্ডা"}
            </h3>
            
            <p className="text-xs text-stone-450 mt-2 leading-relaxed font-extrabold">
              {language === "en" ? "Table 01 — QR Hash Scan" : "টেবিল ০১ — কিউআর হ্যাশ স্ক্যান"}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-[11px] font-black text-orange-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
              {language === "en" ? "Simulate Scan" : "স্ক্যান সিমুলেট করুন"}
            </span>
            <span className="text-stone-300 group-hover:text-orange-500 transition-colors font-black text-sm">→</span>
          </div>
        </Link>

        {/* Cafe Harbour Table 03 */}
        <Link
          href={`/menu/${generateRestaurantCode("+916294267705")}?table=${generateTableCode("+916294267705", "03")}`}
          className="relative flex flex-col justify-between p-6 bg-gradient-to-br from-white to-stone-50/10 border border-stone-200/60 border-t-4 border-t-amber-500 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all transform hover:-translate-y-1.5 group overflow-hidden"
        >
          {/* Decorative Top-Right Brass Table Badge */}
          <div className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-end justify-start p-3 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-md">
            <span className="text-[9px] font-black text-white tracking-tight">T-03</span>
          </div>

          <div className="pr-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider bg-amber-50 border border-amber-200/50 text-amber-700 rounded-md">
                {language === "en" ? "CAFE HARBOUR" : "ক্যাফে হারবার"}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            
            <h3 className="text-base font-black text-stone-900 group-hover:text-amber-600 transition-colors tracking-tight">
              {language === "en" ? "Cafe Harbour" : "ক্যাফে হারবার"}
            </h3>
            
            <p className="text-xs text-stone-450 mt-2 leading-relaxed font-extrabold">
              {language === "en" ? "Table 03 — QR Hash Scan" : "টেবিল ০৩ — কিউআর হ্যাশ স্ক্যান"}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-[11px] font-black text-amber-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
              {language === "en" ? "Simulate Scan" : "স্ক্যান সিমুলেট করুন"}
            </span>
            <span className="text-stone-300 group-hover:text-amber-500 transition-colors font-black text-sm">→</span>
          </div>
        </Link>

        {/* Spice Garden Table 04 */}
        <Link
          href={`/menu/${generateRestaurantCode("+917384190892")}?table=${generateTableCode("+917384190892", "04")}`}
          className="relative flex flex-col justify-between p-6 bg-gradient-to-br from-white to-stone-50/10 border border-stone-200/60 border-t-4 border-t-amber-500 rounded-3xl shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.1)] hover:border-amber-500/30 transition-all transform hover:-translate-y-1.5 group overflow-hidden"
        >
          {/* Decorative Top-Right Brass Table Badge */}
          <div className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-end justify-start p-3 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 shadow-md">
            <span className="text-[9px] font-black text-white tracking-tight">T-04</span>
          </div>

          <div className="pr-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider bg-amber-50 border border-amber-200/50 text-amber-800 rounded-md">
                {language === "en" ? "SPICE GARDEN" : "স্পাইস গার্ডেন"}
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            
            <h3 className="text-base font-black text-stone-900 group-hover:text-amber-500 transition-colors tracking-tight">
              {language === "en" ? "Spice Garden" : "স্পাইস গার্ডেন"}
            </h3>
            
            <p className="text-xs text-stone-450 mt-2 leading-relaxed font-extrabold">
              {language === "en" ? "Table 04 — QR Hash Scan" : "টেবিল ০৪ — কিউআর হ্যাশ স্ক্যান"}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-[11px] font-black text-orange-600 inline-flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider">
              {language === "en" ? "Simulate Scan" : "স্ক্যান সিমুলেট করুন"}
            </span>
            <span className="text-stone-300 group-hover:text-orange-500 transition-colors font-black text-sm">→</span>
          </div>
        </Link>

      </div>
    </section>
  );
}
