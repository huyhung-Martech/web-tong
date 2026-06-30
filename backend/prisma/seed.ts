import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu cập nhật và seed cơ sở dữ liệu thực tế...');

  // 1. Dọn dẹp dữ liệu cũ
  await prisma.lockOrder.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.subdivision.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Đã dọn dẹp sạch cơ sở dữ liệu cũ.');

  // 2. Tạo tài khoản người dùng cá nhân (theo yêu cầu của User)
  const defaultAgent = await prisma.user.create({
    data: {
      phone: '0989151897',
      fullName: 'Phùng Huy Hưng',
      email: 'huyhung.utehy@gmail.com',
      role: 'admin', // Đặt role admin
      avatarUrl: 'https://s3-hfx03.fptcloud.com/admin-bds/odoo/avatar.jpg_2e826f43fcd28fbd4d6f4479dfe213c9646e6ef0',
      isActive: true,
    },
  });
  console.log('Đã tạo tài khoản Agent Huy Hưng:', defaultAgent.fullName);

  // 3. Đọc dữ liệu từ projects_full_dataset.json
  const projectsPath = path.join(__dirname, '../../projects_full_dataset.json');
  if (!fs.existsSync(projectsPath)) {
    throw new Error(`Không tìm thấy file: ${projectsPath}`);
  }
  const rawProjects = fs.readFileSync(projectsPath, 'utf8');
  const projectsData = JSON.parse(rawProjects);
  console.log(`Đã tải ${projectsData.length} dự án từ projects_full_dataset.json.`);

  // 4. Đọc dữ liệu subdivisions.json
  const subsPath = path.join(__dirname, '../../../scratch/subdivisions.json');
  let subdivisionsData: any[] = [];
  if (fs.existsSync(subsPath)) {
    const rawSubs = fs.readFileSync(subsPath, 'utf8');
    subdivisionsData = JSON.parse(rawSubs);
    console.log(`Đã tải ${subdivisionsData.length} tòa nhà/phân khu từ subdivisions.json.`);
  } else {
    console.log('CẢNH BÁO: Không tìm thấy file subdivisions.json. Sẽ tự động tạo phân khu.');
  }

  // 5. Đọc dữ liệu products_full_dataset.json
  const productsPath = path.join(__dirname, '../../products_full_dataset.json');
  let productsData: any[] = [];
  if (fs.existsSync(productsPath)) {
    const rawProducts = fs.readFileSync(productsPath, 'utf8');
    productsData = JSON.parse(rawProducts);
    console.log(`Đã tải ${productsData.length} căn hộ từ products_full_dataset.json.`);
  }

  // 6. Lưu trữ mapping project_name (viết hoa) -> database project_id
  const projectNameToIdMap = new Map<string, number>();

  // 7. Seed Projects
  for (const item of projectsData) {
    // Đổi tên Mayhomes hoặc SalePro thành thông tin cá nhân trong description hoặc slogan nếu có
    let description = item.project_slogan || '';
    description = description.replace(/Mayhomes/gi, 'Hưng Land').replace(/SalePro/gi, 'Hưng Real Estate');

    const createdProject = await prisma.project.create({
      data: {
        id: item.project_id, // Gán cứng id gốc từ Odoo để đồng bộ bảng hàng
        name: item.project_name,
        slug: item.project_slug,
        description: description,
        location: item.project_address || '',
        developer: item.investor || 'Hưng Real Estate',
        estateType: item.project_type || 'high_rise',
        imageUrl: item.avatar_url || null,
        viewCount: item.view_count || 0,
        status: item.state === 'public' ? 'opening' : 'upcoming',
        
        // Chi tiết
        ownershipType: item.ownership_type || null,
        constructionDensity: item.construction_density || null,
        developmentScale: item.development_scale || null,
        buildDate: item.build_date || null,
        progress: item.progress || null,
        locationHtml: item.location_html || null,
        iframeLocation: item.iframe_location || null,
        projectOverview: item.project_overview || null,
        iframeOverview: item.iframe_overview || null,
        projectDetailHtml: item.project_detail_html || null,
        iframeDetail: item.iframe_detail || null,
        image360: item.image_360 || null,
        shortDescription: item.short_description || null,
        shortDescriptionSalePolicy: item.short_description_sale_policy || null,
        state: item.state || 'public',
        imageDataJson: item.image_data ? JSON.stringify(item.image_data) : null,
        linkGeneralJson: item.link_general ? JSON.stringify(item.link_general) : null,
        linkSalePolicyJson: item.link_sale_policy ? JSON.stringify(item.link_sale_policy) : null,
        linkUtilityJson: item.link_utility ? JSON.stringify(item.link_utility) : null,
        img360DataJson: item.img_360_data ? JSON.stringify(item.img_360_data) : null,
      },
    });

    projectNameToIdMap.set(createdProject.name.toUpperCase(), createdProject.id);
  }
  console.log(`Đã seed xong ${projectsData.length} dự án vào database.`);

  // 8. Seed Subdivisions (Tòa nhà / Phân khu)
  const seededSubdivisions: any[] = [];
  const projectSubsMap = new Map<number, any[]>();
  const seededSubIds = new Set<number>();

  for (const s of subdivisionsData) {
    if (seededSubIds.has(s.id)) continue;
    seededSubIds.add(s.id);

    const projNameUpper = (s.project_id || '').toUpperCase();
    const projectId = projectNameToIdMap.get(projNameUpper);

    if (projectId) {
      const createdSub = await prisma.subdivision.create({
        data: {
          id: s.id, // Gán cứng id gốc để khớp bảng hàng
          projectId: projectId,
          name: s.name || s.subdivision_id || 'Tòa nhà',
          floorCount: s.total_floor ? Math.floor(s.total_floor) : 25,
        },
      });
      seededSubdivisions.push(createdSub);

      const list = (projectSubsMap.get(projectId) || []) as any[];
      list.push(createdSub);
      projectSubsMap.set(projectId, list);
    }
  }
  console.log(`Đã seed xong ${seededSubdivisions.length} tòa nhà/phân khu thực tế.`);

  // Tạo phân khu dự phòng cho những dự án không có subdivision trong dataset
  for (const p of projectsData) {
    if (!projectSubsMap.has(p.project_id)) {
      const defaultSubName = p.project_type === 'high_rise' ? 'Tòa CT1' : 'Phân khu A';
      const createdSub = await prisma.subdivision.create({
        data: {
          projectId: p.project_id,
          name: defaultSubName,
          floorCount: p.project_type === 'high_rise' ? 25 : 3,
        },
      });
      projectSubsMap.set(p.project_id, [createdSub]);
    }
  }

  // 9. Seed Products (Căn hộ / Bảng hàng thực tế)
  console.log('Đang phân tích và seed sản phẩm (bảng hàng)...');
  
  // Hàm so khớp căn hộ vào tòa nhà tương ứng
  function findSubdivisionId(productCode: string, projectSubs: any[]): number {
    if (projectSubs.length === 0) return 0;
    if (projectSubs.length === 1) return projectSubs[0].id;

    const normalizedCode = productCode.toUpperCase();

    // Khớp Lumiere đặc thù
    if (normalizedCode.includes('HH-A') || normalizedCode.includes('HHA')) {
      const l1 = projectSubs.find(s => s.name.toUpperCase() === 'L1');
      if (l1) return l1.id;
    }
    if (normalizedCode.includes('HH-B') || normalizedCode.includes('HHB')) {
      const l2 = projectSubs.find(s => s.name.toUpperCase() === 'L2');
      if (l2) return l2.id;
    }

    // Khớp theo tiền tố
    for (const sub of projectSubs) {
      const subName = sub.name.toUpperCase();
      if (normalizedCode.startsWith(subName) || normalizedCode.includes(subName)) {
        return sub.id;
      }
    }

    // Mặc định trả về subdivision đầu tiên
    return projectSubs[0].id;
  }

  // Phân nhóm và batch insert sản phẩm để đạt hiệu năng tối đa
  const productsToCreate: any[] = [];
  const directions = ['Đông Nam', 'Tây Bắc', 'Đông Bắc', 'Tây Nam', 'Chính Đông', 'Chính Tây', 'Chính Nam', 'Chính Bắc'];

  for (const prod of productsData) {
    const projectId = prod.project_id;
    const subs = projectSubsMap.get(projectId) || [];
    if (subs.length === 0) continue;

    const subId = findSubdivisionId(prod.product_code, subs);
    const floor = prod.number_of_floor ? parseInt(prod.number_of_floor) : 1;
    const direction = directions[Math.floor(Math.random() * directions.length)];

    productsToCreate.push({
      subdivisionId: subId,
      code: prod.product_code || prod.product_name || 'APARTMENT',
      floorNumber: isNaN(floor) ? 1 : floor,
      roomNumber: prod.apartment_axis_code || '01',
      direction: direction,
      areaUsable: 55 + Math.floor(Math.random() * 40),
      areaCarpet: 60 + Math.floor(Math.random() * 40),
      price: prod.apartment_price || 2000000000.0,
      status: prod.state_line === 'locked' ? 'locked' : (prod.state_line === 'sold' ? 'sold' : 'available'),
      lockExpireAt: prod.state_line === 'locked' ? new Date(Date.now() + 15 * 60 * 1000) : null,
    });
  }

  // Chia nhỏ mảng sản phẩm thành từng lô 1000 items để SQLite không bị crash
  const chunkSize = 1000;
  for (let i = 0; i < productsToCreate.length; i += chunkSize) {
    const chunk = productsToCreate.slice(i, i + chunkSize);
    await prisma.product.createMany({
      data: chunk,
    });
    console.log(`  Đã seed ${i + chunk.length}/${productsToCreate.length} sản phẩm...`);
  }

  // 10. Tạo một số đơn khóa căn mẫu tương ứng với các căn hộ trạng thái locked
  const lockedProducts = await prisma.product.findMany({
    where: { status: 'locked' },
    take: 10,
  });

  for (const lp of lockedProducts) {
    await prisma.lockOrder.create({
      data: {
        productId: lp.id,
        saleId: defaultAgent.id,
        lockTime: new Date(),
        expireTime: lp.lockExpireAt!,
        status: 'pending',
        note: 'Căn hộ được khóa giữ chỗ trên hệ thống SalePro gốc.',
      },
    });
  }

  console.log('Hoàn thành seed cơ sở dữ liệu thực tế SalePro!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
