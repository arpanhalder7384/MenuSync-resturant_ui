export interface MenuItem {
  id: string;
  nameEn: string;
  nameBn: string;
  price: number;
  image: string;
  descriptionEn: string;
  descriptionBn: string;
  category: string; // Starter | Main | Drink | Dessert
  isSpecial: boolean;
  isVeg: boolean;
  pairingPartnerId?: string;
  pairingReasonEn?: string;
  pairingReasonBn?: string;
}

export interface WifiDetails {
  ssid: string;
  password?: string;
}

export interface Restaurant {
  id: string;
  nameEn: string;
  nameBn: string;
  whatsappNumber: string;
  menu: MenuItem[];
  wifiDetails?: WifiDetails;
}

export interface QRMapping {
  restaurantId: string;
  restaurantNameEn: string;
  restaurantNameBn: string;
  tableNumber: string;
}

export const MOCK_RESTAURANTS: Record<string, Restaurant> = {
  REST001: {
    id: "REST001",
    nameEn: "Mio Amore Cafe",
    nameBn: "মিও আমোরে ক্যাফে",
    whatsappNumber: "+917074266873",
    menu: [
      {
        id: "m1",
        nameEn: "Chilli Baby Corn Dry",
        nameBn: "চিলি বেবি কর্ন ড্রাই",
        price: 150,
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Crispy baby corn tossed with Chinese spices and sauces.",
        descriptionBn: "চীনা মশলা এবং সস দিয়ে টস করা মুচমুচে বেবি কর্ন।",
        category: "Starter",
        isSpecial: false,
        isVeg: true,
      },
      {
        id: "m2",
        nameEn: "Veg Hakka Noodles",
        nameBn: "ভেজ হাক্কা নুডলস",
        price: 130,
        image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Stir-fried noodles with crisp seasonal vegetables.",
        descriptionBn: "তাজা মরসুমি সবজি দিয়ে ভাজা সুস্বাদু নুডলস।",
        category: "Main",
        isSpecial: false,
        isVeg: true,
        pairingPartnerId: "m1",
        pairingReasonEn: "Pairs perfectly with Chilli Baby Corn for a complete Chinese meal!",
        pairingReasonBn: "চীনা খাবারের সম্পূর্ণ স্বাদের জন্য এটি চিলি বেবি কর্নের সাথে ট্রাই করুন!",
      },
      {
        id: "m3",
        nameEn: "Red Velvet Jar Cake",
        nameBn: "রেড ভেলভেট জার কেক",
        price: 120,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Rich layers of red velvet cake and cream cheese frosting in a jar.",
        descriptionBn: "একটি জারে লাল ভেলভেট কেক এবং ক্রিম চিজ ফ্রস্টিংয়ের সমৃদ্ধ স্তর।",
        category: "Dessert",
        isSpecial: true,
        isVeg: true,
      },
      {
        id: "m4",
        nameEn: "Crispy Chicken Drumsticks",
        nameBn: "ক্রিস্পি চিকেন ড্রামস্টিক",
        price: 180,
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Golden fried seasoned chicken drumsticks served with hot garlic dip.",
        descriptionBn: "গরম রসুন সস দিয়ে পরিবেশন করা সোনালী ভাজা মশলাদার চিকেন ড্রামস্টিক।",
        category: "Starter",
        isSpecial: true,
        isVeg: false,
      },
      {
        id: "m5",
        nameEn: "Chicken Biryani (Kolkata Style)",
        nameBn: "চিকেন বিরিয়ানি (কলকাতা স্টাইল)",
        price: 240,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Fragrant long grain rice cooked with tender chicken, egg, and the signature potato.",
        descriptionBn: "নরম মুরগির মাংস, ডিম এবং কলকাতার সিগনেচার আলু দিয়ে রান্না করা সুগন্ধি লম্বা চালের ভাত।",
        category: "Main",
        isSpecial: true,
        isVeg: false,
        pairingPartnerId: "m7",
        pairingReasonEn: "Best enjoyed with a sweet Rosogolla to finish your meal!",
        pairingReasonBn: "খাবার শেষ করতে মিষ্টি রসগোল্লার সাথে দারুণ মানাবে!",
      },
      {
        id: "m6",
        nameEn: "Mango Mojito",
        nameBn: "ম্যাঙ্গো মোহিতো",
        price: 90,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Refreshing summer blend of mango pulp, fresh mint leaves, lime, and soda.",
        descriptionBn: "আমের পাল্প, তাজা পুদিনা পাতা, লেবু এবং সোডার রিফ্রেশিং ব্লেন্ড।",
        category: "Drink",
        isSpecial: false,
        isVeg: true,
      },
      {
        id: "m7",
        nameEn: "Sweet Rosogolla (2 Pcs)",
        nameBn: "মিষ্টি রসগোল্লা (২ পিস)",
        price: 40,
        image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Traditional soft Bengali cottage cheese balls soaked in sugary syrup.",
        descriptionBn: "চিনির সিরায় ভেজানো ঐতিহ্যবাহী নরম তুলতুলে ছানার রসগোল্লা।",
        category: "Dessert",
        isSpecial: false,
        isVeg: true,
      },
      {
        id: "m8",
        nameEn: "Chilli Chicken Gravy",
        nameBn: "চিলি চিকেন গ্রেভি",
        price: 180,
        image: "https://images.unsplash.com/photo-1603496988941-d02985758925?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Juicy chicken chunks tossed in spicy soy-garlic sauce.",
        descriptionBn: "মশলাদার সয়া-গার্লিক সসে রান্না করা রসালো চিকেনের টুকরো।",
        category: "Main",
        isSpecial: true,
        isVeg: false,
        pairingPartnerId: "m9",
        pairingReasonEn: "Tastes best when paired with Veg Fried Rice!",
        pairingReasonBn: "ভেজ ফ্রাইড রাইসের সাথে এটি সবচেয়ে ভালো জমে!",
      },
      {
        id: "m9",
        nameEn: "Veg Fried Rice",
        nameBn: "ভেজ ফ্রাইড রাইস",
        price: 140,
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Fragrant basmati rice stir-fried with diced veggies.",
        descriptionBn: "ছোট ছোট সবজি দিয়ে ভাজা সুগন্ধি বাসমতি চালের ভাত।",
        category: "Main",
        isSpecial: false,
        isVeg: true,
        pairingPartnerId: "m8",
        pairingReasonEn: "Try this with Chilli Chicken Gravy!",
        pairingReasonBn: "চিলি চিকেন গ্রেভির সাথে এটি ট্রাই করুন!",
      }
    ]
  },
  REST002: {
    id: "REST002",
    nameEn: "Spice Garden",
    nameBn: "স্পাইস গার্ডেন",
    whatsappNumber: "+917384190892",
    menu: [
      {
        id: "s1",
        nameEn: "Paneer Tikka Angara",
        nameBn: "পনির টিক্কা অঙ্গারা",
        price: 210,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Spiced paneer cubes marinated in yogurt and grilled in a clay oven.",
        descriptionBn: "দই ও মশলা দিয়ে ম্যারিনেট করে তন্দুরে সেঁকা পনিরের টুকরো।",
        category: "Starter",
        isSpecial: true,
        isVeg: true,
      },
      {
        id: "s2",
        nameEn: "Kolkata Fish Fry",
        nameBn: "কলকাতা ফিশ ফ্রাই",
        price: 160,
        image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Breaded Bhetki fillet deep-fried till golden, served with Kasundi mustard.",
        descriptionBn: "বিস্কুটের গুঁড়োয় মুড়ে কড়া ভাজা ভেটকি ফিলে, খাঁটি কাসুন্দির সাথে পরিবেশিত।",
        category: "Starter",
        isSpecial: true,
        isVeg: false,
      },
      {
        id: "s3",
        nameEn: "Mutton Kasha",
        nameBn: "মটন কষা",
        price: 320,
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Rich, slow-cooked mutton curry in a spicy dark brown gravy.",
        descriptionBn: "ধিমে আঁচে রান্না করা মাটন কষা গ্রেভি।",
        category: "Main",
        isSpecial: true,
        isVeg: false,
        pairingPartnerId: "s4",
        pairingReasonEn: "Perfect choice to dip warm Butter Naan!",
        pairingReasonBn: "গরম বাটার নান ডুবিয়ে খাওয়ার জন্য সেরা পছন্দ!",
      },
      {
        id: "s4",
        nameEn: "Butter Naan",
        nameBn: "বাটার নান",
        price: 50,
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Soft, leavened flatbread brushed with butter.",
        descriptionBn: "মাখন মাখানো নান।",
        category: "Main",
        isSpecial: false,
        isVeg: true,
        pairingPartnerId: "s3",
        pairingReasonEn: "Goes incredibly well with Mutton Kasha!",
        pairingReasonBn: "মাটন কষার সাথে অসাধারণ জমে!",
      },
      {
        id: "s5",
        nameEn: "Fresh Lime Soda",
        nameBn: "ফ্রেশ লাইম সোডা",
        price: 60,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Zesty fresh lime juice blended with soda, sweet or salted.",
        descriptionBn: "মিষ্টি বা নোনতা স্বাদে পরিবেশন করা তাজা লেবুর রস ও সোডার মিশ্রণ।",
        category: "Drink",
        isSpecial: false,
        isVeg: true,
      },
      {
        id: "s6",
        nameEn: "Mishti Doi",
        nameBn: "মিষ্টি দই",
        price: 50,
        image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Traditional sweetened caramelized clay-pot yogurt.",
        descriptionBn: "মাটির ভাঁড়ে জমানো ঐতিহ্যবাহী কলকাতার মিষ্টি দই।",
        category: "Dessert",
        isSpecial: true,
        isVeg: true,
      }
    ],
    wifiDetails: {
      ssid: "SpiceGarden_Guest",
      password: "curry123"
    }
  },
  REST003: {
    id: "REST003",
    nameEn: "Cafe Harbour",
    nameBn: "ক্যাফে হারবার",
    whatsappNumber: "+916294267705",
    menu: [
      {
        id: "h1",
        nameEn: "Chicken Club Sandwich",
        nameBn: "চিকেন ক্লাব স্যান্ডউইচ",
        price: 160,
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Classic double-decker toast sandwich with grilled chicken and egg.",
        descriptionBn: "গ্রিলড চিকেন এবং ডিম সহ ক্লাসিক ডাবল-ডেকার টোস্ট স্যান্ডউইচ।",
        category: "Main",
        isSpecial: true,
        isVeg: false,
      },
      {
        id: "h2",
        nameEn: "Cold Coffee with Ice Cream",
        nameBn: "আইসক্রিম সহ কোল্ড কফি",
        price: 110,
        image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=400&q=80",
        descriptionEn: "Creamy blended cold coffee topped with vanilla ice cream scoop.",
        descriptionBn: "ভ্যানিলা আইসক্রিমের স্কুপ দিয়ে সাজানো ঘন কোল্ড কফি।",
        category: "Drink",
        isSpecial: true,
        isVeg: true,
      }
    ],
    wifiDetails: {
      ssid: "CafeHarbour_5G",
      password: "harbour@2026"
    }
  }
};

export const HASH_MAPPINGS: Record<string, QRMapping> = {
  // Mio Amore Cafe Tables
  "mdbhjsadjasdgjafcvcsj3213h2veg24gh234h": {
    restaurantId: "REST001",
    restaurantNameEn: "Mio Amore Cafe",
    restaurantNameBn: "মিও আমোরে ক্যাফে",
    tableNumber: "01"
  },
  "mioamore5678": {
    restaurantId: "REST001",
    restaurantNameEn: "Mio Amore Cafe",
    restaurantNameBn: "মিও আমোরে ক্যাফে",
    tableNumber: "05"
  },
  // Spice Garden Table
  "spicegarden1234": {
    restaurantId: "REST002",
    restaurantNameEn: "Spice Garden",
    restaurantNameBn: "স্পাইস গার্ডেন",
    tableNumber: "04"
  },
  // Cafe Harbour Table
  "cafeharbour9012": {
    restaurantId: "REST003",
    restaurantNameEn: "Cafe Harbour",
    restaurantNameBn: "ক্যাফে হারবার",
    tableNumber: "03"
  }
};
