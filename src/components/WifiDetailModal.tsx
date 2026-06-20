"use client";

import React, { useState } from "react";
import { useTranslation } from "@/lib/translations";

interface WifiDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ssid: string;
  password?: string;
  restaurantName: string;
}

export default function WifiDetailModal({
  isOpen,
  onClose,
  ssid,
  password,
  restaurantName,
}: WifiDetailModalProps) {
  const { language, t } = useTranslation();
  const [copiedField, setCopiedField] = useState<"ssid" | "password" | null>(null);

  if (!isOpen) return null;

  const handleCopyText = async (text: string, field: "ssid" | "password") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      onClick={() => {
        onClose();
        setCopiedField(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col animate-fadeIn border border-stone-200"
      >
        {/* Header: Pulsing/Glowing WiFi icon */}
        <div className="flex flex-col items-center text-center pb-4 mb-4 border-b border-stone-100">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-3 animate-pulse border border-orange-100 shadow-sm shadow-orange-500/10">
            <span className="text-3xl text-orange-600">📶</span>
          </div>
          <h3 className="text-base font-black text-stone-900 uppercase tracking-wider">
            {t("wifi_details")}
          </h3>
          <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">
            {restaurantName}
          </p>
        </div>

        {/* WiFi Credentials Grid */}
        <div className="space-y-4">
          {/* SSID Info */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              {t("wifi_ssid")}
            </span>
            <span className="text-sm font-extrabold text-stone-900 select-all font-mono">
              {ssid}
            </span>
            
            {/* Copy Button for SSID */}
            <button
              onClick={() => handleCopyText(ssid, "ssid")}
              className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-lg text-[9px] font-black text-stone-600 hover:text-stone-900 active:scale-95 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
            >
              {copiedField === "ssid" ? t("wifi_copied") : (language === "en" ? "Copy" : "কপি")}
            </button>
          </div>

          {/* Password Info */}
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-2xl flex flex-col gap-1 relative overflow-hidden">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
              {t("wifi_password")}
            </span>
            {password ? (
              <>
                <span className="text-sm font-extrabold text-stone-900 select-all font-mono">
                  {password}
                </span>
                {/* Copy Button for Password */}
                <button
                  onClick={() => handleCopyText(password, "password")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border border-stone-200 hover:border-stone-300 hover:bg-stone-50 rounded-lg text-[9px] font-black text-stone-600 hover:text-stone-900 active:scale-95 transition-all shadow-xs cursor-pointer uppercase tracking-wider"
                >
                  {copiedField === "password" ? t("wifi_copied") : (language === "en" ? "Copy" : "কপি")}
                </button>
              </>
            ) : (
              <span className="text-xs font-bold text-green-600">
                {t("wifi_no_password")}
              </span>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              onClose();
              setCopiedField(null);
            }}
            className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-black rounded-xl uppercase tracking-wider cursor-pointer text-center transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            {t("wifi_close")}
          </button>
        </div>
      </div>
    </div>
  );
}
