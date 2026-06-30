import { Controller, Get, Post, Body, Query, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiService } from '../services/api.service';

@Controller('rest_api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  // 1. PUBLIC AUTH
  @Post('pu/property/auth/check_phone_number')
  async checkPhone(@Body() body: { phone: string }) {
    return this.apiService.checkPhoneNumber(body.phone);
  }

  @Post('pu/property/auth/login')
  async login(@Body() body: { phone: string }) {
    return this.apiService.login(body.phone);
  }

  @Post('pu/property/auth/verify_otp')
  async verifyOtp(@Body() body: { phone: string; code: string }) {
    return this.apiService.login(body.phone); // Auto-login on mock OTP
  }

  // 2. PUBLIC NEWS
  @Get('pu/news_public/news/get_real_news')
  async getNews() {
    return this.apiService.getNews();
  }

  // 3. PRIVATE PROJECTS
  @Get('pr/property/data/get_project')
  async getProjects(
    @Query('estate_type') estateType?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.apiService.getProjects({ estateType, search, status });
  }

  // ALIAS FOR ORIGINAL SALEPRO PROJECTS LIST
  @Get('pu/property/master/data/search_duan_data')
  async searchDuanData(
    @Query('estate_type') estateType?: string,
    @Query('search') search?: string,
    @Query('status') status?: string,
  ) {
    return this.apiService.getProjects({ estateType, search, status });
  }

  @Get('pr/property/data/get_project_thongtinchung/:id')
  async getProjectDetail(@Param('id') id: string) {
    return this.apiService.getProjectDetail(id);
  }

  @Get('pr/property/data/get_project_thongtinchung')
  async getProjectDetailQuery(@Query('id') id: string) {
    return this.apiService.getProjectDetail(id);
  }

  // ALIAS FOR ORIGINAL SALEPRO PROJECT DETAIL
  @Get('pu/property/master/data/get_project_detail')
  async getProjectDetailOriginal(@Query('project_id') projectId: string) {
    return this.apiService.getProjectDetail(projectId);
  }

  // 4. PRIVATE INVENTORY & SUBDIVISIONS
  @Get('pr/property/data/get_building')
  async getSubdivisions(@Query('project_id') projectId: string) {
    return this.apiService.getSubdivisions(parseInt(projectId));
  }

  @Get('pr/property/coordinate_building/search_banghang_data')
  async getInventory(@Query('subdivision_id') subdivisionId: string) {
    return this.apiService.getInventoryData(parseInt(subdivisionId));
  }

  // 5. PRIVATE LOCK ORDERING
  @Post('pr/property/order/create_lock_order')
  async lockProduct(@Body() body: { product_id: number; sale_id?: number; note?: string }) {
    // Default to agent ID 1 (Phùng Huy Hưng) if not provided for ease of testing
    const saleId = body.sale_id || 1;
    return this.apiService.createLockOrder(body.product_id, saleId, body.note);
  }

  @Get('pr/property/data/get_product_locking_time')
  async getProductLockingTime(@Query('product_id') productId: string) {
    return this.apiService.getProductLockingTime(parseInt(productId));
  }
}
