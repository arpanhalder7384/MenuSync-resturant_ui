"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MenuItem } from "@/lib/mockData";
import { useTranslation } from "@/lib/translations";
import { useCart } from "@/lib/cart";
import LanguageSelector from "@/components/LanguageSelector";
import FoodCard from "@/components/FoodCard";
import FoodSpinner from "@/components/FoodSpinner";
import FoodDetailModal from "@/components/FoodDetailModal";
import WifiDetailModal from "@/components/WifiDetailModal";

interface MenuData {
  restaurantId: string;
  restaurantNameEn: string;
  restaurantNameBn: string;
  tableNumber: string;
  whatsappNumber: string;
  menu: MenuItem[];
  wifiDetails?: {
    ssid: string;
    password?: string;
  };
}

interface MenuFeedProps {
  data: MenuData;
}

export default function MenuFeed({ data }: MenuFeedProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Custom filter pills states
  const [selectedVegFilter, setSelectedVegFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [isChefRecommendedOnly, setIsChefRecommendedOnly] = useState<boolean>(false);
  
  const [isSpinnerOpen, setIsSpinnerOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<MenuItem | null>(null);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);

  const { language, t } = useTranslation();
  const { cart, totalItems, totalPrice, updateQuantity, clearCart } = useCart();
  const params = useParams();
  const router = useRouter();
  const hashCode = typeof params?.hashCode === "string" ? params.hashCode : "";

  // Helper to convert table numbers to Bengali digits
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

  const restaurantName =
    language === "en" ? data.restaurantNameEn : data.restaurantNameBn;

  // Extract categories
  const categories = ["All", ...Array.from(new Set(data.menu.map((i) => i.category)))];

  // Filters logic
  const filteredMenu = data.menu.filter((item) => {
    // Category filter
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    
    // Search query filter
    const name = language === "en" ? item.nameEn : item.nameBn;
    const desc = language === "en" ? item.descriptionEn : item.descriptionBn;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());

    // Veg filter
    let matchesVeg = true;
    if (selectedVegFilter === "veg") {
      matchesVeg = item.isVeg;
    } else if (selectedVegFilter === "non-veg") {
      matchesVeg = !item.isVeg;
    }

    // Chef recommended filter
    const matchesSpecial = !isChefRecommendedOnly || item.isSpecial;

    return matchesCategory && matchesSearch && matchesVeg && matchesSpecial;
  });

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return t("full_menu");
    const isCategoryKey = (key: string): key is "Starter" | "Main" | "Drink" | "Dessert" => {
      return ["Starter", "Main", "Drink", "Dessert"].includes(key);
    };
    return isCategoryKey(cat) ? t(cat).toUpperCase() : cat.toUpperCase();
  };

  const handlePlaceOrder = () => {
    router.push(`/menu/${hashCode}/confirm`);
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col pb-16">
      
      {/* Main Grid Wrapper: 3 Columns on Desktop, 1 Column on Mobile */}
      <div className="max-w-6xl w-full mx-auto px-4 py-6 md:py-10 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: The Restaurant & Menu Panel (Takes 2/3 width on desktop) */}
        <div className="lg:col-span-2 bg-white rounded-3xl overflow-hidden border border-stone-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col pb-12">
          
          {/* Top Banner (Cafe Harbor Style Hero Header) */}
          <div className="relative w-full h-56 md:h-64 flex flex-col justify-end p-5 text-white overflow-hidden">
            {/* Banner Background Image Layer (Preload & High Priority) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80"
              alt="Restaurant Banner"
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/10 to-transparent" />
            {/* Back navigation & Language Selector */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <Link
                href="/"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white hover:bg-black/60 transition-colors text-center"
              >
                ←
              </Link>
              <LanguageSelector />
            </div>

            {/* Cafe Info Overlay */}
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-2xl font-black tracking-wide drop-shadow-md">
                {t("welcome_to")} {restaurantName.toUpperCase()} | Contemporary Hangout
              </h2>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-black border border-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer">
                  <span>📍</span> {t("directions")}
                </button>
                {data.wifiDetails && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setIsWifiModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-black border border-white rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    <span>📶</span> {t("wifi")}
                  </button>
                )}
              </div>

              {/* Carousel dots indicators */}
              <div className="flex gap-1.5 mt-2">
                <span className="w-4 h-1 bg-white rounded-full" />
                <span className="w-1 h-1 bg-white/50 rounded-full" />
                <span className="w-1 h-1 bg-white/50 rounded-full" />
              </div>
            </div>
          </div>

          {/* Title & Tagline Section */}
          <div className="px-5 pt-6 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
                {restaurantName.toUpperCase()}
              </h1>
              <p className="text-[10px] font-black text-stone-400 tracking-widest uppercase mt-0.5">
                {language === "en" ? "ADDA • COFFEE • FRIENDSHIP" : "আড্ডা • কফি • বন্ধুত্ব"}
              </p>
            </div>

            {/* Search & Table Number Row */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 md:w-56">
                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-stone-100 border-none rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/10 placeholder-stone-400"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
                  🔍
                </span>
              </div>

              {/* Table Badge */}
              <div className="bg-orange-50 text-orange-700 border border-orange-200/50 px-4.5 py-2.5 text-xs font-black rounded-xl whitespace-nowrap shadow-xs">
                {t("table").toUpperCase()} {formatTableNumber(data.tableNumber)}
              </div>
            </div>
          </div>

          {/* Underlined Category Nav Tabs */}
          <div className="px-5 border-b border-stone-100">
            <div className="flex gap-6 overflow-x-auto no-scrollbar py-3 scroll-smooth">
              {categories.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`pb-2.5 text-xs font-black whitespace-nowrap tracking-wider transition-all cursor-pointer border-b-2 ${
                      isActive
                        ? "border-orange-600 text-orange-600 font-extrabold"
                        : "border-transparent text-stone-500 hover:text-stone-700"
                    }`}
                  >
                    {getCategoryLabel(category)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter pills block */}
          <div className="px-5 py-4 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
            {/* All Items Pill */}
            <button
              onClick={() => {
                setSelectedVegFilter("all");
                setIsChefRecommendedOnly(false);
              }}
              className={`px-4.5 py-2 text-[11px] font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                selectedVegFilter === "all" && !isChefRecommendedOnly
                  ? "bg-orange-600 border-orange-600 text-white shadow-sm shadow-orange-500/15"
                  : "bg-white border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-300"
              }`}
            >
              {t("all_items")}
            </button>

            {/* Vegetarian Pill */}
            <button
              onClick={() => {
                setSelectedVegFilter("veg");
                setIsChefRecommendedOnly(false);
              }}
              className={`flex items-center gap-1 px-4.5 py-2 text-[11px] font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                selectedVegFilter === "veg"
                  ? "bg-green-600 border-green-600 text-white shadow-sm shadow-green-500/15"
                  : "bg-white border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-300"
              }`}
            >
              <span>🌱</span>
              <span>{t("vegetarian")}</span>
            </button>

            {/* Non-Vegetarian Pill */}
            <button
              onClick={() => {
                setSelectedVegFilter("non-veg");
                setIsChefRecommendedOnly(false);
              }}
              className={`flex items-center gap-1 px-4.5 py-2 text-[11px] font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                selectedVegFilter === "non-veg"
                  ? "bg-red-600 border-red-600 text-white shadow-sm shadow-red-500/15"
                  : "bg-white border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-300"
              }`}
            >
              <span>🍗</span>
              <span>{t("non_vegetarian")}</span>
            </button>

            {/* Chef Recommended Pill */}
            <button
              onClick={() => {
                setSelectedVegFilter("all");
                setIsChefRecommendedOnly(true);
              }}
              className={`flex items-center gap-1 px-4.5 py-2 text-[11px] font-black rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                isChefRecommendedOnly
                  ? "bg-amber-500 border-amber-500 text-stone-955 shadow-sm shadow-amber-500/15"
                  : "bg-white border-stone-200 text-stone-500 hover:text-stone-900 hover:border-stone-300"
              }`}
            >
              <span>⭐</span>
              <span>{t("chef_recommended")}</span>
            </button>
          </div>

          {/* Responsive Food Card Grid */}
          <div className="px-5 grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((item, idx) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  index={idx}
                  onCardClick={(selectedItem) => setSelectedDetailItem(selectedItem)}
                />
              ))
            ) : (
              <p className="text-center text-xs text-stone-400 py-16 col-span-2">
                No items found matching the selected filters.
              </p>
            )}
          </div>

        </div>

        {/* Right Side: Persistent Desktop Cart Sidebar (Visible only on Desktop LG screens) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-6 bg-white border border-stone-200 p-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col max-h-[85vh]">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider">
                {t("cart_title")}
              </h3>
              <span className="px-2 py-0.5 text-xs font-black bg-stone-100 text-stone-600 rounded">
                {totalItems}
              </span>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[10px] font-bold text-red-500 hover:text-red-600 cursor-pointer uppercase tracking-wider"
              >
                {t("clear_cart")}
              </button>
            )}
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <span className="text-3xl mb-3">🛒</span>
              <p className="text-xs text-stone-400 max-w-[200px] leading-relaxed">
                {t("empty_cart")}
              </p>
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0 mt-4 justify-between">
              
              {/* Scrollable list items */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 no-scrollbar max-h-[45vh]">
                {cart.map(({ item, quantity }) => {
                  const name = language === "en" ? item.nameEn : item.nameBn;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 border-b border-stone-50 pb-3"
                    >
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
                          <h4 className="text-xs font-extrabold text-stone-900 truncate">
                            {name}
                          </h4>
                          <p className="text-[10px] text-stone-500 mt-0.5">
                            {t("currency")}{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center bg-stone-100 rounded-lg overflow-hidden border border-stone-200/50">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="px-2 py-0.5 text-xs font-black text-orange-600 hover:bg-stone-50 transition-colors cursor-pointer"
                          >
                            −
                          </button>
                          <span className="px-0.5 text-[11px] font-black text-stone-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="px-2 py-0.5 text-xs font-black text-orange-600 hover:bg-stone-50 transition-colors cursor-pointer"
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

              {/* Sidebar Footer Actions */}
              <div className="border-t border-stone-100 pt-4 flex flex-col gap-4 mt-4">
                <div className="flex items-center justify-between text-stone-900 text-xs font-black uppercase tracking-wider">
                  <span>{t("total")}</span>
                  <span className="text-sm font-black text-orange-600">
                    {t("currency")}{totalPrice}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer text-center flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(234,88,12,0.2)]"
                >
                  <span>💬</span>
                  <span>{t("place_order")}</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

      {/* Floating Surprise/Spinner Modal */}
      <FoodSpinner
        items={data.menu}
        isOpen={isSpinnerOpen}
        onClose={() => setIsSpinnerOpen(false)}
      />



      {/* Food Detail Modal */}
      <FoodDetailModal
        item={selectedDetailItem}
        isOpen={selectedDetailItem !== null}
        onClose={() => setSelectedDetailItem(null)}
        menu={data.menu}
        onSelectAnotherItem={(item) => setSelectedDetailItem(item)}
      />

      {/* WiFi Information Modal */}
      {data.wifiDetails && (
        <WifiDetailModal
          isOpen={isWifiModalOpen}
          onClose={() => setIsWifiModalOpen(false)}
          ssid={data.wifiDetails.ssid}
          password={data.wifiDetails.password}
          restaurantName={restaurantName}
        />
      )}

      {/* Pinned Bottom Navigation / Checkout Bar (Mobile/Tablet Only, lg:hidden) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-xl border-t border-stone-200/50 p-4 pb-6 flex items-center justify-between gap-3.5 shadow-[0_-10px_35px_rgba(0,0,0,0.06)] z-40 max-w-2xl mx-auto rounded-t-3xl">
        {/* Surprise me (spinner) */}
        <button
          onClick={() => setIsSpinnerOpen(true)}
          className="flex items-center justify-center gap-1.5 px-4 py-4 bg-orange-50/60 border border-orange-200 hover:bg-orange-50 text-orange-600 text-xs font-black rounded-2xl uppercase tracking-wider cursor-pointer transition-all active:scale-95 shadow-[0_4px_12px_rgba(234,88,12,0.05)]"
        >
          <span className="text-sm">🎡</span>
          <span>{t("surprise_me")}</span>
        </button>

        {/* Place order via Whatsapp */}
        <button
          onClick={handlePlaceOrder}
          disabled={cart.length === 0}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-black rounded-2xl uppercase tracking-wider cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed transition-all active:scale-98 shadow-[0_6px_20px_rgba(234,88,12,0.22)] disabled:shadow-none relative overflow-hidden"
        >
          <span className="text-sm">👜</span>
          <span className="flex items-center gap-2">
            <span>{t("place_order_bag")}</span>
            <span className="inline-flex items-center justify-center bg-white text-orange-600 text-[10.5px] font-black w-5 h-5 rounded-full shadow-sm">
              {totalItems}
            </span>
          </span>
        </button>
      </div>

    </div>
  );
}
