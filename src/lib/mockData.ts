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


