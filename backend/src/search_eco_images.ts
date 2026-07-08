import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const tableInfo: any = await prisma.$queryRawUnsafe(`PRAGMA table_info(Subdivision)`);
  tableInfo.forEach((col: any) => {
    console.log(`Column: ${col.name}, Type: ${col.type}`);
  });

  const subs: any = await prisma.$queryRawUnsafe(`SELECT * FROM Subdivision WHERE projectId = 1396`);
  console.log("Subdivisions for project 1396:");
  subs.forEach((sub: any) => {
    console.log(`- ID: ${sub.id}, Name: ${sub.name}, code: ${sub.code}`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
