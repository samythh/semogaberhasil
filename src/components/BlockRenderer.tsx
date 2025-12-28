// File: src/components/BlockRenderer.tsx
import React from "react";
import HeroSlider from "@/components/blocks/HeroSlider";
import QuickLinks from "@/components/blocks/QuickLinks";
import { StrapiBlock } from "@/types/strapi-blocks";

interface BlockRendererProps {
   blocks: StrapiBlock[];
}

export default function BlockRenderer({ blocks }: BlockRendererProps) {
   if (!blocks) return null;

   return (
      <>
         {blocks.map((block, index) => {
            // block.__component adalah kunci dari Strapi
            switch (block.__component) {
               case "sections.hero-slider":
                  return <HeroSlider key={`${block.__component}-${index}`} data={block} />;

               case "sections.quick-links":
                  return <QuickLinks key={`${block.__component}-${index}`} data={block} />;

               case "sections.rich-text":
                  return (
                     <div key={index} className="container mx-auto py-8 prose">
                        <p>Rich Text Block Placeholder</p>
                     </div>
                  );

               default:
                  // Fallback untuk block yang belum dibuat komponennya
                  if (process.env.NODE_ENV === 'development') {
                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
                     const unknownBlock = block as any;
                     console.warn(`Component ${unknownBlock.__component} belum terdaftar di BlockRenderer`);
                     return (
                        <div key={index} className="p-4 bg-yellow-100 text-yellow-800 border border-yellow-300 my-4 rounded">
                           ⚠️ Komponen <strong>{unknownBlock.__component}</strong> ditemukan di Strapi tapi belum ada di Next.js
                        </div>
                     );
                  }
                  return null;
            }
         })}
      </>
   );
}