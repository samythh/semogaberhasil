// File: components/ui/footer.tsx
import Image from "next/image";
import { Mail, Phone, Instagram, Youtube } from "lucide-react";

// Tipe data yang diharapkan dari Strapi (nanti akan kita mapping)
interface FooterData {
   address: string[];
   partners: {
      id: number;
      src: string;
      alt: string;
      width: number; // Next/Image butuh width/height atau fill
      height: number;
   }[];
   socials: {
      instagram: string;
      youtube: string;
   };
   contact: {
      email: string;
      phones: string[];
   };
   mapUrl: string;
}

// Fungsi simulasi fetch data (Nanti diganti fetch ke API Strapi)
async function getFooterData(): Promise<FooterData> {
   return {
      address: [
         "Departemen Proteksi Tanaman",
         "Fakultas Pertanian",
         "Universitas Andalas",
         "Kampus Unand Limau Manis",
         "Padang",
         "25163",
      ],
      partners: [
         // Pastikan path gambar benar di folder public/images
         { id: 1, src: "/images/logo-kedjayan.png", alt: "Logo Kedjayan Bangsa", width: 150, height: 60 },
         { id: 2, src: "/images/logo-diktisaintek.png", alt: "Logo Diktisaintek", width: 150, height: 60 },
      ],
      socials: {
         instagram: "https://instagram.com/proteksitanaman_unand",
         youtube: "https://youtube.com/@proteksitanamanunand",
      },
      contact: {
         email: "proteksitanaman@agr.unand.ac.id",
         phones: ["(+62) 751 72701-72702", "(+62) 751 72702"],
      },
      // URL Embed Google Maps
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.310046395356!2d100.45869437496516!3d-0.9145946990765954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b7964461877b%3A0x29469858f6458d94!2sUniversitas%20Andalas!5e0!3m2!1sid!2sid!4v1703837000000!5m2!1sid!2sid",
   };
}

export default async function Footer() {
   const data = await getFooterData();

   return (
      <footer className="bg-[#005700] text-white pt-12 font-sans border-t border-white/10 flex flex-col justify-between h-full">
         <div className="container mx-auto px-8 md:px-12 lg:px-24 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

               {/* KOLOM 1: Alamat & Mitra */}
               <div className="space-y-6">
                  <div>
                     <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">
                        TEMUKAN KAMI
                     </h3>
                     <div className="space-y-1 text-sm text-gray-100 leading-relaxed font-medium">
                        {data.address.map((line, index) => (
                           <p key={index}>{line}</p>
                        ))}
                     </div>
                  </div>

                  {/* FIX: Menggunakan Next Image untuk Mitra */}
                  <div className="flex items-center gap-4 pt-4">
                     {data.partners.map((partner) => (
                        <div key={partner.id} className="relative h-12 w-auto min-w-[100px]">
                           {/* Menggunakan object-contain agar logo tidak terpotong.
                    'sizes' membantu browser memilih ukuran gambar yang tepat.
                  */}
                           <Image
                              src={partner.src}
                              alt={partner.alt}
                              width={partner.width}
                              height={partner.height}
                              className="h-full w-auto object-contain"
                              style={{ height: '3rem', width: 'auto' }} // Memaksa tinggi h-12 (3rem)
                           />
                        </div>
                     ))}
                  </div>
               </div>

               {/* KOLOM 2: Sosmed & Kontak */}
               <div className="flex flex-col space-y-8">
                  <div className="text-center">
                     <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">
                        IKUTI KAMI
                     </h3>
                     <div className="flex justify-center gap-6">
                        <a
                           href={data.socials.instagram}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                           aria-label="Kunjungi Instagram Kami" // Aksesibilitas tambahan
                        >
                           <Instagram className="w-6 h-6 text-white" />
                        </a>
                        <a
                           href={data.socials.youtube}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-all"
                           aria-label="Kunjungi Youtube Kami" // Aksesibilitas tambahan
                        >
                           <Youtube className="w-6 h-6 text-white" />
                        </a>
                     </div>
                  </div>

                  <div className="text-center">
                     <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider">
                        KONTAK KAMI
                     </h3>
                     <div className="w-fit mx-auto">
                        <ul className="space-y-3 text-sm flex flex-col items-start">
                           <li className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-gray-300 shrink-0" />
                              <a
                                 href={`mailto:${data.contact.email}`}
                                 className="hover:text-white underline decoration-dotted text-left"
                              >
                                 {data.contact.email}
                              </a>
                           </li>
                           {data.contact.phones.map((phone, index) => (
                              <li key={index} className="flex items-center gap-3">
                                 <Phone className="w-5 h-5 text-gray-300 shrink-0" />
                                 <span className="text-left">{phone}</span>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>

               {/* KOLOM 3: Peta */}
               <div className="flex flex-col md:items-end items-center text-center md:text-right">
                  <h3 className="font-bold text-lg mb-4 text-white uppercase tracking-wider w-full md:w-fit">
                     LOKASI KAMI
                  </h3>

                  <div className="w-full max-w-[280px] h-56 bg-gray-200 rounded-lg overflow-hidden shadow-lg border-2 border-white/20 relative">
                     {/* FIX: Menambahkan atribut 'title' untuk aksesibilitas */}
                     <iframe
                        title="Peta Lokasi Departemen Proteksi Tanaman Universitas Andalas"
                        src={data.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                     ></iframe>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                     Klik peta untuk melihat rute
                  </p>
               </div>
            </div>
         </div>

         <div className="w-full">
            <div className="bg-[#004200] py-3 text-center border-t border-white/5 relative z-10">
               <p className="text-xs text-gray-300 px-4">
                  © {new Date().getFullYear()} Departemen Proteksi Tanaman, Universitas Andalas. Hak Cipta Dilindungi.
               </p>
            </div>

            <div className="w-full h-8 md:h-12 relative bg-[#002900]">
               {/* Background pattern menggunakan Image fill */}
               <Image
                  src="/images/pattern-batik.png"
                  alt="Motif Batik"
                  fill
                  className="object-cover opacity-60"
                  sizes="100vw"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#005700]/50"></div>
            </div>
         </div>
      </footer>
   );
}