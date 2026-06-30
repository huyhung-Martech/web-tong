<template>
  <div class="py-8">
    <!-- Top Title and Slogan -->
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">DANH SÁCH DỰ ÁN</h1>
      <p class="mt-2 text-sm text-slate-500">Tra cứu bảng hàng trực tuyến và khóa căn giữ chỗ tức thời dành cho đại lý và khách hàng Hưng Land.</p>
    </div>

    <!-- Sticky Search & Filters Bar -->
    <div class="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-md py-4 mb-8 border-b border-slate-200/60 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="max-w-7xl mx-auto flex flex-col xl:flex-row gap-3 items-center justify-between">
        <!-- Search Input -->
        <div class="relative w-full xl:max-w-xs">
          <i class="bi bi-search absolute left-3 top-3 text-slate-400 text-sm"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Tìm kiếm dự án..." 
            class="cf-input pl-9"
          />
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 w-full xl:w-auto flex-grow xl:flex-grow-0 justify-end">
          <!-- Developer Select -->
          <div class="relative w-full min-w-[140px]">
            <i class="bi bi-person-badge absolute left-3 top-3.5 text-slate-400 text-xs pointer-events-none"></i>
            <select v-model="selectedDeveloper" class="cf-select pl-9 text-xs">
              <option value="all">Chủ đầu tư (Tất cả)</option>
              <option v-for="dev in developersList" :key="dev" :value="dev">{{ dev }}</option>
            </select>
          </div>

          <!-- Region Select -->
          <div class="relative w-full min-w-[140px]">
            <i class="bi bi-geo-alt absolute left-3 top-3.5 text-slate-400 text-xs pointer-events-none"></i>
            <select v-model="selectedLocation" class="cf-select pl-9 text-xs">
              <option value="all">Khu vực (Tất cả)</option>
              <option v-for="loc in locationsList" :key="loc" :value="loc">{{ loc }}</option>
            </select>
          </div>

          <!-- Estate Type Select -->
          <div class="relative w-full min-w-[140px]">
            <i class="bi bi-building absolute left-3 top-3.5 text-slate-400 text-xs pointer-events-none"></i>
            <select v-model="selectedCategory" class="cf-select pl-9 text-xs">
              <option value="all">Loại hình (Tất cả)</option>
              <option value="high_rise">Cao tầng</option>
              <option value="low_rise">Thấp tầng</option>
            </select>
          </div>

          <!-- Status Select -->
          <div class="relative w-full min-w-[140px]">
            <i class="bi bi-info-circle absolute left-3 top-3.5 text-slate-400 text-xs pointer-events-none"></i>
            <select v-model="selectedStatus" class="cf-select pl-9 text-xs">
              <option value="all">Trạng thái (Tất cả)</option>
              <option value="opening">Đang mở bán</option>
              <option value="upcoming">Sắp mở bán</option>
              <option value="sold_out">Đã bán hết</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      <!-- Left Side: Projects Grid (3 cols) -->
      <div class="lg:col-span-3">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
        
        <div v-else-if="filteredProjects.length === 0" class="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <i class="bi bi-folder-x text-5xl text-slate-300 block mb-4"></i>
          <h3 class="text-lg font-bold text-slate-700 mb-1">Không tìm thấy dự án</h3>
          <p class="text-sm text-slate-400">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="p in filteredProjects" :key="p.id">
            <ProjectCard :project="p" @view-detail="navigateToDetail" />
          </div>
        </div>
      </div>

      <!-- Right Side: Hot Projects & News (1 col) -->
      <div class="lg:col-span-1">
        <Sidebar 
          :projects="projects" 
          @select-project="navigateToDetail" 
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProjectCard from '../components/ProjectCard.vue';
import Sidebar from '../components/Sidebar.vue';

const router = useRouter();
const API_BASE = 'http://localhost:8089/rest_api';

// State variables
const projects = ref([]);
const newsList = ref([]);
const loading = ref(true);

const selectedCategory = ref('all');
const selectedDeveloper = ref('all');
const selectedLocation = ref('all');
const selectedStatus = ref('all');
const searchQuery = ref('');

onMounted(() => {
  fetchProjects();
  fetchNews();
});

// API calls
async function fetchProjects() {
  loading.value = true;
  try {
    const res = await fetch(`${API_BASE}/pu/property/master/data/search_duan_data`);
    if (res.ok) {
      projects.value = await res.json();
    }
  } catch (e) {
    console.error('Error fetching projects:', e);
  } finally {
    loading.value = false;
  }
}

async function fetchNews() {
  try {
    const res = await fetch(`${API_BASE}/pu/news_public/news/get_real_news`);
    if (res.ok) {
      newsList.value = await res.json();
    }
  } catch (e) {
    console.error('Error fetching news:', e);
  }
}

// Compute values
const developersList = computed(() => {
  const list = projects.value.map(p => p.investor || p.developer).filter(Boolean);
  return [...new Set(list)];
});

const locationsList = computed(() => {
  return ['Hồ Chí Minh', 'Hà Nội', 'Phú Quốc', 'Nha Trang', 'Hưng Yên', 'Quảng Ninh', 'Đà Nẵng'];
});

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    const matchesCategory = selectedCategory.value === 'all' || p.project_type === selectedCategory.value || p.estate_type === selectedCategory.value;
    const matchesDeveloper = selectedDeveloper.value === 'all' || (p.investor === selectedDeveloper.value || p.developer === selectedDeveloper.value);
    const matchesLocation = selectedLocation.value === 'all' || 
      (p.project_address || p.location).toLowerCase().includes(selectedLocation.value.toLowerCase());
    const matchesStatus = selectedStatus.value === 'all' || p.status === selectedStatus.value;
    
    const searchLow = searchQuery.value.toLowerCase();
    const matchesSearch = !searchQuery.value || 
      p.project_name.toLowerCase().includes(searchLow) ||
      p.name.toLowerCase().includes(searchLow) ||
      (p.project_address || p.location).toLowerCase().includes(searchLow) ||
      (p.investor && p.investor.toLowerCase().includes(searchLow)) ||
      (p.description && p.description.toLowerCase().includes(searchLow));
      
    return matchesCategory && matchesDeveloper && matchesLocation && matchesStatus && matchesSearch;
  });
});

const hotProjects = computed(() => {
  // Take first 3 projects with high views or arbitrary criteria as hot
  return projects.value.slice(0, 3);
});

function navigateToDetail(project) {
  const slug = project.project_slug || project.slug;
  router.push({ name: 'ProjectDetail', params: { slug } });
}
</script>
