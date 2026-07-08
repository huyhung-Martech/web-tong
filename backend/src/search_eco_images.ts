import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.$queryRawUnsafe(`SELECT id, name, slug, estateType FROM Project WHERE name LIKE '%ECO%' OR slug LIKE '%eco%'`);
  console.log(JSON.stringify(projects, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
