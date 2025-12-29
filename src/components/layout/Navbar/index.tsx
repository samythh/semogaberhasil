// File: src/components/layout/Navbar/index.tsx
import React from "react";
import NavbarClient from "./NavbarClient";
import { fetchAPI } from "@/lib/strapi/fetcher";
import qs from "qs";
import { NavbarItem } from "@/types/strapi-layout";
import { getStrapiMedia } from "@/lib/strapi/utils";

async function getGlobalData() {
   try {
      // Query Deep Populate
      // Global -> Navbar -> Sections -> Links
      const query = qs.stringify({
         populate: {
            navbar: {
               populate: {
                  sections: {
                     populate: {
                        links: { populate: true }
                     }
                  }
               }
            },
            // Jika Anda punya logo di Global
            navbarLogo: { fields: ["url", "alternativeText"] }
         }
      });

      const res = await fetchAPI(`/global?${query}`);
      return res.data;
   } catch (error) {
      console.error("Failed to fetch global data:", error);
      return null;
   }
}

export default async function Navbar() {
   const globalData = await getGlobalData();

   // Ambil data navbar, default ke array kosong jika gagal
   const navItems = (globalData?.navbar || []) as NavbarItem[];

   // Logic Logo (Opsional, jika sudah setup logo di strapi)
   const logoData = globalData?.navbarLogo;
   const logoUrl = getStrapiMedia(logoData?.url) || "/LogoUNAND.png";

   return <NavbarClient menuItems={navItems} logoUrl={logoUrl} />;
}