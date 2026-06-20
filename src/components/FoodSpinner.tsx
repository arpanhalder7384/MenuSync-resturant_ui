/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { MenuItem } from "@/lib/mockData";
import { useTranslation } from "@/lib/translations";
import { useCart } from "@/lib/cart";

interface FoodSpinnerProps {
  items: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function FoodSpinner({ items, isOpen, onClose }: FoodSpinnerProps) {
  const { language, t } = useTranslation();
  const { addToCart } = useCart();

  // Categorized items
  const appetizers = items.filter((item) => item.category === "Starter");
  const entrees = items.filter((item) => item.category === "Main");
  const desserts = items.filter((item) => item.category === "Dessert" || item.category === "Drink");

  // Slot States
  const [starterItem, setStarterItem] = useState<MenuItem | null>(null);
  const [mainItem, setMainItem] = useState<MenuItem | null>(null);
  const [dessertItem, setDessertItem] = useState<MenuItem | null>(null);

  // Lock States
  const [starterLocked, setStarterLocked] = useState(false);
  const [mainLocked, setMainLocked] = useState(false);
  const [dessertLocked, setDessertLocked] = useState(false);

  // Animation States
  const [isSpinningStarter, setIsSpinningStarter] = useState(false);
  const [isSpinningMain, setIsSpinningMain] = useState(false);
  const [isSpinningDessert, setIsSpinningDessert] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);

  if (!isOpen) return null;

  const isSpinning = isSpinningStarter || isSpinningMain || isSpinningDessert;

  const handleSpinSlots = () => {
    if (isSpinning) return;

    setHasSpun(true);

    // Start Appetizer spinning if not locked
    if (!starterLocked) {
      setStarterItem(null);
      setIsSpinningStarter(true);
      setTimeout(() => {
        setIsSpinningStarter(false);
        if (appetizers.length > 0) {
          setStarterItem(appetizers[Math.floor(Math.random() * appetizers.length)]);
        }
      }, 1200);
    }

    // Start Main spinning if not locked
    if (!mainLocked) {
      setMainItem(null);
      setIsSpinningMain(true);
      setTimeout(() => {
        setIsSpinningMain(false);
        if (entrees.length > 0) {
          setMainItem(entrees[Math.floor(Math.random() * entrees.length)]);
        }
      }, 2000);
    }

    // Start Dessert spinning if not locked
    if (!dessertLocked) {
      setDessertItem(null);
      setIsSpinningDessert(true);
      setTimeout(() => {
        setIsSpinningDessert(false);
        if (desserts.length > 0) {
          setDessertItem(desserts[Math.floor(Math.random() * desserts.length)]);
        }
      }, 2800);
    }
  };

  const handleAddComboToCart = () => {
    if (starterItem) addToCart(starterItem);
    if (mainItem) addToCart(mainItem);
    if (dessertItem) addToCart(dessertItem);
    setStarterLocked(false);
    setMainLocked(false);
    setDessertLocked(false);
    onClose();
  };

  const currentAppetizer = starterItem;
  const currentEntree = mainItem;
  const currentDessert = dessertItem;

  // Calculate total price of combo
  const comboTotal =
    (starterItem?.price || 0) + (mainItem?.price || 0) + (dessertItem?.price || 0);

