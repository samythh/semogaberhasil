// File: src/components/layout/Navbar/NavbarClient.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";

import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { NavbarItem, MenuSection } from "@/types/strapi-layout";

interface NavbarClientProps {
   menuItems: NavbarItem[];
   logoUrl: string;
}

export default function NavbarClient({
   menuItems,
   logoUrl,
}: NavbarClientProps) {
   const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
   const [isVisible, setIsVisible] = React.useState(true);
   const lastScrollY = React.useRef(0);
   const [logoError, setLogoError] = React.useState(false);

   // --- LOGIC SCROLL (Hanya untuk Hide/Show, tidak lagi untuk warna) ---
   React.useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;

         // Sembunyikan navbar jika scroll ke bawah > 20px
         if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
            setIsVisible(false);
         } else {
            setIsVisible(true);
         }

         lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

   // --- RENDER DROPDOWN ---
   const renderDropdownSection = (section: MenuSection, index: number) => (
      // 'w-max' di sini memastikan kolom mengikuti lebar teks terpanjang
      <div key={section.id ?? index} className="group/section mb-0 break-inside-avoid min-w-[200px]">
         <div className="flex items-center gap-2 mb-3 px-2">
            <span className="h-4 w-1 bg-green-600 rounded-full block" />
            <h4 className="text-xs font-bold text-black uppercase tracking-widest whitespace-nowrap">
               {section.title}
            </h4>
         </div>

         <ul className="grid gap-1">
            {section.links.map((link, idx) => (
               <li key={link.id ?? idx}>
                  <NavigationMenuLink asChild>
                     <Link
                        href={link.url}
                        className={cn(
                           "group/link flex items-center justify-between w-full p-2.5 rounded-lg",
                           "text-sm font-medium text-gray-700",
                           "hover:bg-green-50 hover:text-green-700",
                           "transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)]",
                           "whitespace-nowrap" // Mencegah teks turun ke baris baru
                        )}
                     >
                        <div className="flex items-center gap-2">
                           <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 text-green-600" />
                           <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                              {link.label}
                           </span>
                        </div>
                     </Link>
                  </NavigationMenuLink>
               </li>
            ))}
         </ul>
      </div>
   );

   return (
      <nav
         className={cn(
            "fixed top-0 left-0 right-0 z-50",
            // PERUBAHAN 1: Warna Hijau Permanen (Solid)
            // Tidak ada lagi logic 'isScrolled ? ... : ...'
            "bg-[#005320] border-b border-white/10 shadow-md",
            "text-white py-3", // Padding fix (tidak berubah-ubah)

            "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
            isVisible ? "translate-y-0" : "-translate-y-full"
         )}
      >
         <div className="container mx-auto flex items-center justify-between px-4">

            {/* === LOGO === */}
            <Link
               href="/"
               className="flex items-center gap-4 group"
            >
               <div className="relative shrink-0 rounded-full h-10 w-10 bg-white/10 p-1.5 transition-transform duration-500 group-hover:scale-105 group-hover:bg-white/20">
                  {!logoError && (
                     <Image
                        src={logoUrl}
                        alt="Logo"
                        width={40}
                        height={40}
                        className="object-contain w-full h-full drop-shadow-md"
                        onError={() => setLogoError(true)}
                     />
                  )}
               </div>

               <div className="h-8 w-px bg-white/20 hidden sm:block" />

               <div className="flex flex-col justify-center">
                  <span className="font-bold tracking-wide leading-tight group-hover:text-yellow-400 transition-colors duration-300 text-sm md:text-base">
                     Departemen Proteksi Tanaman
                  </span>
                  <span className="text-xs font-medium text-gray-200 tracking-wider hidden sm:block uppercase opacity-90">
                     Fakultas Pertanian
                  </span>
               </div>
            </Link>

            {/* === DESKTOP MENU === */}
            <NavigationMenu className="hidden lg:flex">
               <NavigationMenuList className="gap-2">
                  {menuItems.map((item, index) => (
                     <NavigationMenuItem key={item.id ?? index}>
                        {item.sections?.length ? (
                           <>
                              <NavigationMenuTrigger
                                 className={cn(
                                    "group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-5 py-2 text-sm font-semibold transition-all duration-300",
                                    "hover:bg-white/15 hover:text-white focus:bg-white/20 focus:text-white",
                                    "data-[state=open]:bg-white/20 data-[state=open]:text-yellow-400"
                                 )}
                              >
                                 {item.label}
                              </NavigationMenuTrigger>

                              <NavigationMenuContent>
                                 {/* PERUBAHAN 2: Dropdown Fit Content */}
                                 {/* w-max: Lebar mengikuti isi (Intrinsic Width) */}
                                 {/* flex: Agar section berjejer ke samping jika ada lebih dari satu */}
                                 <div className="w-max min-w-[15rem] p-5 bg-white rounded-xl shadow-2xl border-t-4 border-green-600">
                                    <div className="flex flex-row gap-8">
                                       {item.sections.map(renderDropdownSection)}
                                    </div>
                                 </div>
                              </NavigationMenuContent>
                           </>
                        ) : (
                           <NavigationMenuLink asChild>
                              <Link
                                 href={item.url ?? "#"}
                                 className={cn(
                                    "group inline-flex h-10 w-max items-center justify-center rounded-full bg-transparent px-5 py-2 text-sm font-semibold transition-all duration-300",
                                    "hover:bg-white/15 hover:text-white focus:bg-white/20 focus:text-white"
                                 )}
                              >
                                 {item.label}
                              </Link>
                           </NavigationMenuLink>
                        )}
                     </NavigationMenuItem>
                  ))}
               </NavigationMenuList>
            </NavigationMenu>

            {/* === RIGHT ICONS & MOBILE TOGGLE === */}
            <div className="flex items-center gap-3">
               <button className="p-2.5 rounded-full text-white/80 hover:bg-white/15 hover:text-white transition-all duration-300 hover:rotate-12">
                  <Search className="w-5 h-5" />
               </button>

               <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 rounded-full hover:bg-white/15 transition-colors"
               >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </div>

         {/* === MOBILE MENU === */}
         <div
            className={cn(
               "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden",
               mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
            )}
            onClick={() => setMobileMenuOpen(false)}
         />

         <div
            className={cn(
               "fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:hidden",
               mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
         >
            <div className="flex flex-col h-full">
               <div className="p-5 bg-[#005320] flex items-center justify-between">
                  <span className="font-bold text-white text-lg">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white/10 rounded-full text-white">
                     <X className="w-5 h-5" />
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto py-4 px-2">
                  <ul className="space-y-2">
                     {menuItems.map((item, index) => (
                        <li key={item.id ?? index} className="border-b border-gray-100 last:border-0 pb-2">
                           {item.sections?.length ? (
                              <details className="group/mobile">
                                 <summary className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 text-gray-800 font-bold cursor-pointer list-none">
                                    {item.label}
                                    <ChevronDown className="w-4 h-4 transition-transform group-open/mobile:rotate-180 text-gray-400" />
                                 </summary>
                                 <div className="px-3 pt-2 pb-4 space-y-4">
                                    {item.sections.map(section => (
                                       <div key={section.id}>
                                          <h5 className="text-xs font-bold text-green-700 uppercase tracking-widest mb-2 pl-2 border-l-2 border-green-200">
                                             {section.title}
                                          </h5>
                                          <ul className="space-y-1 pl-2">
                                             {section.links.map(link => (
                                                <li key={link.id}>
                                                   <Link
                                                      href={link.url}
                                                      onClick={() => setMobileMenuOpen(false)}
                                                      className="block py-2 px-3 text-sm text-gray-600 rounded hover:bg-gray-100 hover:text-green-700 transition-colors"
                                                   >
                                                      {link.label}
                                                   </Link>
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                    ))}
                                 </div>
                              </details>
                           ) : (
                              <Link
                                 href={item.url ?? "#"}
                                 onClick={() => setMobileMenuOpen(false)}
                                 className="block p-3 rounded-lg hover:bg-green-50 text-gray-800 font-bold"
                              >
                                 {item.label}
                              </Link>
                           )}
                        </li>
                     ))}
                  </ul>
               </div>

               <div className="p-5 bg-gray-50 text-center">
                  <p className="text-xs text-gray-400">© 2025 Proteksi Tanaman UNAND</p>
               </div>
            </div>
         </div>
      </nav>
   );
}