// Shapes of the JSON files in src/content/. Agents filling content must match these.

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  group?: string;
  featured?: boolean;
}
export interface MenuCategory { id: string; name: string; items: MenuItem[] }
export interface Menu { source: string; capturedAt: string; notes?: string; categories: MenuCategory[] }

// src/content/pillars.json: exactly 3
export interface Pillar { title: string; body: string }

// src/content/reviews.json. `placeholder: true` items show as "[Review quote]" until real ones are approved
export interface Review { quote: string; author: string; source: 'Yelp' | 'Google' | 'Birdeye'; placeholder?: boolean }

// src/content/faq.json
export interface Faq { q: string; a: string }

// src/content/instagram.json: post links + local image paths under /public/instagram (empty src = placeholder)
export interface InstaPost { href: string; src: string; alt: string }

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
