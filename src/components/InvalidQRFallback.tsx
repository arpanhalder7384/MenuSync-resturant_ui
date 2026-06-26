"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Html5Qrcode } from "html5-qrcode";

interface InvalidQRFallbackProps {
  message?: string;
}

export default function InvalidQRFallback({ message }: InvalidQRFallbackProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const elementId = "qr-reader-fallback-container";

  useEffect(() => {
    if (!isScanning) return;

    let activeScanner: Html5Qrcode | null = null;

    // Lazily load the class only on the client side at runtime
    import("html5-qrcode")
      .then(({ Html5Qrcode: Html5QrcodeClass }) => {
        activeScanner = new Html5QrcodeClass(elementId);
        scannerRef.current = activeScanner;

        return activeScanner.start(
          { facingMode: "environment" },
          {
            fps: 15,
            qrbox: (width: number, height: number) => {
              const size = Math.min(width, height) * 0.7;
              return { width: size, height: size };
            },
            aspectRatio: 1.0,
          },
          (decodedText: string) => {
            // Success: play brief haptic vibration if supported
            if (typeof navigator !== "undefined" && navigator.vibrate) {
              navigator.vibrate(100);
            }

            if (activeScanner) {
              activeScanner
                .stop()
                .then(() => {
                  setIsScanning(false);
                  // Redirect browser to parsed URL
                  if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
                    window.location.href = decodedText;
                  } else {
                    // Fallback to internal path if text is only a hash/code
                    window.location.href = `/menu/${decodedText}`;
                  }
                })
                .catch((err: unknown) => {
                  console.error("Stopping scan failed", err);
                  window.location.href = decodedText;
                });
            }
          },
          () => {
            // Silent error callbacks for frame failures
          }
        );
      })
      .catch((err: unknown) => {
        console.error("Camera startup failed", err);
        setErrorMsg("Camera access denied. Please verify camera permissions in settings.");
        setIsScanning(false);
      });

    return () => {
      if (activeScanner) {
        if (activeScanner.isScanning) {
          activeScanner.stop().catch((e: unknown) => console.error("Clean stop failed", e));
        }
      }
    };
  }, [isScanning]);

  const handleStartScan = () => {
    setErrorMsg(null);
    setIsScanning(true);
  };

  const handleStopScan = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          setIsScanning(false);
        })
        .catch((err: unknown) => {
          console.error("Failed to stop scanner", err);
          setIsScanning(false);
        });
    } else {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-5 font-sans relative overflow-hidden">
      
      {/* Decorative gradient glowing spots in background */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Alert Card View */}
      {!isScanning ? (
        <div className="bg-stone-900/40 backdrop-blur-xl border border-stone-800/80 px-8 py-10 md:py-12 rounded-[36px] max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-center flex flex-col items-center gap-7 animate-fadeIn relative z-10">
          
          {/* Warning Icon Graphic Container */}
          <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-amber-500/10 to-orange-500/5 flex items-center justify-center border border-orange-500/20 shadow-[0_8px_32px_rgba(249,115,22,0.05)]">
            <svg
              className="w-10 h-10 text-orange-500 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Texts */}
          <div className="flex flex-col gap-2.5">
            <h2 className="text-2xl font-black tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-200">
              {message || "Menu Code Not Found"}
            </h2>
            <p className="text-xs md:text-sm text-stone-400 leading-relaxed max-w-[300px] mx-auto">
              The menu layout you scanned is inactive or invalid. Scan another table QR code to view the menu.
            </p>
          </div>

          {/* Dynamic Error Box */}
          {errorMsg && (
            <div className="w-full bg-red-950/40 text-red-400 text-xs py-3.5 px-5 rounded-2xl border border-red-500/20 font-semibold leading-relaxed animate-shake">
              {errorMsg}
            </div>
          )}

          <div className="w-full mt-3">
            {/* Beautiful primary glowing scan button */}
            <button
              onClick={handleStartScan}
              className="w-full py-4.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-black rounded-2xl transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(234,88,12,0.3)] hover:shadow-[0_8px_35px_rgba(234,88,12,0.5)] active:scale-[0.98] cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Scan QR Code Again
            </button>
          </div>
        </div>
      ) : (
        /* Camera overlay view fitting the new premium dark aesthetic */
        <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-stone-900 rounded-[36px] overflow-hidden border border-stone-800 shadow-2xl relative flex flex-col">
            
            {/* Header control bar */}
            <div className="px-5 py-4 border-b border-stone-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
                <span className="text-white text-xs font-bold uppercase tracking-wider">
                  Align Table QR Code
                </span>
              </div>
              <button
                onClick={handleStopScan}
                className="w-8 h-8 rounded-full bg-stone-850 hover:bg-stone-800 flex items-center justify-center text-stone-400 hover:text-white transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Video Feed Screen */}
            <div className="relative aspect-square w-full bg-stone-950 flex items-center justify-center overflow-hidden">
              <div id={elementId} className="w-full h-full object-cover [&_video]:object-cover" />
              
              {/* Scan box visual overlay styling */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-[70%] h-[70%] border-2 border-dashed border-orange-500/60 rounded-3xl relative flex items-center justify-center">
                  {/* Corner brackets */}
                  <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-md"></div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-md"></div>
                  <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-md"></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-md"></div>
                  
                  {/* Pulsing scanning guide bar */}
                  <div className="w-full h-[3px] bg-gradient-to-r from-orange-600/10 via-orange-500 to-orange-600/10 absolute animate-[scan_2s_ease-in-out_infinite] shadow-[0_0_12px_rgba(249,115,22,0.8)]"></div>
                </div>
              </div>
            </div>

            {/* Bottom guide text */}
            <div className="p-6 text-center bg-stone-900 border-t border-stone-800/50 flex flex-col gap-4">
              <p className="text-xs text-stone-400 leading-relaxed max-w-[280px] mx-auto">
                Position the QR code inside the target window to scan it automatically.
              </p>
              <button
                onClick={handleStopScan}
                className="py-3.5 bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-bold rounded-xl transition-all uppercase tracking-wider cursor-pointer"
              >
                Cancel Scanning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
