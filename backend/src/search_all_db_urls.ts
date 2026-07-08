import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  console.log(`Checking ${projects.length} projects for ECP/Ecopark image URLs...`);

  const regex = /https?:\/\/[^\s"'`<>]+(?:jpg|jpeg|png|webp|gif)/gi;

  projects.forEach((p: any) => {
    const stringified = JSON.stringify(p);
    const matches = stringified.match(regex);
    if (matches) {
      const ecoparkMatches = matches.filter(url => 
        url.toLowerCase().includes('eco') || 
        url.toLowerCase().includes('vinh') ||
        url.toLowerCase().includes('nghe')
      );
      if (ecoparkMatches.length > 0) {
        console.log(`- Project ID: ${p.id}, Slug: ${p.slug}, Name: ${p.name}`);
        console.log(`  Found ${ecoparkMatches.length} matching URLs:`);
        ecoparkMatches.slice(0, 10).forEach(url => console.log(`    ${url}`));
      }
    }
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
