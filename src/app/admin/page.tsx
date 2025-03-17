"use client";

import SectionForm from '../components/SectionForm';
import SectionTree from '../components/SectionTree';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Espera a que la sesión esté cargada antes de hacer la redirección
  useEffect(() => {
    if (status === "loading") {
      return; // Esperar a que se cargue la sesión antes de hacer cualquier cosa
    }

    if (!session) {
      // Si no está autenticado, redirige a la página de login
      router.push("/login");
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({
      redirect: true, // Redirige a la página de login después de cerrar sesión
      callbackUrl: "/login", // La URL a la que se redirige después del cierre de sesión
    });
  };

  if (status === "loading") {
    return <p>Loading...</p>; // Puedes mostrar un loading mientras se verifica la sesión
  }

  if (status === "authenticated") {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Administrar Secciones</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-black">
          <SectionForm />
          <SectionTree />
        </div>
        <button onClick={handleSignOut}>CERRAR SESION</button>
      </div>
    );
  }

  return null; // Devolver nada mientras la sesión se está verificando
}
