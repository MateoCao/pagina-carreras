import Image from "next/image";
import Carrousel from "./components/Carrusel";
import Hero from "./components/Hero";

export default async function PublicSections() {

  return (
    <div className="">
      <Hero />
      <section className="container mx-auto p-4 flex flex-col gap-5">
        <h3 className="text-2xl font-bold">
          Calendario
        </h3>
        <div className="w-full">
          <Image 
            className="mx-auto"
            src="/calendario.png" 
            alt="calendario" 
            width={700} 
            height={700} 
          />
        </div>
      </section>
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Galería</h2>
          <Carrousel />
        </div>
      </section>
    </div>
  );
}