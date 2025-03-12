import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/authConfig"; 
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await req.formData();
  const title = formData.get("title") as string
  const file = formData.get("file") as File;
  const content = formData.get("content") as string

  if (!file) {
    return NextResponse.json({ error: "Archivo no proporcionado" }, { status: 400 });
  }

  try {
    // Subir archivo a S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${Date.now()}-${file.name}`,
      Body: buffer,
      ContentType: file.type,
    };

    await s3.send(new PutObjectCommand(uploadParams));

    // Generar URL pública (asegúrate de que el bucket tenga permisos públicos)
    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;

    // Guardar URL en la base de datos (ejemplo con Prisma)
    const savedFile = await prisma.section.create({
      data: {
        title: title, // Modifica según tu modelo
        content: content,
        files: [fileUrl],
      },
    });

    return NextResponse.json({
      message: "Archivo subido exitosamente",
      url: fileUrl,
      section: savedFile,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error al subir el archivo" }, { status: 500 });
  }
}
