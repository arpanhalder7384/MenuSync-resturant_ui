"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/translations";
import { getQRMapping, getRestaurant } from "@/lib/dataService";
import LanguageSelector from "@/components/LanguageSelector";
import BrandLogo from "@/components/BrandLogo";

export default function ConfirmPageClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { cart, totalPrice, clearCart, updateQuantity } = useCart();
  const { language, t } = useTranslation();

  const [customerName, setCustomerName] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  const hashCode = typeof params?.hashCode === "string" ? params.hashCode : "";
  const tableCode = searchParams.get("table") || "";
  const mapping = getQRMapping(hashCode, tableCode);
  const tableQuery = tableCode ? `?table=${tableCode}` : "";

  if (!mapping) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-100 font-sans">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 max-w-md shadow-sm">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="text-lg font-black text-stone-900 mb-2">
            {t("not_found")}
          </h2>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-full transition-all mt-4 uppercase tracking-wider shadow-sm"
          >
            {t("go_home")}
          </Link>
        </div>
      </div>
    );
  }

  const restaurant = getRestaurant(mapping.restaurantId);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-100 font-sans">
        <div className="bg-white p-8 rounded-3xl border border-stone-200 max-w-md shadow-sm">
          <span className="text-4xl mb-4 block">⚠️</span>
          <h2 className="text-lg font-black text-stone-900 mb-2">
            {t("not_found")}
          </h2>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black rounded-full transition-all mt-4 uppercase tracking-wider shadow-sm"
          >
            {t("go_home")}
          </Link>
        </div>
      </div>
    );
  }

  const theme = {
    REST001: {
      gradient: "from-orange-500 to-red-600",
      text: "text-orange-600",
      border: "border-t-orange-500 border-orange-200/50",
      bg: "bg-orange-50",
      focusRing: "focus:ring-orange-500/20",
      hoverGradient: "hover:from-orange-600 hover:to-red-700",
      badgeText: "text-orange-700",
      glow: "shadow-[0_4px_16px_rgba(234,88,12,0.2)]",
    },
    REST002: {
      gradient: "from-amber-500 to-yellow-600",
      text: "text-amber-600",
      border: "border-t-amber-500 border-amber-200/50",
      bg: "bg-amber-50",
      focusRing: "focus:ring-amber-500/20",
      hoverGradient: "hover:from-amber-600 hover:to-yellow-700",
      badgeText: "text-amber-800",
      glow: "shadow-[0_4px_16px_rgba(245,158,11,0.2)]",
    },
    REST003: {
      gradient: "from-amber-500 to-orange-600",
      text: "text-amber-600",
      border: "border-t-amber-500 border-amber-200/50",
      bg: "bg-amber-50",
      focusRing: "focus:ring-amber-500/20",
      hoverGradient: "hover:from-amber-600 hover:to-orange-700",
      badgeText: "text-amber-700",
      glow: "shadow-[0_4px_16px_rgba(245,158,11,0.2)]",
    },
  }[restaurant.id] || {
    gradient: "from-orange-500 to-red-600",
    text: "text-orange-600",
    border: "border-t-orange-500 border-orange-200/50",
    bg: "bg-orange-50",
    focusRing: "focus:ring-orange-500/20",
    hoverGradient: "hover:from-orange-600 hover:to-red-700",
    badgeText: "text-orange-700",
    glow: "shadow-[0_4px_16px_rgba(234,88,12,0.2)]",
  };

  const handleConfirmOrder = () => {
    // Format individual item lines
    const itemsList = cart
      .map(
        (i) =>
          `• x${i.quantity} ${
            language === "en" ? i.item.nameEn : i.item.nameBn
          } (₹${i.item.price * i.quantity})`
      )
      .join("\n\n");

    // Construct customizable fields text
    const nameSection = customerName.trim()
      ? `Customer Name: ${customerName.trim()}\n`
      : "";

    // Standardized Order Template
    const messageText = `🍽 NEW ORDER - TABLE ${mapping.tableNumber}
Restaurant: ${language === "en" ? restaurant.nameEn : restaurant.nameBn}

-------------------------

${itemsList}

-------------------------

Total Bill: ₹${totalPrice.toFixed(2)}

${nameSection}Table ${mapping.tableNumber}`;

    // Clean phone number (remove +, spaces, hyphens)
    const cleanPhone = restaurant.whatsappNumber.replace(/\D/g, "");
    
    // Construct WhatsApp Link
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;
    
    // Open in a new window/tab
    window.open(waUrl, "_blank");

    // Clear cart and switch to successful state
    setIsOrdered(true);
    clearCart();
  };

  const restaurantName = language === "en" ? restaurant.nameEn : restaurant.nameBn;

  // Format table digits for Bengali language if active
  const formatTableNumber = (table: string) => {
    if (language === "en") return table;
    const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return table
      .split("")
      .map((char) => {
        const digit = parseInt(char);
        return isNaN(digit) ? char : bengaliDigits[digit];
      })
      .join("");
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
        {/* Header bar */}
        <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/40">
          <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <BrandLogo />
            </div>
            <LanguageSelector />
          </div>
        </header>

        {/* Success Banner Wrapper */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
          <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-xl flex flex-col items-center gap-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center border border-green-200">
              <span className="text-3xl text-green-500 animate-bounce">✓</span>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-black text-stone-900 leading-tight">
                {language === "en" ? "Redirecting to WhatsApp!" : "হোয়াটসঅ্যাপে পাঠানো হচ্ছে!"}
              </h2>
              <p className="text-xs md:text-sm text-stone-500 leading-relaxed">
                {language === "en"
                  ? "We've compiled your order receipt and opened WhatsApp. Click 'Send' in the WhatsApp chat to submit it directly to the restaurant owner!"
                  : "আমরা আপনার অর্ডারের বিলটি তৈরি করেছি এবং হোয়াটসঅ্যাপ চ্যাটটি খুলেছি। সরাসরি রেস্তোরাঁ মালিকের কাছে পাঠাতে হোয়াটসঅ্যাপে 'Send' বাটনে ক্লিক করুন!"}
              </p>
            </div>
            
            <Link
              href={`/menu/${hashCode}${tableQuery}`}
              className={`w-full py-3.5 bg-gradient-to-r ${theme.gradient} text-white text-xs font-black rounded-xl uppercase tracking-wider text-center transition-all ${theme.glow}`}
            >
              {t("back_to_menu")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans relative overflow-x-hidden pb-12">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-orange-200/10 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] rounded-full bg-amber-200/10 blur-3xl -z-10 pointer-events-none" />

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/40">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍽️</span>
            <BrandLogo />
          </div>
          <LanguageSelector />
        </div>
      </header>

      {/* Main Grid Wrapper */}
      <main className="max-w-3xl w-full mx-auto px-4 py-8 flex-1 flex flex-col gap-6">
        
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href={`/menu/${hashCode}${tableQuery}`}
            className="inline-flex items-center gap-1 text-xs font-black text-stone-500 hover:text-stone-800 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <span>←</span>
            <span>{t("back_to_menu")}</span>
          </Link>
          
          <div className={`px-3 py-1 bg-stone-200/50 border border-stone-300/40 text-[10px] md:text-[11px] font-black rounded-lg uppercase tracking-wide text-stone-600`}>
            {t("restaurant_label")}: <span className="text-stone-900 font-extrabold">{restaurantName}</span>
          </div>
        </div>

        {/* Confirmation Layout Container */}
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-stone-200/60 shadow-sm flex flex-col items-center justify-center text-center py-16 gap-4">
            <span className="text-4xl">🛒</span>
            <p className="text-sm font-black text-stone-500 max-w-xs leading-relaxed">
              {t("empty_confirm_cart")}
            </p>
            <Link
              href={`/menu/${hashCode}${tableQuery}`}
              className={`px-6 py-2.5 bg-gradient-to-r ${theme.gradient} text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm transition-all`}
            >
              {t("back_to_menu")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left/Main Column: Form inputs and Review summary (8 cols on desktop) */}
            <div className="md:col-span-7 flex flex-col gap-6">
              
              {/* Receipt Review Card */}
              <div className={`bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-md border-t-4 ${theme.border}`}>
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                  <h2 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🧾</span>
                    <span>{t("order_summary")}</span>
                  </h2>
                  <span className={`px-2 py-0.5 text-[10px] font-black rounded-md ${theme.bg} ${theme.badgeText} border border-orange-200/30 uppercase tracking-wider`}>
                    {t("table_label")} {formatTableNumber(mapping.tableNumber)}
                  </span>
                </div>

                {/* Items loop */}
                <div className="p-6 divide-y divide-stone-100 space-y-3.5">
                  {cart.map(({ item, quantity }, index) => {
                    const itemName = language === "en" ? item.nameEn : item.nameBn;
                    return (
                      <div key={item.id} className={`flex items-center justify-between gap-4 ${index > 0 ? "pt-3.5" : ""}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className={`flex-shrink-0 w-2.5 h-2.5 border rounded p-[1.5px] ${
                              item.isVeg ? "border-green-600" : "border-red-600"
                            }`}
                          >
                            <span
                              className={`w-full h-full rounded-full block ${
                                item.isVeg ? "bg-green-600" : "bg-red-600"
                              }`}
                            />
                          </span>
                          <div className="truncate">
                            <h4 className="text-xs font-black text-stone-850 leading-tight truncate max-w-[120px] sm:max-w-xs">
                              {itemName}
                            </h4>
                            <span className="text-[10px] text-stone-400 font-bold">
                              {t("currency")}{item.price}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3.5 flex-shrink-0">
                          <div className="flex items-center bg-stone-100 rounded-lg overflow-hidden border border-stone-200/50">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className={`px-2 py-0.5 text-xs font-black ${theme.text} hover:bg-stone-200/60 transition-colors cursor-pointer`}
                            >
                              −
                            </button>
                            <span className="px-1 text-[11px] font-black text-stone-900">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className={`px-2 py-0.5 text-xs font-black ${theme.text} hover:bg-stone-200/60 transition-colors cursor-pointer`}
                            >
                              +
                            </button>
                          </div>
                          <span className="w-12 text-right text-xs font-black text-stone-900">
                            {t("currency")}{item.price * quantity}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total receipt summary footer */}
                <div className="bg-stone-50 p-6 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-black text-stone-500 uppercase tracking-wider">
                    {t("total_bill_label")}
                  </span>
                  <span className={`text-base font-black ${theme.text}`}>
                    {t("currency")}{totalPrice}
                  </span>
                </div>
              </div>

            </div>

            {/* Right/Sidebar Column: Checkout Details Form (5 cols on desktop) */}
            <div className="md:col-span-5 sticky top-24 flex flex-col gap-4">
              <div className="bg-white p-6 rounded-3xl border border-stone-200/60 shadow-md flex flex-col gap-5">
                
                {/* Personal Name Input */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="customer-name" className="text-[11px] font-black text-stone-500 uppercase tracking-wider text-left">
                    {t("cust_name_label")}
                  </label>
                  <input
                    id="customer-name"
                    type="text"
                    placeholder={t("cust_name_placeholder")}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className={`w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 ${theme.focusRing} focus:bg-white transition-all`}
                  />
                </div>

                <div className="border-t border-stone-100 my-1" />

                <button
                  onClick={handleConfirmOrder}
                  className={`w-full py-4 bg-gradient-to-r ${theme.gradient} ${theme.hoverGradient} text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 ${theme.glow}`}
                >
                  <span>💬</span>
                  <span>{t("place_order_btn")}</span>
                </button>
              </div>

              {/* Secure order indicator */}
              <div className="text-center flex items-center justify-center gap-1.5 text-[9.5px] font-bold text-stone-400 uppercase tracking-wider">
                <span>🛡️</span>
                <span>Direct Table Connection • Secure Transmission</span>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
