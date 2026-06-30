<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-vietnam">
    <!-- Header -->
    <div class="bg-[#1b5cb1] py-4 text-white font-extrabold text-center tracking-wider text-base uppercase">
      DỰ ÁN ĐANG BÁN CHẠY
    </div>

    <!-- Content Sections -->
    <div class="p-6 space-y-7">
      <!-- 1. Dự án Cao Tầng -->
      <div>
        <div class="flex items-center text-[#10355c] font-extrabold text-sm mb-2">
          <i class="bi bi-building text-amber-500 mr-2" style="font-size: 16px;"></i>
          <span>Dự án Cao Tầng</span>
        </div>
        <div class="border-b border-slate-100 mb-3.5"></div>
        <ul class="space-y-3 pl-1">
          <li 
            v-for="p in highRiseList" 
            :key="p.slug"
            class="text-[12px] font-bold text-slate-700 hover:text-[#1b5cb1] transition-colors cursor-pointer uppercase tracking-wide leading-snug"
            @click="handleSelect(p)"
          >
            {{ p.name }}
          </li>
        </ul>
      </div>

      <!-- 2. Dự án Thấp Tầng -->
      <div>
        <div class="flex items-center text-[#10355c] font-extrabold text-sm mb-2">
          <i class="bi bi-house-door text-amber-500 mr-2" style="font-size: 16px;"></i>
          <span>Dự án Thấp Tầng</span>
        </div>
        <div class="border-b border-slate-100 mb-3.5"></div>
        <ul class="space-y-3 pl-1">
          <li 
            v-for="p in lowRiseList" 
            :key="p.slug"
            class="text-[12px] font-bold text-slate-700 hover:text-[#1b5cb1] transition-colors cursor-pointer uppercase tracking-wide leading-snug"
            @click="handleSelect(p)"
          >
            {{ p.name }}
          </li>
        </ul>
      </div>

      <!-- 3. Dự án Mới nhất -->
      <div>
        <div class="flex items-center text-[#10355c] font-extrabold text-sm mb-2">
          <i class="bi bi-star text-amber-500 mr-2" style="font-size: 16px;"></i>
          <span>Dự án Mới nhất</span>
        </div>
        <div class="border-b border-slate-100 mb-3.5"></div>
        <ul class="space-y-3 pl-1">
          <li 
            v-for="p in newestList" 
            :key="p.slug"
            class="text-[12px] font-bold text-slate-700 hover:text-[#1b5cb1] transition-colors cursor-pointer uppercase tracking-wide leading-snug"
            @click="handleSelect(p)"
          >
            {{ p.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['select-project']);

// Lists from screenshot
const highRiseList = [
  { name: 'LUMIÈRE HANOI SEASONS GARDEN', slug: 'lumiere-hanoi-seasons-garden' },
  { name: 'VINHOMES STAR CITY', slug: 'vinhomes-star-city' },
  { name: 'VINHOMES GRAND PARK', slug: 'vinhomes-grand-park' },
  { name: 'SUN SYMPHONY 5', slug: 'sun-symphony-5' },
  { name: 'IMPERIA OCEAN CITY - THE PARKLAND', slug: 'imperia-ocean-city-the-parkland' }
];

const lowRiseList = [
  { name: 'VINHOMES GLOBAL GATE HẠ LONG', slug: 'vinhomes-global-gate-ha-long' },
  { name: 'VINHOMES SÀI GÒN PARK', slug: 'vinhomes-sai-gon-park-1' },
  { name: 'VINHOMES HẢI VÂN BAY', slug: 'vinhomes-hai-van-bay' },
  { name: 'VINHOMES OCEAN PARK 3', slug: 'vinhomes-ocean-park-3' },
  { name: 'VINHOMES GREEN PARADISE', slug: 'vinhomes-green-paradise' }
];

const newestList = [
  { name: 'FLAMINGO GOLDEN HILL', slug: 'flamingo-golden-hill' },
  { name: 'HANOI SIGNATURE BY SWISS-BELHOTEL', slug: 'hanoi-signature-by-swiss-belhotel' },
  { name: 'FLAMINGO HERITAGE ONSEN & RESORT', slug: 'flamingo-heritage-onsen-resort' },
  { name: 'EUROWINDOW LIGHT CITY', slug: 'eurowindow-light-city' },
  { name: 'PRIMA BAY HẠ LONG', slug: 'prima-bay-ha-long' }
];

const handleSelect = (item) => {
  // Find project in the full projects list to pass accurate details
  const found = props.projects.find(p => p.slug === item.slug || p.project_slug === item.slug);
  if (found) {
    emit('select-project', found);
  } else {
    // Navigation fallback
    emit('select-project', { slug: item.slug });
  }
};
</script>
