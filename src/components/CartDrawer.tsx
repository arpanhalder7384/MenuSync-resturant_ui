"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useTranslation } from "@/lib/translations";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
}: CartDrawerProps) {
  const { cart, totalPrice, totalItems, updateQuantity, clearCart } = useCart();
  const { language, t } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const hashCode = typeof params?.hashCode === "string" ? params.hashCode : "";
  const tableCode = searchParams.get("table") || "";

  if (!isOpen || cart.length === 0) return null;

  const handlePlaceOrder = () => {
    const tableQuery = tableCode ? `?table=${tableCode}` : "";
    router.push(`/menu/${hashCode}/confirm${tableQuery}`);
  };

  return (
    <>
      {/* Sheet Backdrop Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Cart Slider Bottom Sheet */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 max-w-md mx-auto bg-white rounded-t-3xl border-t border-stone-200/60 shadow-2xl flex flex-col max-h-[85vh] transition-transform duration-300 translate-y-0"
      >
        {/* Drag/Close Handle Indicator */}
        <div 
          className="w-12 h-1 bg-stone-300 rounded-full mx-auto my-3 cursor-pointer" 
          onClick={onClose} 
        />

        {/* Drawer Header */}
        <div className="px-6 pb-3 flex items-center justify-between border-b border-stone-100">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-stone-900">
              {t("cart_title")}
            </h3>
            <span className="px-2 py-0.5 text-xs font-black bg-stone-100 text-stone-600 rounded">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => {
              clearCart();
              onClose();
            }}
            className="text-xs font-bold text-red-500 hover:text-red-600 cursor-pointer"
          >
            {t("clear_cart")}
          </button>
        </div>

        {/* Scrollable Items Wrapper */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          {cart.map(({ item, quantity }) => {
            const name = language === "en" ? item.nameEn : item.nameBn;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3"
              >
                {/* Item Details */}
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className={`flex-shrink-0 w-3 h-3 border rounded p-[1.5px] ${
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
                    <h4 className="text-sm font-extrabold text-stone-900 truncate">
                      {name}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {t("currency")}{item.price}
                    </p>
                  </div>
                </div>

                {/* Adjustment Buttons & Line Sum */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="flex items-center bg-stone-100 rounded-lg overflow-hidden border border-stone-200/50">
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="px-2.5 py-1 text-xs font-black text-orange-600 hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <span className="px-1 text-xs font-black text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      className="px-2.5 py-1 text-xs font-black text-orange-600 hover:bg-stone-200 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <span className="w-14 text-right text-sm font-black text-stone-900">
                    {t("currency")}{item.price * quantity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sticky Drawer Footer actions */}
        <div className="px-6 py-5 bg-stone-50 border-t border-stone-100 flex flex-col gap-4">
          <div className="flex items-center justify-between text-stone-900">
            <span className="text-sm font-bold">{t("total")}</span>
            <span className="text-lg font-black text-orange-600">
              {t("currency")}{totalPrice}
            </span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-black rounded-xl shadow-[0_4px_16px_rgba(234,88,12,0.25)] flex items-center justify-center gap-2 transition-all transform active:scale-98 cursor-pointer text-sm uppercase tracking-wider"
          >
            <span>💬</span>
            <span>{t("place_order")}</span>
          </button>
        </div>
      </div>
    </>
  );
}
