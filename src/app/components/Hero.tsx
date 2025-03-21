"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import Image from "next/image";
import Link from "next/link";

const images = ["/galeria1.jpg", "/galeria2.jpg", "/galeria3.jpg"];

export default function Hero() {
  return (
    <section className="relative  h-screen flex z-10 items-center justify-center text-center text-white w-[calc(100vw-255px)]">
      {/* Swiper para el fondo */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        allowTouchMove={false}  // ❌ Desactiva el swipe manual
  navigation={false}       // ❌ Quita flechas de navegación
  pagination={{ clickable: false }}  // ❌ Desactiva los dots de paginación
        className="absolute left-0 w-full h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="absolute left-0 w-full h-full">
              <Image
                src={src}
                alt={`Circuito TC 2000 - Imagen ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Contenido del Hero */}
      <div className="absolute z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">TC 2000 Argentina</h1>
        <p className="text-xl md:text-2xl mb-6">La pasión por la velocidad en cada vuelta</p>
        <button className="bg-gray-800 cursor-pointer hover:bg-gray-700 text-white py-2 px-6 rounded-lg transition">
            <Link href={"/livetiming"}>
                Ver resultados en vivo
            </Link>
        </button>
      </div>
    </section>
  );
}
