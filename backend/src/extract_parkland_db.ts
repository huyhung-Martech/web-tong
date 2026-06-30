import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const projectSlug = 'imperia-ocean-city-the-parkland';
  
  // 1. Lấy thông tin dự án
  const project = await prisma.project.findUnique({
    where: { slug: projectSlug }
  });

  if (!project) {
    console.error('Không tìm thấy dự án với slug:', projectSlug);
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

  const outputPath = path.join(__dirname, '../../extracted_parkland_db.json');
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
