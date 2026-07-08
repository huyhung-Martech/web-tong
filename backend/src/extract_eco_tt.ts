import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const projectSlug = 'eco-central-parktt';
  
  // 1. Lấy thông tin dự án
  const project = await prisma.project.findUnique({
    where: { slug: projectSlug }
  });

  if (!project) {
    console.error('Không tìm thấy dự án với slug:', projectSlug);
    // Liệt kê toàn bộ dự án hiện có
    const allProjects = await prisma.project.findMany({
      select: { id: true, name: true, slug: true }
    });
    console.log('Tất cả dự án trong DB:', allProjects);
    return;
  }

  // 2. Lấy danh sách các tòa nhà/phân khu của dự án
  const subdivisions = await prisma.subdivision.findMany({
    where: { projectId: project.id }
  });

  const subIds = subdivisions.map(s => s.id);

  // 3. Lấy toàn bộ căn hộ trong các tòa nhà đó
  const products = await prisma.product.findMany({
    where: {
      subdivisionId: { in: subIds }
    }
  });

  // 4. Tổ hợp dữ liệu
  const fullData = {
    project,
    subdivisions,
    products
  };

  const outputPath = path.join(__dirname, '../../extracted_eco_tt.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullData, null, 2), 'utf8');
  console.log(`Đã xuất dữ liệu thành công ra: ${outputPath}`);
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
