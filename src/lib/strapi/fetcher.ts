// File: src/lib/strapi/fetcher.ts

/**
 * Helper untuk menggabungkan path URL
 */
export function getStrapiURL(path = "") {
   return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

/**
 * Helper untuk menangani error response dari Strapi
 */
export async function fetchAPI(
   path: string,
   options = {}
) {
   try {
      // Menggabungkan options default dengan options dari parameter
      const mergedOptions = {
         headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, 
         },
         ...options,
      };

      // Build URL Request
      const requestUrl = getStrapiURL(`/api${path}`);

      // Trigger fetch
      const response = await fetch(requestUrl, mergedOptions);
      const data = await response.json();

      if (!response.ok) {
         console.error("Strapi Error:", data);
         throw new Error(`An error occurred please check console`);
      }

      return data;

   } catch (error) {
      console.error(error);
      throw new Error(`Gagal mengambil data dari Strapi pada path: ${path}`);
   }
}