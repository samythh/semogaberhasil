// File: src/types/strapi-blocks.ts

// --- 1. Base Image Types ---
export interface StrapiImageFormat {
   ext: string;
   url: string;
   hash: string;
   mime: string;
   name: string;
   path: string | null;
   size: number;
   width: number;
   height: number;
   sizeInBytes: number;
}

export interface StrapiImage {
   id: number;
   documentId: string;
   name: string;
   alternativeText: string | null;
   caption: string | null;
   width: number;
   height: number;
   formats: {
      large?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      thumbnail?: StrapiImageFormat;
   } | null;
   hash: string;
   ext: string;
   mime: string;
   size: number;
   url: string;
   previewUrl: string | null;
   provider: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
}

// --- 2. Component: Hero Slider ---
export interface Slide {
   id: number;
   title: string;
   subtitle: string | null;
   buttonText: string | null;
   buttonLink: string | null;
   image: StrapiImage;
}

export interface HeroSliderBlock {
   __component: "sections.hero-slider";
   id: number;
   slides: Slide[];
}

// --- 3. Component: Quick Links ---
export interface LinkItem {
   id: number;
   label: string;
   destinationUrl: string;
   iconName: string; // Contoh: "user-plus", "leaf"
}

export interface QuickLinksBlock {
   __component: "sections.quick-links";
   id: number;
   title: string;
   links: LinkItem[];
}

// --- 4. Component: Rich Text (Persiapan Masa Depan) ---
// Saya tambahkan ini sebagai placeholder agar Anda tahu cara menambah block baru
export interface RichTextBlock {
   __component: "sections.rich-text";
   id: number;
   content: string; // Biasanya Markdown atau HTML string
}

// --- 5. Union Type (Penggabungan Semua Block) ---
// Tambahkan block baru di sini menggunakan operator '|'
export type StrapiBlock =
   | HeroSliderBlock
   | QuickLinksBlock
   | RichTextBlock;