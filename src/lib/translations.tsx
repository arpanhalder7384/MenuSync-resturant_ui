"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "bn";

export const translations = {
  en: {
    menusync: "PlateProject",
    menusync_desc: "Digital Menu & Food Discovery",
    menusync_slogan: "Scan, spin, decide, and order via WhatsApp!",
    welcome_to: "Welcome to",
    table: "Table",
    Starter: "Starters",
    Main: "Main Course",
    Drink: "Drinks",
    Dessert: "Desserts",
    todays_special: "Today's Special",
    chef_recommended: "Chef Recommended",
    spin_food: "Spin Food",
    what_to_eat: "What Should I Eat?",
    spin_desc: "Can't decide? Let us pick a delicious dish for you!",
    spin_btn: "Spin the Wheel",
    spinning: "Spinning...",
    try_this: "Try this today!",
    add_to_cart: "Add to Cart",
    search_placeholder: "Search dishes...",
    veg: "Veg",
    non_veg: "Non-Veg",
    item_added: "Item added!",
    cart_title: "Your Order",
    empty_cart: "Your cart is empty. Add yummy dishes to get started!",
    total: "Total Bill",
    place_order: "Place Order",
    clear_cart: "Clear Cart",
    items: "items",
    view_cart: "View Cart",
    language: "Language",
    loading: "Loading Menu...",
    not_found: "Invalid QR code or Restaurant not found.",
    go_home: "Go back to Home",
    scan_demo: "Try the Demo",
    scan_demo_desc: "Select a simulated table QR scan to see how the customer experience works:",
    homepage_hero_title: "The Smartest Digital Menu for Restaurants",
    homepage_hero_desc: "Allow your diners to scan, view your menu in their preferred language (English or Bengali), spin for recommendations, and place orders directly on WhatsApp without waiting for staff.",
    feature_qr_title: "QR Code Entry",
    feature_qr_desc: "Each table has a unique QR code that maps directly to the table number and restaurant menu.",
    feature_lang_title: "Bilingual Support",
    feature_lang_desc: "Seamless switching between English and Bengali to cater to local customers.",
    feature_spin_title: "Decision Wheel",
    feature_spin_desc: "A fun food spinner that recommends dishes to customers facing choice fatigue.",
    feature_wa_title: "WhatsApp Ordering",
    feature_wa_desc: "Instantly compile orders and shoot them as pre-formatted WhatsApp messages.",
    step_1: "Scan QR Code",
    step_1_desc: "Customers scan the QR code on their table to open the digital menu.",
    step_2: "Browse & Spin",
    step_2_desc: "Explore items in English/Bengali or spin the wheel if undecided.",
    step_3: "Order via WhatsApp",
    step_3_desc: "Checkout directly. An automated, itemized order reaches the restaurant's WhatsApp.",
    copyright: "© 2026 PlateProject. All rights reserved.",
    back_to_menu: "Back to Menu",
    currency: "₹ ",
    // Cafe Harbour styling translations
    dont_know_title: "Don't know what to eat?",
    spin_fav: "Spin to discover your next favorite ✨",
    generate_match: "SPIN THE WHEEL",
    add_combo: "Add Combo to Cart",
    spin_again: "Spin Again",
    appetizer: "APPETIZER",
    entree: "ENTRÉE",
    dessert_slot: "DESSERT",
    surprise_me: "MAGIC SPIN",
    place_order_bag: "PLACE ORDER",
    vegetarian: "Vegetarian",
    non_vegetarian: "Non-Veg",
    all_items: "All Items",
    directions: "Directions",
    wifi: "WiFi",
    wifi_details: "WiFi Connection Details",
    wifi_ssid: "Network Name (SSID)",
    wifi_password: "Password",
    wifi_copy: "Copy Password",
    wifi_copied: "Copied!",
    wifi_close: "Close",
    wifi_no_password: "No password required (Open network)",
    full_menu: "FULL MENU",
    combo_total: "Combo Total",
    contact_title: "Grow Your Restaurant with PlateProject",
    contact_desc: "Fill out the details below and we will set up your smart menu on WhatsApp in no time!",
    label_name: "Your Name",
    label_shop: "Restaurant / Shop Name",
    label_address: "Address",
    label_mobile: "Mobile Number",
    placeholder_name: "Enter your full name",
    placeholder_shop: "Enter shop name",
    placeholder_address: "Enter restaurant address",
    placeholder_mobile: "Enter 10-digit mobile number",
    btn_submit_contact: "Send WhatsApp Setup Request",
    validation_error: "Please fill out all fields correctly.",
    pairing_suggestion: "Best Pairing Recommendation",
    no_pairing_needed: "Best enjoyed on its own! Serves as a perfect standalone choice.",
    try_with: "Delicious when paired with",
    add_to_order: "Add to Order",
    confirm_order_title: "Confirm Your Order",
    order_summary: "Order Summary",
    cust_name_label: "Your Name",
    cust_name_placeholder: "Enter your name (optional)",
    cust_notes_label: "Special Instructions / Notes",
    cust_notes_placeholder: "e.g., No onion, make it extra spicy, etc. (optional)",
    place_order_btn: "Confirm & Place Order",
    empty_confirm_cart: "No items to confirm. Please add items to your cart first!",
    restaurant_label: "Restaurant",
    table_label: "Table",
    total_bill_label: "Total Bill Amount"
  },
  bn: {
    menusync: "প্লেটপ্রজেক্ট",
    menusync_desc: "ডিজিটাল মেনু এবং খাবার আবিষ্কার",
    menusync_slogan: "স্ক্যান করুন, ঘোরান, সিদ্ধান্ত নিন এবং হোয়াটসঅ্যাপে অর্ডার করুন!",
    welcome_to: "স্বাগতম",
    table: "টেবিল",
    Starter: "স্টার্টার্স",
    Main: "প্রধান খাবার",
    Drink: "পানীয়",
    Dessert: "মিষ্টি ও ডেজার্ট",
    todays_special: "আজকের বিশেষ পদ",
    chef_recommended: "শেফের সুপারিশ",
    spin_food: "খাবার ঘোরান",
    what_to_eat: "আমি আজ কী খাব?",
    spin_desc: "সিদ্ধান্ত নিতে পারছেন না? আমাদের আপনার জন্য একটি সুস্বাদু পদ বেছে নিতে দিন!",
    spin_btn: "চাকাটি ঘোরান",
    spinning: "ঘুরছে...",
    try_this: "আজ এটি ট্রাই করুন!",
    add_to_cart: "কার্টে যোগ করুন",
    search_placeholder: "খাবার খুঁজুন...",
    veg: "নিরামিষ",
    non_veg: "আমিষ",
    item_added: "যোগ করা হয়েছে!",
    cart_title: "আপনার অর্ডার",
    empty_cart: "আপনার কার্ট খালি। শুরু করতে সুস্বাদু খাবার যোগ করুন!",
    total: "মোট বিল",
    place_order: "অর্ডার দিন",
    clear_cart: "কার্ট খালি করুন",
    items: "টি আইটেম",
    view_cart: "কার্ট দেখুন",
    language: "ভাষা",
    loading: "মেনু লোড হচ্ছে...",
    not_found: "ভুল কিউআর কোড বা রেস্তোরাঁ পাওয়া যায়নি।",
    go_home: "হোম পেজে ফিরে যান",
    scan_demo: "ডেমো ট্রাই করুন",
    scan_demo_desc: "গ্রাহকদের অভিজ্ঞতা কেমন হবে তা দেখতে নিচে থেকে একটি টেবিল কিউআর স্ক্যান নির্বাচন করুন:",
    homepage_hero_title: "আধুনিক রেস্তোরাঁর জন্য সবচেয়ে স্মার্ট ডিজিটাল মেনু",
    homepage_hero_desc: "গ্রাহকদের টেবিল কিউআর কোড স্ক্যান করে তাদের পছন্দের ভাষায় (ইংরেজি বা বাংলা) মেনু দেখতে, খাবারের সুপারিশ পেতে এবং কর্মচারীদের অপেক্ষা না করিয়ে সরাসরি হোয়াটসঅ্যাপে অর্ডার দিতে দিন।",
    feature_qr_title: "কিউআর কোড এন্ট্রি",
    feature_qr_desc: "প্রতিটি টেবিলের জন্য রয়েছে আলাদা কিউআর কোড যা সরাসরি টেবিল নম্বর এবং মেনুকে সনাক্ত করে।",
    feature_lang_title: "দ্বিভাষিক সুবিধা",
    feature_lang_desc: "Seamless switching between English and Bengali to cater to local customers.",
    feature_spin_title: "সিদ্ধান্তের চাকা",
    feature_spin_desc: "কী খাবেন তা ঠিক করতে না পারলে চাকা ঘুরিয়ে আকর্ষণীয় রেকমেন্ডেশন পান।",
    feature_wa_title: "হোয়াটসঅ্যাপে অর্ডার",
    feature_wa_desc: "অর্ডারের সব খাবার গুছিয়ে রেস্তোরাঁর হোয়াটসঅ্যাপ নম্বরে সরাসরি অর্ডার পাঠিয়ে দিন।",
    step_1: "কিউআর কোড স্ক্যান",
    step_1_desc: "গ্রাহকরা তাদের টেবিলে থাকা কিউআর কোড স্ক্যান করে ডিজিটাল মেনু খুলবেন।",
    step_2: "ব্রাউজ ও স্পিন",
    step_2_desc: "Explore items in English/Bengali or spin the wheel if undecided.",
    step_3: "হোয়াটসঅ্যাপে অর্ডার",
    step_3_desc: "Checkout directly. An automated, itemized order reaches the restaurant's WhatsApp.",
    copyright: "© ২০২৬ প্লেটপ্রজেক্ট। সর্বস্বত্ব সংরক্ষিত।",
    back_to_menu: "মেনুতে ফিরে যান",
    currency: "₹ ",
    // Cafe Harbour styling translations in Bengali
    dont_know_title: "কী খাবেন বুঝতে পারছেন না?",
    spin_fav: "আপনার পরবর্তী প্রিয় খাবারটি খুঁজতে স্পিন করুন ✨",
    generate_match: "স্পিন করুন",
    add_combo: "কম্বো কার্টে যোগ করুন",
    spin_again: "আবার ঘোরান",
    appetizer: "স্টার্টার",
    entree: "মেইন কোর্স",
    dessert_slot: "ডেজার্ট",
    surprise_me: "ম্যাজিক স্পিন",
    place_order_bag: "অর্ডার দিন",
    vegetarian: "নিরামিষ",
    non_vegetarian: "আমিষ",
    all_items: "সব খাবার",
    directions: "লোকেশন",
    wifi: "ওয়াইফাই",
    wifi_details: "ওয়াইফাই সংযোগের বিবরণ",
    wifi_ssid: "নেটওয়ার্কের নাম (SSID)",
    wifi_password: "পাসওয়ার্ড",
    wifi_copy: "পাসওয়ার্ড কপি করুন",
    wifi_copied: "কপি করা হয়েছে!",
    wifi_close: "বন্ধ করুন",
    wifi_no_password: "কোনো পাসওয়ার্ডের প্রয়োজন নেই (উন্মুক্ত নেটওয়ার্ক)",
    full_menu: "সম্পূর্ণ মেনু",
    combo_total: "কম্বো মোট",
    contact_title: "প্লেটপ্রজেক্টের সাথে আপনার রেস্তোরাঁ বাড়ান",
    contact_desc: "নিচের তথ্যগুলো পূরণ করুন এবং আমরা দ্রুত আপনার হোয়াটসঅ্যাপে স্মার্ট মেনু সেটআপ করে দেব!",
    label_name: "আপনার নাম",
    label_shop: "রেস্তোরাঁ / দোকানের নাম",
    label_address: "ঠিকানা",
    label_mobile: "মোবাইল নম্বর",
    placeholder_name: "আপনার সম্পূর্ণ নাম লিখুন",
    placeholder_shop: "দোকানের নাম লিখুন",
    placeholder_address: "রেস্তোরাঁর ঠিকানা লিখুন",
    placeholder_mobile: "১০-ডিজিটের মোবাইল নম্বর লিখুন",
    btn_submit_contact: "হোয়াটসঅ্যাপে সেটআপ রিকোয়েস্ট পাঠান",
    validation_error: "অনুগ্রহ করে সব ঘর সঠিকভাবে পূরণ করুন।",
    pairing_suggestion: "সেরা জুটির সুপারিশ",
    no_pairing_needed: "এটি নিজের স্বাদেই অতুলনীয়! একা উপভোগ করার জন্য সেরা পছন্দ।",
    try_with: "এটি দিয়ে ট্রাই করুন",
    add_to_order: "অর্ডারে যোগ করুন",
    confirm_order_title: "অর্ডার নিশ্চিত করুন",
    order_summary: "অর্ডারের বিবরণ",
    cust_name_label: "আপনার নাম",
    cust_name_placeholder: "আপনার নাম লিখুন (ঐচ্ছিক)",
    cust_notes_label: "বিশেষ নির্দেশাবলী / নোটস",
    cust_notes_placeholder: "যেমন: পেঁয়াজ ছাড়া, বেশি ঝাল দিন ইত্যাদি (ঐচ্ছিক)",
    place_order_btn: "নিশ্চিত করুন এবং অর্ডার দিন",
    empty_confirm_cart: "নিশ্চিত করার মতো কোনো খাবার নেই। অনুগ্রহ করে প্রথমে মেনু থেকে খাবার যোগ করুন!",
    restaurant_label: "রেস্তোরাঁ",
    table_label: "টেবিল",
    total_bill_label: "মোট বিল পরিমাণ"
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Set default language as "bn"
  const [language, setLanguageState] = useState<Language>("bn");

  // Load language from localStorage if available, fallback to "bn"
  useEffect(() => {
    const savedLang = localStorage.getItem("menusync_lang") as Language;
    if (savedLang === "en" || savedLang === "bn") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(savedLang);
    } else {
      setLanguageState("bn");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("menusync_lang", lang);
  };

  const t = (key: keyof typeof translations["en"]): string => {
    return translations[language][key] || translations["en"][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
