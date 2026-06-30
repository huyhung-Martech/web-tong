<template>
  <div v-if="loading" class="flex justify-center items-center py-40">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>

  <div v-else-if="!project" class="py-20 text-center bg-white rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto mt-10">
    <i class="bi bi-exclamation-triangle text-5xl text-amber-500 block mb-4"></i>
    <h3 class="text-xl font-bold text-slate-800">Không tìm thấy dự án</h3>
    <p class="text-slate-500 mt-2">Dự án này không tồn tại hoặc đã bị ẩn khỏi hệ thống.</p>
    <router-link to="/project-page" class="btn bg-primary text-white mt-6 inline-block py-2.5 px-6 rounded-xl font-bold">
      Quay lại danh sách
    </router-link>
  </div>

  <div v-else class="py-6 space-y-6">
    <!-- Breadcrumbs -->
    <nav class="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
      <router-link to="/project-page" class="hover:text-primary transition-colors">Trang chủ</router-link>
      <i class="bi bi-chevron-right text-[10px]"></i>
      <span class="text-slate-600">Chi tiết dự án</span>
    </nav>

    <!-- Top Banner & Header -->
    <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <span class="text-xs font-extrabold text-primary tracking-wider uppercase bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
          {{ project.project_type === 'high_rise' || project.estate_type === 'high_rise' ? 'Cao tầng' : 'Thấp tầng' }}
        </span>
        <h1 class="text-2xl font-extrabold text-slate-900 mt-2">{{ project.project_name || project.name }}</h1>
        <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
          <i class="bi bi-geo-alt-fill text-primary"></i>
          {{ project.project_address || project.location }}
        </p>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button @click="shareProject" class="flex items-center gap-2 border border-slate-200 hover:border-primary hover:text-primary px-4 py-2 rounded-xl text-xs font-bold transition-all bg-slate-50 shadow-sm">
          <i class="bi bi-share-fill"></i>
          Chia sẻ dự án
        </button>
      </div>
    </div>

    <!-- 12 Tabs Navigation Bar -->
    <div class="bg-white border-y border-slate-200/80 py-3.5 sticky top-16 z-20 overflow-x-auto no-scrollbar shadow-sm">
      <div class="flex items-center justify-start md:justify-center gap-1.5 md:gap-3.5 px-6 min-w-max text-xs font-extrabold">
        <template v-for="(tab, idx) in tabs" :key="tab.id">
          <!-- Separator | -->
          <span v-if="idx > 0" class="text-slate-400 font-normal select-none px-0.5">|</span>
          
          <button 
            @click="activeTab = tab.id"
            :class="[
              'px-2 py-1.5 flex items-center gap-1.5 transition-all duration-200 outline-none border-b-2 hover:text-amber-500', 
              activeTab === tab.id 
                ? 'border-amber-500 text-amber-500 font-black scale-105' 
                : 'border-transparent text-slate-600 font-bold'
            ]"
          >
            <!-- Icon with custom color -->
            <i :class="['bi', tab.icon, tab.iconColor]"></i>
            {{ tab.name }}
          </button>
        </template>
      </div>
    </div>

    <!-- Main Workspace Split -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      <!-- Left Content Column (75%) -->
      <div class="lg:col-span-3 space-y-6">
        
        <!-- 1. TỔNG QUAN -->
        <div v-if="activeTab === 'overview'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <!-- Slogan & Intro Image -->
            <div class="rounded-xl overflow-hidden h-72 relative bg-slate-100 border border-slate-200/40 shadow-sm">
              <img :src="project.avatar_url || project.image_url" class="w-full h-full object-cover" alt="Overview Image">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <p class="text-white text-lg font-bold">{{ project.project_slogan || project.description }}</p>
                <p class="text-slate-300 text-xs mt-1 flex items-center gap-1">
                  <i class="bi bi-geo-alt-fill text-primary"></i>
                  {{ project.project_address || project.location }}
                </p>
              </div>
            </div>

            <!-- Parameters Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div v-if="project.developer || project.investor" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Chủ đầu tư</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.investor || project.developer }}</span>
              </div>
              <div v-if="project.total_area" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Diện tích tổng thể</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.total_area }}</span>
              </div>
              <div v-if="project.constructionDensity" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mật độ xây dựng</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.constructionDensity }}</span>
              </div>
              <div v-if="project.ownershipType || project.ownership_type" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hình thức sở hữu</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.ownershipType || project.ownership_type }}</span>
              </div>
              <div v-if="project.progress" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tiến độ thi công</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.progress }}</span>
              </div>
              <div v-if="project.buildDate || project.build_date" class="bg-slate-50 border border-slate-200/50 p-4 rounded-xl shadow-inner">
                <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Khởi công</span>
                <span class="font-extrabold text-sm text-slate-800">{{ project.buildDate || project.build_date }}</span>
              </div>
            </div>

            <!-- Overview HTML Content -->
            <div v-if="project.projectOverview || project.project_overview" class="space-y-3 pt-4 border-t border-slate-100">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <i class="bi bi-file-text text-primary"></i> Tổng quan dự án
              </h4>
              <div class="prose-custom text-slate-700 text-sm leading-relaxed" v-html="project.projectOverview || project.project_overview"></div>
            </div>
            
            <div v-else class="space-y-3 pt-4 border-t border-slate-100">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Thông tin dự án
              </h4>
              <p class="text-sm text-slate-600 leading-relaxed">{{ project.project_slogan || project.description }}</p>
            </div>
          </div>

          <!-- Banner tiện ích & Slider tiện ích (Khớp 100% hình ảnh) -->
          <div v-if="project.utilities && project.utilities.length > 0" class="space-y-6">
            <!-- Banner xanh giới thiệu dự án -->
            <div class="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative">
              <div class="max-w-md space-y-4 z-10 text-white">
                <h3 class="text-xl sm:text-2xl font-extrabold uppercase leading-tight text-emerald-400">
                  {{ project.project_name || project.name }}
                </h3>
                <p class="text-xs sm:text-sm font-medium text-blue-100 leading-relaxed">
                  {{ project.project_slogan || project.description }}
                </p>
              </div>
              <div class="w-full md:w-3/5 rounded-xl overflow-hidden border-2 border-white/20 shadow-md relative bg-slate-900 aspect-video flex items-center justify-center">
                <img :src="project.avatar_url || project.image_url" class="w-full h-full object-cover opacity-80">
                <div class="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <div class="w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-lg border border-white/20">
                    <i class="bi bi-play-fill text-2xl ml-1"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Carousel tiện ích -->
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <div class="text-center space-y-1">
                <h4 class="text-lg font-extrabold text-blue-800 uppercase">Tiện ích</h4>
                <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Hệ thống tiện ích đẳng cấp</p>
              </div>

              <!-- Slider tiện ích ngang -->
              <div class="relative group">
                <button 
                  @click="scrollSlider('utility-slider', 'left')" 
                  class="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-white/10"
                >
                  <i class="bi bi-chevron-left text-sm"></i>
                </button>
                <button 
                  @click="scrollSlider('utility-slider', 'right')" 
                  class="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-white/10"
                >
                  <i class="bi bi-chevron-right text-sm"></i>
                </button>

                <div class="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1 scroll-smooth" id="utility-slider">
                  <div 
                    v-for="(util, uIdx) in project.utilities" 
                    :key="uIdx"
                    class="w-64 flex-shrink-0 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div class="h-44 overflow-hidden bg-slate-100 border-b border-slate-100 flex items-center justify-center">
                      <img :src="util.image" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" :alt="util.name">
                    </div>
                    <div class="bg-blue-800 py-3.5 px-4 text-center">
                      <span class="text-xs font-extrabold text-white tracking-wider block truncate">{{ util.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Sản phẩm (Mặt bằng căn 3D) -->
          <div v-if="project.floorPlans && project.floorPlans.length > 0" class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="text-center space-y-1">
              <h4 class="text-lg font-extrabold text-blue-800 uppercase">Sản phẩm</h4>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-wider">Đa dạng lựa chọn cho mọi nhu cầu</p>
            </div>

            <!-- Slider căn hộ ngang -->
            <div class="relative group">
              <button 
                @click="scrollSlider('product-slider', 'left')" 
                class="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-white/10"
              >
                <i class="bi bi-chevron-left text-sm"></i>
              </button>
              <button 
                @click="scrollSlider('product-slider', 'right')" 
                class="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md border border-white/10"
              >
                <i class="bi bi-chevron-right text-sm"></i>
              </button>

              <div class="flex gap-6 overflow-x-auto no-scrollbar pb-4 px-2 scroll-smooth" id="product-slider">
                <div 
                  v-for="(plan, pIdx) in project.floorPlans" 
                  :key="pIdx"
                  class="w-80 flex-shrink-0 border border-slate-200 rounded-2xl bg-white shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-shadow relative"
                >
                  <div class="h-60 w-full flex items-center justify-center bg-white rounded-xl mb-4 overflow-hidden">
                    <img :src="plan.image" class="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300" :alt="plan.name">
                  </div>
                  
                  <h5 class="text-xl font-black text-slate-800 mb-4 tracking-wider">{{ plan.code }}</h5>
                  
                  <div class="w-full border-t border-slate-100 pt-4 space-y-2 text-xs">
                    <div class="flex justify-between font-bold">
                      <span class="text-slate-500 font-medium">{{ plan.name }}</span>
                    </div>
                    <div class="flex justify-between font-bold">
                      <span class="text-slate-400 font-medium">Diện tích:</span>
                      <span class="text-blue-600">{{ plan.area }}</span>
                    </div>
                    <div class="flex justify-between font-bold">
                      <span class="text-slate-400 font-medium">Số căn:</span>
                      <span class="text-slate-700">{{ plan.quantity }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. VỊ TRÍ -->
        <div v-else-if="activeTab === 'location'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div v-if="project.locationHtml || project.location_html" class="space-y-3">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <i class="bi bi-geo text-primary"></i> Vị trí địa lý
              </h4>
              <div class="prose-custom text-slate-700 text-sm leading-relaxed" v-html="project.locationHtml || project.location_html"></div>
            </div>

            <!-- Google Map Embed -->
            <div v-if="project.iframeLocation || project.iframe_location" class="space-y-3 pt-4 border-t border-slate-100">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <i class="bi bi-map text-primary"></i> Bản đồ định vị Google Maps
              </h4>
              <div class="rounded-xl overflow-hidden border border-slate-200 h-[450px]" v-html="project.iframeLocation || project.iframe_location"></div>
            </div>
            
            <div v-if="!project.locationHtml && !project.location_html && !project.iframeLocation && !project.iframe_location" class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Thông tin bản đồ vị trí dự án đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 3. ĐÀO TẠO -->
        <div v-else-if="activeTab === 'training'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex justify-between items-center border-b border-slate-200/80 pb-3">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i class="bi bi-mortarboard text-primary"></i> Tài liệu Đào tạo & Sales Kit
              </h4>
              <span class="text-xs font-medium text-slate-400">Đại lý và Chuyên viên nhấp để tải</span>
            </div>

            <!-- Training Links list -->
            <div v-if="project.link_general && project.link_general.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                v-for="(doc, idx) in project.link_general" 
                :key="idx"
                :href="doc.link_utility_url" 
                target="_blank"
                class="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white hover:shadow-sm transition-all"
              >
                <div class="bg-blue-50 text-blue-500 p-2.5 rounded-lg border border-blue-100">
                  <i class="bi bi-file-earmark-zip-fill text-lg"></i>
                </div>
                <div class="flex-grow min-w-0">
                  <span class="block text-xs font-extrabold text-slate-800 truncate">{{ doc.link_utility_name || 'Tài liệu bán hàng' }}</span>
                  <span class="block text-[10px] text-slate-400 mt-0.5">Google Drive Folder</span>
                </div>
                <i class="bi bi-chevron-right text-slate-400"></i>
              </a>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Tài liệu đào tạo đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 4. MẶT BẰNG -->
        <div v-else-if="activeTab === 'layout'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-aspect-ratio text-primary"></i> Sơ đồ mặt bằng chi tiết & Thiết kế căn hộ
            </h4>

            <div v-if="project.image_data && project.image_data.length > 0" class="space-y-6">
              <!-- Hàng nút lựa chọn mặt bằng dạng pills tròn (màu xanh lá khi active) -->
              <div class="flex flex-wrap gap-2 justify-center pb-4 border-b border-slate-100">
                <button 
                  v-for="(imgGroup, idx) in project.image_data" 
                  :key="idx"
                  @click="selectedLayoutIndex = idx"
                  :class="['px-4 py-2 rounded-full text-xs font-bold transition-all outline-none border shadow-sm', 
                    selectedLayoutIndex === idx 
                      ? 'bg-emerald-500 text-white border-emerald-500 font-extrabold' 
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-800 border-slate-200/60'
                  ]"
                >
                  {{ imgGroup.image_coordinate_name || 'Mặt bằng ' + (idx + 1) }}
                </button>
              </div>

              <!-- Hình ảnh mặt bằng lớn tương ứng đang chọn -->
              <div v-if="project.image_data[selectedLayoutIndex]" class="space-y-4">
                <div class="border border-slate-200/60 rounded-2xl overflow-hidden bg-slate-50 p-4 shadow-md flex items-center justify-center min-h-[400px]">
                  <img 
                    :src="project.image_data[selectedLayoutIndex].image_data[0]?.image_url" 
                    class="max-w-full max-h-[600px] object-contain transition-all duration-300 rounded-xl"
                    :alt="project.image_data[selectedLayoutIndex].image_coordinate_name"
                  >
                </div>
                <h5 class="text-sm font-extrabold text-slate-800 text-center uppercase tracking-wider">
                  {{ project.image_data[selectedLayoutIndex].image_coordinate_name }}
                </h5>
              </div>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Bản vẽ thiết kế mặt bằng đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 5. TÒA NHÀ -->
        <div v-else-if="activeTab === 'building'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-buildings text-primary"></i> Danh sách Block / Tòa nhà của dự án
            </h4>

            <div v-if="subdivisions.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="sub in subdivisions" 
                :key="sub.id"
                class="p-4 border border-slate-200/80 rounded-xl bg-slate-50 shadow-sm flex items-center gap-3.5 hover:border-primary transition-all cursor-pointer"
                @click="goToTabAndSelectSub('inventory', sub.id)"
              >
                <div class="bg-primary text-white p-2.5 rounded-lg flex items-center justify-center font-bold">
                  <i class="bi bi-building text-lg"></i>
                </div>
                <div>
                  <h5 class="text-sm font-extrabold text-slate-800">{{ sub.name }}</h5>
                  <p class="text-xs text-slate-400 font-medium mt-0.5">{{ sub.floorCount || 25 }} Tầng</p>
                </div>
                <i class="bi bi-chevron-right text-slate-300 ml-auto"></i>
              </div>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Chưa có danh sách block tòa nhà.
            </div>
          </div>
        </div>

        <!-- 6. BẢNG HÀNG (Inventory Grid) -->
        <div v-else-if="activeTab === 'inventory'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-3 gap-2">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i class="bi bi-grid-3x3-gap text-primary"></i> Sơ đồ căn hộ & Trạng thái khóa căn
              </h4>
              
              <!-- Subdivision selector -->
              <select 
                v-model="activeSubdivisionId" 
                @change="handleSubdivisionChange"
                class="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-bold focus:outline-none focus:border-primary text-slate-700 cursor-pointer w-full sm:w-auto"
              >
                <option v-for="s in subdivisions" :key="s.id" :value="s.id">{{ s.name }}</option>
              </select>
            </div>

            <!-- Legends -->
            <div class="flex gap-4 items-center text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-emerald-500 rounded border border-emerald-600 block"></span> Trống</span>
              <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-amber-500 rounded border border-amber-600 block"></span> Đang Khóa</span>
              <span class="flex items-center gap-1.5"><span class="w-3.5 h-3.5 bg-red-500 rounded border border-red-600 block"></span> Đã Bán</span>
            </div>

            <!-- Apartments grid -->
            <div v-if="inventoryLoading" class="flex justify-center items-center py-10">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>

            <div v-else-if="inventory.length === 0" class="text-center py-10 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Không có sản phẩm nào cho phân khu này.
            </div>

            <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div 
                v-for="p in inventory" 
                :key="p.id"
                :class="['border rounded-xl p-3.5 flex flex-col justify-between h-28 select-none transition-all shadow-sm', 
                  p.status === 'available' ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-400 cursor-pointer hover:shadow' : '',
                  p.status === 'locked' ? 'bg-amber-50 border-amber-200 text-amber-800' : '',
                  p.status === 'sold' ? 'bg-red-50 border-red-200 text-red-800 cursor-not-allowed opacity-65' : ''
                ]"
                @click="p.status === 'available' ? confirmLockProduct(p) : null"
              >
                <div class="flex justify-between items-start">
                  <span class="font-extrabold text-sm tracking-wider">{{ p.code }}</span>
                  <span class="text-[0.65rem] font-bold px-1.5 py-0.5 rounded bg-white/70 border border-black/5">{{ p.direction }}</span>
                </div>

                <div class="my-1.5 text-[0.65rem] font-semibold text-slate-500">
                  DT: {{ p.area_usable }} m² | Tầng: {{ p.floor_number }}
                </div>

                <div class="flex justify-between items-end mt-auto">
                  <span class="font-extrabold text-xs text-slate-800">{{ formatPrice(p.price) }}</span>
                  
                  <!-- Timer or status label -->
                  <div v-if="p.status === 'locked'" class="text-[0.65rem] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded animate-pulse flex items-center gap-0.5">
                    <i class="bi bi-clock-fill"></i>
                    <span>{{ activeTimers[p.id] || 'Lock' }}</span>
                  </div>
                  <div v-else-if="p.status === 'sold'" class="text-[0.65rem] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded">
                    Đã Bán
                  </div>
                  <div v-else class="text-[0.65rem] font-bold text-emerald-600 hover:underline">
                    Đặt Chỗ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 7. QUỸ CĂN (Locked Units List) -->
        <div v-else-if="activeTab === 'lock_requests'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-file-lock text-primary"></i> Quỹ căn đang khóa tạm thời / Giữ chỗ
            </h4>

            <div v-if="lockedInventory.length > 0" class="overflow-x-auto">
              <table class="w-full text-sm text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 text-slate-400 font-extrabold text-xs uppercase">
                    <th class="py-3 px-4">Mã Căn</th>
                    <th class="py-3 px-4">Tòa / Block</th>
                    <th class="py-3 px-4">Giá</th>
                    <th class="py-3 px-4">Người Khóa</th>
                    <th class="py-3 px-4">Thời gian còn lại</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in lockedInventory" :key="item.id" class="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td class="py-4 px-4 font-bold text-slate-800">{{ item.code }}</td>
                    <td class="py-4 px-4 font-medium text-slate-500">{{ getSubdivisionName(item.subdivision_id) || 'Tòa nhà' }}</td>
                    <td class="py-4 px-4 font-bold text-slate-800">{{ formatPrice(item.price) }}</td>
                    <td class="py-4 px-4 font-medium text-amber-600">{{ item.locked_by || 'Đại lý' }}</td>
                    <td class="py-4 px-4">
                      <span class="text-xs font-bold bg-amber-500 text-white py-1 px-2.5 rounded-lg animate-pulse inline-flex items-center gap-1">
                        <i class="bi bi-clock-fill"></i>
                        {{ activeTimers[item.id] || '--:--' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Không có căn hộ nào đang trong trạng thái khóa giữ chỗ.
            </div>
          </div>
        </div>

        <!-- 8. ẢNH 360° -->
        <div v-else-if="activeTab === 'tour360'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-camera-video text-primary"></i> Tham quan thực tế ảo Virtual Tour 360°
            </h4>
            
            <div v-if="project.image360" class="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 h-[450px]">
              <Three360Viewer v-if="isLocal360" :image-url="project.image360" />
              <iframe v-else :src="project.image360" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
            </div>
            
            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Bản vẽ thực tế ảo 360 độ đang được cập nhật cho dự án này.
            </div>
          </div>
        </div>

        <!-- 9. CHÍNH SÁCH BÁN HÀNG -->
        <div v-else-if="activeTab === 'policy'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <!-- CSBH text description -->
            <div v-if="project.shortDescriptionSalePolicy || project.short_description_sale_policy" class="space-y-3">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
                <i class="bi bi-bookmark-check text-primary"></i> Chính sách ưu đãi & Quà tặng
              </h4>
              <div class="prose-custom text-slate-700 text-sm leading-relaxed" v-html="project.shortDescriptionSalePolicy || project.short_description_sale_policy"></div>
            </div>

            <!-- Documents of CSBH -->
            <div v-if="project.link_sale_policy && project.link_sale_policy.length > 0" class="space-y-3 pt-4 border-t border-slate-100">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
                Tài liệu văn bản pháp lý CSBH
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  v-for="(doc, idx) in project.link_sale_policy" 
                  :key="idx"
                  :href="doc.link_utility_url" 
                  target="_blank"
                  class="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white hover:shadow-sm transition-all"
                >
                  <div class="bg-red-50 text-red-500 p-2.5 rounded-lg border border-red-100">
                    <i class="bi bi-file-earmark-pdf-fill text-lg"></i>
                  </div>
                  <div class="flex-grow min-w-0">
                    <span class="block text-xs font-extrabold text-slate-800 truncate">{{ doc.link_utility_name || 'Tài liệu CSBH' }}</span>
                    <span class="block text-[10px] text-slate-400 mt-0.5">PDF Document</span>
                  </div>
                  <i class="bi bi-chevron-right text-slate-400"></i>
                </a>
              </div>
            </div>

            <div v-if="!project.shortDescriptionSalePolicy && !project.short_description_sale_policy && (!project.link_sale_policy || project.link_sale_policy.length === 0)" class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Chính sách bán hàng dự án đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 10. TIẾN ĐỘ -->
        <div v-else-if="activeTab === 'progress'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-calendar-event text-primary"></i> Nhật ký tiến độ thi công thực tế
            </h4>
            
            <div v-if="project.progress" class="bg-slate-50 p-5 rounded-xl border border-slate-200/50">
              <h5 class="text-xs font-bold text-slate-400 uppercase tracking-wider">Cập nhật mới nhất</h5>
              <p class="text-sm text-slate-700 leading-relaxed mt-2.5 font-medium">{{ project.progress }}</p>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Hình ảnh và thông tin tiến độ công trình đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 11. TÀI LIỆU -->
        <div v-else-if="activeTab === 'documents'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <div class="flex justify-between items-center border-b border-slate-200/80 pb-3">
              <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <i class="bi bi-file-earmark-arrow-down text-primary"></i> Tài liệu Pháp lý & Folder dự án
              </h4>
              <span class="text-xs font-medium text-slate-400">Nhấp để mở Drive lưu trữ</span>
            </div>

            <!-- Documents List from linkUtilityJson -->
            <div v-if="project.link_utility && project.link_utility.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                v-for="(doc, idx) in project.link_utility" 
                :key="idx"
                :href="doc.link_utility_url" 
                target="_blank"
                class="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-primary hover:bg-white hover:shadow-sm transition-all"
              >
                <div class="bg-amber-50 text-amber-500 p-2.5 rounded-lg border border-amber-100">
                  <i class="bi bi-folder-fill text-lg"></i>
                </div>
                <div class="flex-grow min-w-0">
                  <span class="block text-xs font-extrabold text-slate-800 truncate">{{ doc.link_utility_name || 'Thư mục tài liệu' }}</span>
                  <span class="block text-[10px] text-slate-400 mt-0.5">Google Drive Directory</span>
                </div>
                <i class="bi bi-chevron-right text-slate-400"></i>
              </a>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Folder tài liệu dự án đang được cập nhật.
            </div>
          </div>
        </div>

        <!-- 12. TIN TỨC -->
        <div v-else-if="activeTab === 'news'" class="space-y-6">
          <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
            <h4 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-2">
              <i class="bi bi-newspaper text-primary"></i> Tin tức thị trường & Cập nhật dự án
            </h4>

            <div v-if="projectNews.length > 0" class="space-y-4">
              <div v-for="news in projectNews" :key="news.id" class="flex gap-4 p-4 bg-slate-50 border border-slate-200/60 rounded-xl hover:shadow-sm hover:bg-white transition-all">
                <div class="w-24 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <img :src="news.image" class="w-full h-full object-cover" alt="News Image">
                </div>
                <div>
                  <span class="text-[10px] font-extrabold text-primary uppercase bg-blue-50 border border-blue-100 py-0.5 px-2 rounded">{{ news.category }}</span>
                  <h5 class="text-xs font-extrabold text-slate-800 mt-1.5 leading-snug">{{ news.title }}</h5>
                  <p class="text-[10px] text-slate-400 font-medium mt-1">{{ news.date }}</p>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-20 text-slate-400 text-sm bg-white rounded-xl border border-slate-200/60 shadow-sm">
              Không có tin tức nào về dự án này.
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column Broker Card & Specs Summary (25%) -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Broker Card -->
        <div class="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm text-center">
          <div class="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-slate-200 shadow-inner bg-slate-50">
            <img src="https://s3-hfx03.fptcloud.com/admin-bds/odoo/avatar.jpg_2e826f43fcd28fbd4d6f4479dfe213c9646e6ef0" class="w-full h-full object-cover" alt="Broker">
          </div>
          <h4 class="font-extrabold text-slate-800 text-base mt-4">Phùng Huy Hưng</h4>
          <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Chuyên viên Bất Động Sản</p>
          <div class="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-3 text-xs text-left">
            <a href="tel:0989151897" class="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-bold">
              <i class="bi bi-telephone-fill text-primary text-sm"></i>
              0989151897
            </a>
            <a href="mailto:huyhung.utehy@gmail.com" class="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors font-bold">
              <i class="bi bi-envelope-fill text-primary text-sm"></i>
              huyhung.utehy@gmail.com
            </a>
            <span class="flex items-center gap-2 text-slate-600 font-bold">
              <i class="bi bi-award-fill text-primary text-sm"></i>
              Thương hiệu: Hưng Land
            </span>
          </div>
          <a 
            href="tel:0989151897"
            class="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl font-bold shadow-md hover-premium transition-all text-center flex items-center justify-center gap-2 text-xs mt-6"
          >
            <i class="bi bi-telephone-outbound-fill"></i>
            Yêu cầu tư vấn ngay
          </a>
        </div>

        <!-- Quick Specs List -->
        <div class="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
          <h5 class="text-xs font-bold text-slate-700 border-b border-slate-100 pb-2">TÓM TẮT DỰ ÁN</h5>
          <div class="text-xs space-y-3">
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Chủ đầu tư:</span><span class="font-bold text-slate-800">{{ project.investor || project.developer || 'Hưng Real Estate' }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Loại hình:</span><span class="font-bold text-slate-800">{{ project.project_type === 'high_rise' || project.estate_type === 'high_rise' ? 'Cao tầng' : 'Thấp tầng' }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Tiến độ:</span><span class="font-bold text-slate-800">{{ project.progress || 'Đang thi công' }}</span></div>
            <div class="flex justify-between"><span class="text-slate-500 font-medium">Sở hữu:</span><span class="font-bold text-slate-800 line-clamp-1" :title="project.ownershipType || project.ownership_type">{{ project.ownershipType || project.ownership_type || 'Sở hữu lâu dài' }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 13. LOCK ROOM CONFIRMATION MODAL -->
    <div v-if="showLockConfirmModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all duration-300">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-bold text-slate-800">Yêu cầu khóa căn tạm thời</h3>
            <button @click="showLockConfirmModal = false" class="text-slate-400 hover:text-slate-600">
              <i class="bi bi-x-lg text-lg"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 text-sm space-y-2">
              <div class="flex justify-between"><span class="text-slate-500 font-medium">Mã sản phẩm:</span><span class="font-bold text-primary">{{ selectedProduct.code }}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 font-medium">Giá bán:</span><span class="font-bold text-slate-800">{{ formatPrice(selectedProduct.price) }}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 font-medium">Vị trí:</span><span class="font-bold text-slate-800">Tầng {{ selectedProduct.floor_number }}, Hướng {{ selectedProduct.direction }}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 font-medium">Thời gian giữ chỗ:</span><span class="font-bold text-amber-600">15 phút</span></div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Ghi chú khóa căn</label>
              <textarea 
                v-model="lockNote" 
                rows="3" 
                placeholder="Nhập họ tên khách hàng, mã cọc..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors resize-none"
              ></textarea>
            </div>

            <button 
              @click="submitLockOrder" 
              class="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-bold shadow-md hover-premium transition-all flex items-center justify-center gap-2"
            >
              <i class="bi bi-shield-lock-fill"></i>
              Xác Nhận Khóa Căn
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import Three360Viewer from '../components/Three360Viewer.vue';

const route = useRoute();
const API_BASE = 'http://localhost:8089/rest_api';

// Globally injected user
const user = inject('user');
const openLogin = inject('openLogin');

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

// State
const loading = ref(true);
const project = ref(null);
const subdivisions = ref([]);
const activeSubdivisionId = ref(null);
const inventory = ref([]);
const lockedInventory = ref([]);
const inventoryLoading = ref(false);

const activeTab = ref('overview');
const selectedProduct = ref(null);
const lockNote = ref('');
const showLockConfirmModal = ref(false);
const projectNews = ref([]);

// New states for interactive Layout & custom sliders
const selectedLayoutIndex = ref(0);

const isLocal360 = computed(() => {
  const url = project.value?.image360;
  if (!url) return false;
  return url.toLowerCase().includes('.jpg') || 
         url.toLowerCase().includes('.png') || 
         url.toLowerCase().includes('.jpeg') ||
         (!url.startsWith('http') && !url.includes('kuula.co'));
});

const tabs = [
  { id: 'overview', name: 'Tổng quan', icon: 'bi-house-door-fill', iconColor: 'text-amber-500' },
  { id: 'location', name: 'Vị trí', icon: 'bi-geo-alt-fill', iconColor: 'text-slate-600' },
  { id: 'training', name: 'Đào tạo', icon: 'bi-mortarboard-fill', iconColor: 'text-yellow-600' },
  { id: 'layout', name: 'Mặt bằng', icon: 'bi-aspect-ratio-fill', iconColor: 'text-slate-700' },
  { id: 'building', name: 'Tòa nhà', icon: 'bi-buildings-fill', iconColor: 'text-slate-700' },
  { id: 'inventory', name: 'Bảng hàng', icon: 'bi-grid-3x3-gap-fill', iconColor: 'text-slate-700' },
  { id: 'lock_requests', name: 'Quỹ căn', icon: 'bi-file-lock-fill', iconColor: 'text-red-500' },
  { id: 'tour360', name: 'Ảnh 360', icon: 'bi-camera-fill', iconColor: 'text-blue-500' },
  { id: 'policy', name: 'Chính sách bán hàng', icon: 'bi-file-earmark-text-fill', iconColor: 'text-slate-600' },
  { id: 'progress', name: 'Tiến độ', icon: 'bi-calendar-event-fill', iconColor: 'text-blue-500' },
  { id: 'documents', name: 'Tài liệu', icon: 'bi-folder-fill', iconColor: 'text-slate-600' },
  { id: 'news', name: 'Tin tức', icon: 'bi-newspaper', iconColor: 'text-slate-600' }
];

function scrollSlider(sliderId, direction) {
  const el = document.getElementById(sliderId);
  if (el) {
    const scrollAmount = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

// Real-time timers map: product_id -> 'mm:ss'
const activeTimers = ref({});
let syncInterval = null;

onMounted(async () => {
  await fetchProjectDetail();
  syncInterval = setInterval(updateActiveTimers, 5000);
});

onUnmounted(() => {
  if (syncInterval) clearInterval(syncInterval);
});

watch(() => props.slug, async () => {
  await fetchProjectDetail();
  selectedLayoutIndex.value = 0;
});

// Fetch Detail data
async function fetchProjectDetail() {
  loading.value = true;
  try {
    const res = await fetch(`${API_BASE}/pu/property/master/data/get_project_detail?project_id=${props.slug}`);
    if (res.ok) {
      project.value = await res.json();
      await fetchSubdivisions();
      await fetchProjectNews();
    }
  } catch (e) {
    console.error('Error fetching project detail:', e);
  } finally {
    loading.value = false;
  }
}

async function fetchSubdivisions() {
  if (!project.value) return;
  try {
    const res = await fetch(`${API_BASE}/pr/property/data/get_building?project_id=${project.value.id}`);
    if (res.ok) {
      subdivisions.value = await res.json();
      if (subdivisions.value.length > 0) {
        activeSubdivisionId.value = subdivisions.value[0].id;
        await fetchInventory(activeSubdivisionId.value);
      }
    }
  } catch (e) {
    console.error('Error fetching subdivisions:', e);
  }
}

async function fetchInventory(subdivisionId) {
  inventoryLoading.value = true;
  try {
    const res = await fetch(`${API_BASE}/pr/property/coordinate_building/search_banghang_data?subdivision_id=${subdivisionId}`);
    if (res.ok) {
      inventory.value = await res.json();
      updateLockedInventoryList();
      updateActiveTimers();
    }
  } catch (e) {
    console.error('Error fetching inventory:', e);
  } finally {
    inventoryLoading.value = false;
  }
}

async function fetchProjectNews() {
  try {
    const res = await fetch(`${API_BASE}/pu/news_public/news/get_real_news`);
    if (res.ok) {
      const allNews = await res.json();
      // Filter news containing project name in title or general list
      const projName = (project.value.project_name || project.value.name).toLowerCase();
      projectNews.value = allNews.filter(n => n.title.toLowerCase().includes(projName) || n.summary.toLowerCase().includes(projName));
      if (projectNews.value.length === 0) {
        projectNews.value = allNews.slice(0, 2); // Default mock fallback
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function handleSubdivisionChange() {
  if (activeSubdivisionId.value) {
    fetchInventory(activeSubdivisionId.value);
  }
}

function updateLockedInventoryList() {
  lockedInventory.value = inventory.value.filter(p => p.status === 'locked');
}

function getSubdivisionName(subId) {
  const sub = subdivisions.value.find(s => s.id === subId);
  return sub ? sub.name : '';
}

function goToTabAndSelectSub(tabId, subId) {
  activeTab.value = tabId;
  activeSubdivisionId.value = subId;
  fetchInventory(subId);
}

// Timer countdown mapping
async function updateActiveTimers() {
  if (inventory.value.length === 0) return;

  const lockedProducts = inventory.value.filter((p) => p.status === 'locked');
  for (const p of lockedProducts) {
    try {
      const res = await fetch(`${API_BASE}/pr/property/data/get_product_locking_time?product_id=${p.id}`);
      if (res.ok) {
        const timeData = await res.json();
        
        if (timeData.status === 'locked' && timeData.seconds_remaining > 0) {
          const m = Math.floor(timeData.seconds_remaining / 60);
          const s = timeData.seconds_remaining % 60;
          activeTimers.value[p.id] = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        } else {
          delete activeTimers.value[p.id];
          await fetchInventory(activeSubdivisionId.value);
          break;
        }
      }
    } catch (e) {
      console.error('Error syncing timer:', e);
    }
  }
}

// Locking triggers
function confirmLockProduct(product) {
  if (!user.value) {
    alert('Bạn cần đăng nhập bằng Số điện thoại của Đại lý/Môi giới để thực hiện khóa căn giữ chỗ!');
    openLogin();
    return;
  }
  selectedProduct.value = product;
  lockNote.value = '';
  showLockConfirmModal.value = true;
}

async function submitLockOrder() {
  try {
    const res = await fetch(`${API_BASE}/pr/property/order/create_lock_order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product_id: selectedProduct.value.id,
        sale_id: user.value.id,
        note: lockNote.value,
      }),
    });

    if (res.ok) {
      alert(`Khóa căn thành công! Căn hộ ${selectedProduct.value.code} được giữ chỗ trong 15 phút.`);
      showLockConfirmModal.value = false;
      selectedProduct.value = null;
      lockNote.value = '';
      
      await fetchInventory(activeSubdivisionId.value);
    } else {
      const err = await res.json();
      alert(`Lỗi khóa căn: ${err.message || 'Căn hộ không khả dụng'}`);
    }
  } catch (e) {
    console.error('Error locking product:', e);
    alert('Không kết nối được đến server backend.');
  }
}

// Utility formatting helpers
function formatPrice(val) {
  if (val >= 1000000000) {
    return `${(val / 1000000000).toFixed(1)} tỷ`;
  }
  return `${(val / 1000000).toFixed(0)} triệu`;
}

function shareProject() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Đã sao chép liên kết dự án vào Clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}
</script>

<style scoped>
.prose-custom :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.75rem;
  margin: 1rem 0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.prose-custom :deep(h3) {
  font-size: 1rem;
  font-weight: 800;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #1e293b;
}
.prose-custom :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}
</style>
