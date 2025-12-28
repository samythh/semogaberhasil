// File: src/components/blocks/QuickLinks.tsx
import React from 'react';
import Link from 'next/link';
import {
   UserPlus,
   Leaf,
   Globe,
   BookOpen,
   Link as LinkIcon,
   Info,
   GraduationCap,
   Key,
   Monitor,
   LucideIcon
} from 'lucide-react';
import { QuickLinksBlock } from '@/types/strapi-blocks';

interface QuickLinksProps {
   data: QuickLinksBlock;
}

// 1. ICON MAPPING
const iconMap: Record<string, LucideIcon> = {
   'user-plus': UserPlus,
   'leaf': Leaf,
   'monitor': Monitor,
   'key': Key,
   'book-open': BookOpen,
   'graduation-cap': GraduationCap,
   'globe': Globe,
   'info': Info,
   'default': LinkIcon
};

// 2. COLOR PALETTE CYCLING
// Karena data Strapi belum tentu punya info warna, kita buat urutan warna 
// agar tetap terlihat cantik seperti desain yang Anda minta.
const COLOR_THEMES = [
   { text: "text-blue-600", bg: "bg-blue-100" },     // Item 1
   { text: "text-green-600", bg: "bg-green-100" },   // Item 2
   { text: "text-orange-600", bg: "bg-orange-100" }, // Item 3
   { text: "text-purple-600", bg: "bg-purple-100" }, // Item 4
   { text: "text-teal-600", bg: "bg-teal-100" },     // Item 5
   { text: "text-red-600", bg: "bg-red-100" },       // Item 6 (jika ada lebih)
];

export default function QuickLinks({ data }: QuickLinksProps) {
   // Validasi data
   if (!data || !data.links) return null;

   return (
      // Background Hijau Tua sesuai request (bg-[#749F74])
      <section className="bg-[#749F74] py-24">
         <div className="container mx-auto px-4">

            {/* Container Putih Utama (Floating Card) */}
            <div className="bg-white max-w-5xl mx-auto rounded-xl shadow-2xl p-8 md:p-10 relative z-10">

               {/* Header Judul */}
               <div className="text-center mb-10">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 relative inline-block">
                     {data.title}
                     {/* Elemen dekoratif garis bawah */}
                     <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#749F74] rounded-full"></span>
                  </h2>
               </div>

               {/* Grid Layout */}
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {data.links.map((link, index) => {
                     // Logic Dynamic Icon
                     const IconComponent = iconMap[link.iconName] || iconMap['default'];

                     // Logic Dynamic Color: Mengambil tema berdasarkan urutan index
                     // Menggunakan modulus (%) agar jika item > 6, warna kembali ke awal
                     const theme = COLOR_THEMES[index % COLOR_THEMES.length];

                     // Logic External Link
                     const isExternal = link.destinationUrl.startsWith('http');

                     return (
                        <Link
                           key={link.id}
                           href={link.destinationUrl}
                           target={isExternal ? '_blank' : '_self'}
                           className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1"
                        >
                           {/* Kotak Ikon Besar */}
                           <div className={`
                    flex items-center justify-center 
                    w-20 h-20 md:w-24 md:h-24 
                    rounded-2xl shadow-sm 
                    transition-transform duration-300 group-hover:scale-110
                    ${theme.bg} 
                  `}>
                              <IconComponent
                                 className={`w-8 h-8 md:w-10 md:h-10 ${theme.text}`}
                              />
                           </div>

                           {/* Teks Judul Menu */}
                           <span className="text-sm md:text-base font-bold text-gray-700 text-center group-hover:text-[#749F74] transition-colors leading-tight px-2">
                              {link.label}
                           </span>
                        </Link>
                     );
                  })}
               </div>

            </div>
         </div>
      </section>
   );
}