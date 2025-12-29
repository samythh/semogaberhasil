// File: src/types/strapi-blocks.ts

// 1. Pastikan Anda punya definisi untuk Image Strapi
export interface StrapiImage {
   url: string;
   alternativeText?: string;
   width?: number;
   height?: number;
}

// 2. Update interface LinkItem (Sesuai nama error Anda)
export interface LinkItem {
   id: number;
   label: string;
   destinationUrl: string;
   // Hapus 'iconName' jika masih ada
   // Tambahkan 'image' di bawah ini:
   image?: StrapiImage;
}

// 3. Pastikan QuickLinksBlock menggunakan LinkItem tersebut
export interface QuickLinksBlock {
   __component: "sections.quick-links";
   id: number;
   title: string;
   links: LinkItem[];
}