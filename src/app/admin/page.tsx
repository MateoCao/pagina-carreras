"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSignOut = () =>{
    signOut();
    router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data?.error) {
        alert(data.error);
      } else {
        // Redirigir a la nueva sección
        router.push(`/sections/${data.section.id}`);
      }
    } catch (error) {
      console.error("Error al crear la sección:", error);
      alert("Hubo un error al crear la sección.");
    }
  };

  return (
    <div>
      <h1>Crear nueva sección</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título de la sección</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="content">Contenido de la sección</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="file">Subir archivo (opcional)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept="image/*, .pdf, .docx" // Acepta solo algunos tipos de archivos
          />
        </div>

        <div>
          <button type="submit">Crear sección</button>
        </div>
      </form>
      <div>
        <button onClick={() => handleSignOut()}>Cerrar sesión</button>
      </div>
    </div>
  );
}
