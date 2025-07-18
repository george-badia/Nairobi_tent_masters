export interface Product {
  id: string;
  name: string;
  category: 'Camping' | 'Corporate' | 'Events' | 'Accessories';
  price: number;
  description: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'custom' | 'admin' | 'gallery';

export interface CustomOrderResponse {
    summary: string;
    materials: string[];
    estimatedPriceKES: number;
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}

export interface CustomOrderSubmission {
    id: string;
    customer: CustomerInfo;
    proposal: CustomOrderResponse;
    submittedAt: string; // ISO date string
    status: 'New' | 'Contacted';
}

export type GalleryCategory = 'Weddings' | 'Safari' | 'Corporate' | 'Festivals';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  story: string;
}

export interface Testimonial {
  id: string;
  name: string;
  event: string;
  quote: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
