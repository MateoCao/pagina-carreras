"use client";

import SectionForm from '../components/SectionForm';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/login",
    });
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "authenticated") {
    return (
      <div className="container mx-auto p-4 min-h-lvh">
        <div className='flex justify-between'>
          <h2 className="text-2xl font-bold mb-6">Administrar Secciones</h2>
          <button className='bg-blue-500 rounded hover:bg-blue-600 cursor-pointer font-bold text-sm p-1' onClick={handleSignOut}>Cerrar sesión</button>
        </div>
        <div className=" text-black">
          <SectionForm />
        </div>
      </div>
    );
  }

  return null;
}
