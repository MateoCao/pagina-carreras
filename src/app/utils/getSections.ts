import { prisma } from "@/lib/prisma";
export async function getSections() {
    return await prisma.section.findMany();
  }