// File: src/lib/strapi/utils.ts

export function getStrapiURL(path = "") {
   // PERBAIKAN: Tambahkan ${path} di akhir string
   return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"}${path}`;
}

export function getStrapiMedia(url: string | null | undefined) {
   if (url == null) return null;
   if (url.startsWith("http") || url.startsWith("//")) return url;
   return `${getStrapiURL()}${url}`;
}