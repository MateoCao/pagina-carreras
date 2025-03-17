import { NextResponse } from "next/server";
import { s3 } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

// app/api/upload/route.ts
export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const uniqueName = `${uuidv4()}-${file.name}`;
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: `uploads/${uniqueName}`,
      Body: buffer,
      ContentType: file.type,
    }));

    return NextResponse.json({
      url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/uploads/${uniqueName}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}
