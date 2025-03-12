-- CreateTable
CREATE TABLE "Archivo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archivo_pkey" PRIMARY KEY ("id")
);
