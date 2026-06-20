/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { MenuItem } from "@/lib/mockData";
import { useTranslation } from "@/lib/translations";
import { useCart } from "@/lib/cart";

interface FoodCardProps {
  item: MenuItem;
  onCardClick?: (item: MenuItem) => void;
  index: number;
}

export default function FoodCard({ item, onCardClick, index }: FoodCardProps) {
  const { language, t } = useTranslation();
  const { cart, addToCart, updateQuantity } = useCart();

  const name = language === "en" ? item.nameEn : item.nameBn;
  const description = language === "en" ? item.descriptionEn : item.descriptionBn;

  const cartItem = cart.find((i) => i.item.id === item.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div 
      onClick={() => onCardClick?.(item)}
      className="flex gap-4 p-4 bg-white rounded-2xl border border-stone-200/50 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-pointer"
    >
      {/* Details Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-1.5">
            {/* Veg / Non-Veg Indicator */}
            <span
              className={`flex items-center justify-center w-[16px] h-[16px] border-2 rounded p-[2px] ${
                item.isVeg
                  ? "border-green-600"
                  : "border-red-600"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  item.isVeg ? "bg-green-600" : "bg-red-600"
                }`}
              />
            </span>

            {/* Special / Chef Recommended */}
            {item.isSpecial && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 text-[8.5px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200/50 rounded">
                ★ {t("chef_recommended")}
              </span>
            )}
          </div>

          <h3 className="text-sm font-extrabold text-stone-900">
            {name}
          </h3>

          <p className="text-stone-900 font-black text-xs mt-0.5">
            {t("currency")}{item.price}
          </p>

          <p className="text-[11px] text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Image & Cart Actions Section */}
      <div className="relative flex-shrink-0 w-24 h-24">
        <img
          src={item.image}
          alt={name}
          className="w-full h-full object-cover rounded-xl bg-stone-100 border border-stone-100"
          loading={index < 2 ? "eager" : "lazy"}
          {...(index === 0 ? { fetchPriority: "high" } : {})}
        />

        {/* Floating Add / Quantity Adjuster */}
        <div onClick={(e) => e.stopPropagation()} className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-20 shadow-md rounded-lg overflow-hidden bg-white border border-stone-200">
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(item)}
              className="w-full py-1 text-[11px] font-black text-orange-600 hover:bg-stone-50 transition-colors uppercase tracking-wider text-center cursor-pointer"
            >
              + {t("add_to_cart")}
            </button>
          ) : (
            <div className="flex items-center justify-between text-stone-900 bg-white">
              <button
                onClick={() => updateQuantity(item.id, quantity - 1)}
                className="px-2 py-1 text-xs font-black text-orange-600 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                −
              </button>
              <span className="text-[11px] font-black text-stone-900">{quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, quantity + 1)}
                className="px-2 py-1 text-xs font-black text-orange-600 hover:bg-stone-50 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
