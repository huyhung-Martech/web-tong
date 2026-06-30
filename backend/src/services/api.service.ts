import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ApiService {
  constructor(private prisma: PrismaService) {}

  private getMediaConfig() {
    const paths = [
      path.join(process.cwd(), 'projects_media_config.json'),
      path.join(__dirname, '../../projects_media_config.json'),
      path.join(__dirname, '../../../projects_media_config.json')
    ];

    for (const configPath of paths) {
      if (fs.existsSync(configPath)) {
        try {
          const raw = fs.readFileSync(configPath, 'utf8');
          return JSON.parse(raw);
        } catch (e) {
          console.error('Error parsing projects_media_config.json at:', configPath, e);
        }
      }
    }
    return {};
  }

  private applyMediaConfig(project: any, mediaConfig: any) {
    const pConfig = mediaConfig[project.slug];
    if (pConfig) {
      if (pConfig.imageUrl) {
        project.imageUrl = pConfig.imageUrl;
        project.image_url = pConfig.imageUrl;
        project.avatar_url = pConfig.imageUrl;
        if (project.avatar) project.avatar.image_url = pConfig.imageUrl;
      }
      if (pConfig.image360) {
        let img360 = pConfig.image360;
        if (img360.includes('kuula.co') && !img360.includes('logo=')) {
          img360 += (img360.includes('?') ? '&' : '?') + 'logo=0';
        }
        project.image360 = img360;
      }
      if (pConfig.imageData) {
        project.imageDataJson = JSON.stringify(pConfig.imageData);
        project.image_data = pConfig.imageData;
      }
      if (pConfig.linkGeneral) {
        project.linkGeneralJson = JSON.stringify(pConfig.linkGeneral);
        project.link_general = pConfig.linkGeneral;
      }
      if (pConfig.linkSalePolicy) {
        project.linkSalePolicyJson = JSON.stringify(pConfig.linkSalePolicy);
        project.link_sale_policy = pConfig.linkSalePolicy;
      }
      if (pConfig.linkUtility) {
        project.linkUtilityJson = JSON.stringify(pConfig.linkUtility);
        project.link_utility = pConfig.linkUtility;
      }
      project.utilities = pConfig.utilities || [];
      project.floorPlans = pConfig.floorPlans || [];
    } else {
      project.utilities = [];
      project.floorPlans = [];
    }

    if (project.image360 && project.image360.includes('kuula.co') && !project.image360.includes('logo=')) {
      project.image360 += (project.image360.includes('?') ? '&' : '?') + 'logo=0';
    }

    return project;
  }

  // 1. AUTHENTICATION & USERS
  async checkPhoneNumber(phone: string) {
    const user = await this.prisma.user.findUnique({
      where: { phone },
    });
    return {
      exists: !!user,
      phone,
    };
  }

  async login(phone: string) {
    let user = await this.prisma.user.findUnique({
      where: { phone },
    });

    if (!user) {
      // Create user if not exists (auto-registration for demo convenience)
      user = await this.prisma.user.create({
        data: {
          phone,
          fullName: 'Khách Hàng Mới',
          role: 'sale',
        },
      });
    }

    // Return profile + dummy JWT token for demo auth bypass
    const dummyToken = `jwt-token-for-user-${user.id}-${Date.now()}`;
    return {
      status: 'success',
      token: dummyToken,
      user: {
        id: user.id,
        phone: user.phone,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async getUserInfo(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // 2. PROJECTS
  async getProjects(query: { estateType?: string; search?: string; status?: string }) {
    // Automatically clean up expired lock orders before querying
    await this.cleanExpiredLocks();

    const whereClause: any = {};

    if (query.estateType) {
      whereClause.estateType = query.estateType;
    }

    if (query.status) {
      whereClause.status = query.status;
    }

    if (query.search) {
      whereClause.OR = [
        { name: { contains: query.search } },
        { location: { contains: query.search } },
        { description: { contains: query.search } },
      ];
    }

    const projects = await this.prisma.project.findMany({
      where: whereClause,
      include: {
        subdivisions: {
          include: {
            products: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    // Map output to match original Huy Hưng format
    const mediaConfig = this.getMediaConfig();
    return projects.map((p) => {
      const totalUnits = p.subdivisions.reduce((sum, s) => sum + s.products.length, 0);
      const availableUnits = p.subdivisions.reduce(
        (sum, s) => sum + s.products.filter((pr) => pr.status === 'available').length,
        0,
      );

      const mapped = {
        id: p.id,
        project_id: p.id,
        name: p.name,
        project_name: p.name,
        slug: p.slug,
        project_slug: p.slug,
        description: p.description,
        project_slogan: p.description,
        location: p.location,
        project_address: p.location,
        developer: p.developer,
        investor: p.developer,
        estate_type: p.estateType,
        project_type: p.estateType,
        image_url: p.imageUrl,
        avatar_url: p.imageUrl,
        avatar: {
          image_url: p.imageUrl,
        },
        status: p.status,
        view_count: p.viewCount,
        total_units: totalUnits,
        available_units: availableUnits,
      };

      const pConfig = mediaConfig[p.slug];
      if (pConfig && pConfig.imageUrl) {
        mapped.image_url = pConfig.imageUrl;
        mapped.avatar_url = pConfig.imageUrl;
        mapped.avatar = { image_url: pConfig.imageUrl };
      }

      return mapped;
    });
  }

  async getProjectDetail(slugOrId: string) {
    await this.cleanExpiredLocks();

    const id = parseInt(slugOrId);
    let project: any;

    if (!isNaN(id)) {
      project = await this.prisma.project.findUnique({
        where: { id },
        include: { subdivisions: true },
      });
    } else {
      project = await this.prisma.project.findUnique({
        where: { slug: slugOrId },
        include: { subdivisions: true },
      });
    }

    if (!project) throw new NotFoundException('Project not found');

    // Increment view count
    await this.prisma.project.update({
      where: { id: project.id },
      data: { viewCount: { increment: 1 } },
    });

    // Parse JSON data for frontend convenience
    const mediaConfig = this.getMediaConfig();
    const result = {
      ...project,
      image_data: project.imageDataJson ? JSON.parse(project.imageDataJson) : [],
      link_general: project.linkGeneralJson ? JSON.parse(project.linkGeneralJson) : [],
      link_sale_policy: project.linkSalePolicyJson ? JSON.parse(project.linkSalePolicyJson) : [],
      link_utility: project.linkUtilityJson ? JSON.parse(project.linkUtilityJson) : [],
      img_360_data: project.img360DataJson ? JSON.parse(project.img360DataJson) : [],
    };

    delete result.imageDataJson;
    delete result.linkGeneralJson;
    delete result.linkSalePolicyJson;
    delete result.linkUtilityJson;
    delete result.img360DataJson;

    this.applyMediaConfig(result, mediaConfig);

    return result;
  }

  // 3. SUBDIVISIONS & INVENTORY ("Bảng hàng")
  async getSubdivisions(projectId: number) {
    return this.prisma.subdivision.findMany({
      where: { projectId },
      orderBy: { id: 'asc' },
    });
  }

  async getInventoryData(subdivisionId: number) {
    await this.cleanExpiredLocks();

    const products = await this.prisma.product.findMany({
      where: { subdivisionId },
      include: {
        lockOrders: {
          where: { status: 'pending' },
          include: { sale: true },
        },
      },
      orderBy: { code: 'asc' },
    });

    return products.map((p) => {
      const activeLock = p.lockOrders[0];
      return {
        id: p.id,
        code: p.code,
        floor_number: p.floorNumber,
        room_number: p.roomNumber,
        direction: p.direction,
        area_usable: p.areaUsable,
        area_carpet: p.areaCarpet,
        price: p.price,
        status: p.status,
        lock_expire_at: p.lockExpireAt,
        locked_by: activeLock ? activeLock.sale.fullName : null,
      };
    });
  }

  // 4. LOCK ORDERING ("Khóa căn")
  async createLockOrder(productId: number, saleId: number, note?: string) {
    await this.cleanExpiredLocks();

    // Check if product exists and is available
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.status !== 'available') {
      throw new BadRequestException('Product is no longer available for locking');
    }

    const expireTime = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lock

    // Transaction to update product status and create lock order
    return this.prisma.$transaction(async (tx) => {
      const updatedProduct = await tx.product.update({
        where: { id: productId },
        data: {
          status: 'locked',
          lockExpireAt: expireTime,
        },
      });

      const order = await tx.lockOrder.create({
        data: {
          productId,
          saleId,
          expireTime,
          status: 'pending',
          note,
        },
        include: { product: true, sale: true },
      });

      return {
        status: 'success',
        message: `Successfully locked product ${product.code} for 15 minutes.`,
        expire_time: expireTime,
        lock_order_id: order.id,
      };
    });
  }

  async getProductLockingTime(productId: number) {
    await this.cleanExpiredLocks();

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.status !== 'locked' || !product.lockExpireAt) {
      return {
        status: product.status,
        seconds_remaining: 0,
      };
    }

    const remaining = Math.max(0, Math.floor((product.lockExpireAt.getTime() - Date.now()) / 1000));
    return {
      status: 'locked',
      seconds_remaining: remaining,
      expire_time: product.lockExpireAt,
    };
  }

  // 5. PUBLIC NEWS (MOCK)
  async getNews() {
    return [
      {
        id: 1,
        title: 'Giá trị của Vinhomes Saigon Park không chỉ nằm ở giá bán hôm nay',
        category: 'Tin Tức Dự Án',
        date: '19 tháng 6, 2026',
        summary: 'Phân tích giá trị bất động sản dài hạn tại dự án Vinhomes Saigon Park Hóc Môn...',
        image: 'https://s3-hfx03.fptcloud.com/image-upload/salepro/1766481729674-banner-web-2.webp',
      },
      {
        id: 2,
        title: 'Lagoonia Legacy: Di sản khan hiếm từ vị trí độc bản tại Vinhomes Green Paradise',
        category: 'Tin Tức Dự Án',
        date: '18 tháng 6, 2026',
        summary: 'Giới thiệu về phân khu đặc biệt Lagoonia Legacy vừa ra mắt...',
        image: 'https://s3-hfx03.fptcloud.com/image-upload/salepro/1766481729674-banner-web-2.webp',
      },
    ];
  }

  // HELPER: Background job helper to release expired locks
  private async cleanExpiredLocks() {
    const now = new Date();

    // Find all expired locked products
    const expiredProducts = await this.prisma.product.findMany({
      where: {
        status: 'locked',
        lockExpireAt: { lt: now },
      },
    });

    if (expiredProducts.length === 0) return;

    console.log(`Releasing ${expiredProducts.length} expired product locks...`);

    await this.prisma.$transaction(async (tx) => {
      // Release product status
      await tx.product.updateMany({
        where: {
          id: { in: expiredProducts.map((p) => p.id) },
        },
        data: {
          status: 'available',
          lockExpireAt: null,
        },
      });

      // Update lock order status
      await tx.lockOrder.updateMany({
        where: {
          productId: { in: expiredProducts.map((p) => p.id) },
          status: 'pending',
          expireTime: { lt: now },
        },
        data: {
          status: 'released',
        },
      });
    });
  }
}
