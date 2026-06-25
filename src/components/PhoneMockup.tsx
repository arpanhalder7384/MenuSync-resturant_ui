"use client";

import React from "react";
import { useTranslation } from "@/lib/translations";

export default function PhoneMockup() {
  const { language } = useTranslation();
  return (
    <div className="relative w-64 h-[490px] bg-stone-900 rounded-[38px] p-2.5 border-4 border-stone-950 shadow-2xl overflow-hidden flex flex-col select-none transform rotate-1 hover:rotate-0 transition-transform duration-500">
      
      {/* Speaker notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-4 bg-stone-950 rounded-full z-20 flex items-center justify-center">
        <span className="w-1.5 h-1.5 bg-stone-850 rounded-full block" />
      </div>

      {/* Inside phone Screen Mock layout */}
      <div className="flex-1 bg-[#fbfaf8] rounded-[28px] overflow-hidden flex flex-col p-3 pt-6 relative border border-stone-950">
        {/* Header preview */}
        <div className="flex items-center justify-between border-b border-stone-150 pb-2 mb-2">
          <div>
            <span className="text-[7px] font-bold text-orange-600 uppercase tracking-widest block">
              {language === "en" ? "Welcome to" : "স্বাগতম"}
            </span>
            <span className="text-[10px] font-black text-stone-900">
              {language === "en" ? "Cafe Adda" : "ক্যাফে আড্ডা"}
            </span>
          </div>
          <span className="text-[8px] font-black bg-stone-900 text-white px-2 py-0.5 rounded">
            {language === "en" ? "T-01" : "টেবিল ০১"}
          </span>
        </div>

        {/* Categories Nav tabs mock */}
        <div className="flex gap-1.5 overflow-x-hidden mb-3.5 border-b border-stone-100 pb-1.5 text-[8px] font-black text-stone-400">
          <span className="text-orange-600 border-b border-orange-600 pb-0.5">
            {language === "en" ? "FULL MENU" : "সম্পূর্ণ মেনু"}
          </span>
          <span>{language === "en" ? "STARTERS" : "স্টার্টার্স"}</span>
          <span>{language === "en" ? "BEVERAGES" : "পানীয়"}</span>
        </div>

        {/* Card Mock */}
        <div className="p-2 bg-white rounded-xl border border-stone-200/50 flex gap-2 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="w-3 h-3 border border-green-600 p-[1px] flex items-center justify-center rounded-[2px] mb-1">
                <span className="w-1 h-1 bg-green-600 rounded-full block" />
              </div>
              <h4 className="text-[9px] font-extrabold text-stone-900 leading-tight">
                {language === "en" ? "Chilli Baby Corn" : "চিলি বেবি কর্ন"}
              </h4>
              <p className="text-[7px] text-stone-400 leading-normal line-clamp-1 mt-0.5">
                {language === "en" ? "Crispy corn tossed with spices." : "মচমচে ভুট্টা মশলা দিয়ে ভাজা।"}
              </p>
            </div>
            <span className="text-[9px] font-black text-stone-900 mt-1">
              {language === "en" ? "₹150" : "টাকা ১৫০"}
            </span>
          </div>
          <div className="relative w-12 h-12 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=100&q=80" 
              alt="Chilli Baby Corn" 
              className="w-full h-full object-cover rounded-lg bg-stone-100" 
            />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-white border border-stone-200 px-2 py-0.5 rounded text-[7px] font-bold text-orange-600 shadow-sm whitespace-nowrap">
              + {language === "en" ? "ADD" : "যোগ করুন"}
            </div>
          </div>
        </div>

        {/* Surprise me layout mock */}
        <div className="absolute bottom-12 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-orange-200 animate-bounce">
          <span className="text-xs">🎡</span>
        </div>

        {/* Bottom Order Bar Mock */}
        <div className="absolute bottom-2 inset-x-2 bg-stone-900 text-white p-2 rounded-xl flex items-center justify-between text-[8px] font-black">
          <div className="flex flex-col">
            <span className="text-orange-500 uppercase tracking-widest text-[6px]">
              {language === "en" ? "1 Item" : "১টি আইটেম"}
            </span>
            <span>{language === "en" ? "Total: ₹150" : "মোট: ১৫০ টাকা"}</span>
          </div>
          <span className="px-2.5 py-1 bg-orange-600 text-white font-black rounded-lg uppercase tracking-wider">
            {language === "en" ? "Place Order →" : "অর্ডার দিন →"}
          </span>
        </div>

      </div>
    </div>
  );
}
