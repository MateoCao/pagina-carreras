/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sectionId]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "createdAt",
ADD COLUMN     "sectionId" INTEGER,
ADD COLUMN     "tableData" JSONB,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Content_sectionId_key" ON "Content"("sectionId");
