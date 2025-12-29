// File: src/components/blocks/QuickLinks.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/strapi/utils';
import { QuickLinksBlock } from '@/types/strapi-blocks';

interface QuickLinksProps {
   data: QuickLinksBlock;
}

export default function QuickLinks({ data }: QuickLinksProps) {
   // Guard clause: Jika data tidak ada atau links kosong, jangan render apapun
   if (!data || !data.links) return null;

   return (
      <section className="bg-[#749F74] py-20">
         <div className="container mx-auto px-4">

            {/* Container Putih Utama */}
            <div className="bg-white max-w-6xl mx-auto rounded-xl shadow-2xl p-8 md:p-12 relative z-10">

               {/* HEADER: Besar, Bold, Tanpa Garis Hiasan */}
               <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                     {data.title}
                  </h2>
               </div>

               {/* GRID SYSTEM:
             - grid-cols-2: HP (2 kolom)
             - sm:grid-cols-3: Tablet Kecil (3 kolom)
             - lg:grid-cols-5: Laptop/PC (5 kolom)
             - gap-4: Jarak antar item dirapatkan
          */}
               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 justify-center">
                  {data.links.map((link) => {
                     // Proses URL gambar dari Strapi
                     const imageUrl = getStrapiMedia(link.image?.url);

                     // Cek apakah link eksternal (http) atau internal
                     const isExternal = link.destinationUrl.startsWith('http');

                     return (
                        <Link
                           key={link.id}
                           href={link.destinationUrl}
                           target={isExternal ? '_blank' : '_self'}
                           className="group flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1"
                        >
                           {/* Container Gambar */}
                           <div className="relative w-16 h-16 md:w-20 md:h-20 mb-3 drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                              {imageUrl ? (
                                 <Image
                                    src={imageUrl}
                                    alt={link.image?.alternativeText || link.label}
                                    fill
                                    sizes="(max-width: 768px) 64px, 80px"
                                    className="object-contain"
                                 />
                              ) : (
                                 // Fallback: Jika gambar belum diupload di Strapi
                                 <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                                    <span className="text-[10px] text-gray-400 font-semibold text-center leading-tight px-1">
                                       No IMG
                                    </span>
                                 </div>
                              )}
                           </div>

                           {/* Label Teks Link */}
                           <span className="text-sm md:text-base font-bold text-gray-700 text-center group-hover:text-[#005320] transition-colors leading-tight px-1">
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