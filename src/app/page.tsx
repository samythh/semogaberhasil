// File: src/app/page.tsx
import { fetchAPI } from "@/lib/strapi/fetcher";
import BlockRenderer from "@/components/BlockRenderer";
import { StrapiBlock } from "@/types/strapi-blocks";
import qs from "qs"; // Import library qs

// Ambil data dari Strapi
async function getHomepageData() {
  try {
    // STANDAR INDUSTRI: Menggunakan Object untuk Query
    // Ini jauh lebih mudah dibaca daripada string manual "populate[0]=..."
    const query = qs.stringify(
      {
        populate: {
          blocks: {
            on: {
              // 1. Khusus untuk Hero Slider, ambil slides dan gambarnya
              "sections.hero-slider": {
                populate: {
                  slides: {
                    populate: {
                      image: {
                        fields: ["url", "alternativeText", "width", "height"],
                      },
                    },
                  },
                },
              },
              // 2. Khusus untuk Quick Links, ambil links-nya
              "sections.quick-links": {
                populate: {
                  links: {
                    populate: "*",
                  },
                },
              },
              // 3. Jika nanti ada blok baru (misal: RichText), tambahkan di sini...
            },
          },
        },
      },
      {
        encodeValuesOnly: true, // Opsi wajib untuk Strapi agar kurung sikunya rapi
      }
    );

    // Hasil query string di atas otomatis menjadi:
    // ?populate[blocks][on][sections.hero-slider][populate]... dst

    const res = await fetchAPI(`/homepage?${query}`);
    return res.data;

  } catch (error) {
    console.error("Gagal mengambil data homepage:", error);
    return null;
  }
}

export default async function Home() {
  const strapiData = await getHomepageData();

  // Casting data agar TypeScript mengerti strukturnya
  const blocks = (strapiData?.blocks || []) as StrapiBlock[];

  return (
    <main className="min-h-screen flex flex-col">
      <BlockRenderer blocks={blocks} />
    </main>
  );
}