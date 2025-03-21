"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

const images = ["/galeria1.jpg", "/galeria2.jpg", "/galeria3.jpg"];

export default function Carrousel() {
  return (
    <Swiper navigation modules={[Navigation]} className="w-full h-[700px]">
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <Image src={src} alt={`Imagen ${index + 1}`} layout="fill" objectFit="cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
