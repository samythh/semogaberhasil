// File: src/types/strapi-layout.ts

// 1. Level Terbawah: Link Biasa
export interface StrapiLink {
   id: number;
   label: string;
   url: string;
}

// 2. Level Tengah: Group/Section di dalam Dropdown
export interface MenuSection {
   id: number;
   title: string;
   links: StrapiLink[];
}

// 3. Level Teratas: Item Navbar Utama
export interface NavbarItem {
   id: number;
   label: string;
   url: string | null; // Bisa null jika dia punya dropdown
   sections: MenuSection[];
}

// 4. Struktur Global Data
export interface GlobalData {
   navbar: NavbarItem[];
   // navbarLogo?: ... (jika ada logo)
}