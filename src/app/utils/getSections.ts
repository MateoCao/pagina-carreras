import { prisma } from "@/lib/prisma";
export async function getSections() {
    const sections = await prisma.section.findMany();
    return sections;
  }