  // Check if all active slots are locked
  const allLocked = starterLocked && mainLocked && dessertLocked;  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300">
      <div
        className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSpinning}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer disabled:opacity-50 z-20"
        >
          ✕
        </button>

        {/* Titles */}
        <h2 className="text-2xl font-black text-white text-center mt-2 mb-1">
          {t("dont_know_title")}
        </h2>
        <p className="text-xs text-stone-400 text-center mb-8 max-w-[80%]">
          {t("spin_fav")}
        </p>

        {/* CSS Keyframes for Slot Machine Roll */}
        <style>{`
          @keyframes slotRoll {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
        `}</style>

        {/* 3 slots in a row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full mb-8">
          
          {/* Slot 1: Appetizer */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest text-center">
              {t("appetizer")}
            </span>
            <div className="relative w-full aspect-[5/6] rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between p-3 overflow-hidden shadow-inner group">
              {/* Lock Indicator Button */}
              {starterItem && !isSpinningStarter && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStarterLocked(!starterLocked);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all z-10 cursor-pointer ${
                    starterLocked
                      ? "bg-amber-500 border-amber-400 text-stone-950 scale-105 shadow-sm shadow-amber-500/30 font-bold"
                      : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {starterLocked ? "🔒" : "🔓"}
                </button>
              )}

              {/* Card visual */}
              {isSpinningStarter ? (
                <div className="absolute inset-0 flex flex-col animate-[slotRoll_0.4s_linear_infinite]">
                  {[...appetizers, ...appetizers].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="w-full h-full flex-shrink-0 flex flex-col p-3 items-center justify-between">
                      <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          className="w-full h-full object-cover bg-stone-800"
                        />
                      </div>
                      <span className="text-[10px] font-extrabold text-stone-300 text-center line-clamp-1 truncate w-full">
                        {language === "en" ? item.nameEn : item.nameBn}
                      </span>
                    </div>
                  ))}
                </div>
              ) : currentAppetizer ? (
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                    <img
                      src={currentAppetizer.image}
                      alt={currentAppetizer.nameEn}
                      className="w-full h-full object-cover bg-stone-800"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold text-stone-200 text-center line-clamp-2 leading-tight">
                    {language === "en" ? currentAppetizer.nameEn : currentAppetizer.nameBn}
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl opacity-30 select-none">🍕</span>
                  <span className="text-[9px] font-bold text-stone-600 tracking-wider">
                    {t("appetizer")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Slot 2: Entrée */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest text-center">
              {t("entree")}
            </span>
            <div className="relative w-full aspect-[5/6] rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between p-3 overflow-hidden shadow-inner group">
              {/* Lock Indicator Button */}
              {mainItem && !isSpinningMain && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMainLocked(!mainLocked);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all z-10 cursor-pointer ${
                    mainLocked
                      ? "bg-amber-500 border-amber-400 text-stone-955 scale-105 shadow-sm shadow-amber-500/30 font-bold"
                      : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {mainLocked ? "🔒" : "🔓"}
                </button>
              )}

              {/* Card visual */}
              {isSpinningMain ? (
                <div className="absolute inset-0 flex flex-col animate-[slotRoll_0.4s_linear_infinite]">
                  {[...entrees, ...entrees].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="w-full h-full flex-shrink-0 flex flex-col p-3 items-center justify-between">
                      <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          className="w-full h-full object-cover bg-stone-800"
                        />
                      </div>
                      <span className="text-[10px] font-extrabold text-stone-300 text-center line-clamp-1 truncate w-full">
                        {language === "en" ? item.nameEn : item.nameBn}
                      </span>
                    </div>
                  ))}
                </div>
              ) : currentEntree ? (
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                    <img
                      src={currentEntree.image}
                      alt={currentEntree.nameEn}
                      className="w-full h-full object-cover bg-stone-800"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold text-stone-200 text-center line-clamp-2 leading-tight">
                    {language === "en" ? currentEntree.nameEn : currentEntree.nameBn}
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl opacity-30 select-none">🍜</span>
                  <span className="text-[9px] font-bold text-stone-600 tracking-wider">
                    {t("entree")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Slot 3: Dessert */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-black text-stone-500 uppercase tracking-widest text-center">
              {t("dessert_slot")}
            </span>
            <div className="relative w-full aspect-[5/6] rounded-2xl bg-stone-950 border border-stone-800 flex flex-col justify-between p-3 overflow-hidden shadow-inner group">
              {/* Lock Indicator Button */}
              {dessertItem && !isSpinningDessert && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDessertLocked(!dessertLocked);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-all z-10 cursor-pointer ${
                    dessertLocked
                      ? "bg-amber-500 border-amber-400 text-stone-955 scale-105 shadow-sm shadow-amber-500/30 font-bold"
                      : "bg-stone-900/80 border-stone-800 text-stone-400 hover:text-white"
                  }`}
                >
                  {dessertLocked ? "🔒" : "🔓"}
                </button>
              )}

              {/* Card visual */}
              {isSpinningDessert ? (
                <div className="absolute inset-0 flex flex-col animate-[slotRoll_0.4s_linear_infinite]">
                  {[...desserts, ...desserts].map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="w-full h-full flex-shrink-0 flex flex-col p-3 items-center justify-between">
                      <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          className="w-full h-full object-cover bg-stone-800"
                        />
                      </div>
                      <span className="text-[10px] font-extrabold text-stone-300 text-center line-clamp-1 truncate w-full">
                        {language === "en" ? item.nameEn : item.nameBn}
                      </span>
                    </div>
                  ))}
                </div>
              ) : currentDessert ? (
                <div className="w-full h-full flex flex-col justify-between">
                  <div className="w-full h-2/3 rounded-xl overflow-hidden mb-1 relative">
                    <img
                      src={currentDessert.image}
                      alt={currentDessert.nameEn}
                      className="w-full h-full object-cover bg-stone-800"
                    />
                  </div>
                  <span className="text-[10px] font-extrabold text-stone-200 text-center line-clamp-2 leading-tight">
                    {language === "en" ? currentDessert.nameEn : currentDessert.nameBn}
                  </span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl opacity-30 select-none">🍰</span>
                  <span className="text-[9px] font-bold text-stone-600 tracking-wider">
                    {t("dessert_slot")}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Buttons / Actions */}
        <div className="w-full flex flex-col items-center min-h-[120px]">
          
          {/* Initial Spin Button */}
          {!hasSpun && !isSpinning && (
            <button
              onClick={handleSpinSlots}
              className="w-full max-w-sm py-4 bg-white hover:bg-stone-100 text-stone-955 text-sm font-black rounded-xl shadow-lg transition-all transform active:scale-98 cursor-pointer uppercase tracking-wider text-center flex items-center justify-center gap-2"
            >
              <span className="text-base">🎲</span>
              <span>{t("generate_match")}</span>
            </button>
          )}

          {/* Spinning Loading Indicator */}
          {isSpinning && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold text-amber-500 tracking-wider animate-pulse uppercase">
                {t("spinning")}
              </p>
            </div>
          )}

          {/* Results Summary and Combos */}
          {!isSpinning && hasSpun && (starterItem || mainItem || dessertItem) && (
            <div className="w-full flex flex-col items-center animate-fadeIn gap-4">
              
              {/* Combo Summary Card */}
              {comboTotal > 0 && (
                <div className="text-xs font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full uppercase tracking-wider">
                  {t("combo_total")}: {t("currency")}{comboTotal}
                </div>
              )}

              {/* Add Combo to Cart */}
              <button
                onClick={handleAddComboToCart}
                className="w-full max-w-sm py-4 bg-white hover:bg-stone-100 text-stone-955 text-sm font-black rounded-xl shadow-lg transition-all transform active:scale-98 cursor-pointer uppercase tracking-wider text-center"
              >
                📥 {t("add_combo")} ({t("currency")}{comboTotal})
              </button>

              {/* Spin Again */}
              <button
                onClick={handleSpinSlots}
                disabled={allLocked}
                className="text-xs font-black text-stone-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer underline tracking-wider uppercase"
              >
                🔄 {t("spin_again")}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
