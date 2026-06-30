<template>
  <div 
    class="project-item project-item-zoom card bg-white rounded-2xl border border-slate-200 hover-premium flex flex-col h-full cursor-pointer relative"
    @click="$emit('view-detail', project)"
  >
    <!-- Heart Favorite Button -->
    <div 
      class="absolute top-0 flex justify-center items-center cursor-pointer z-10 p-1 bg-black/25 backdrop-blur-[2px] rounded-full hover:bg-black/40 transition-colors" 
      style="margin-top: 10px; right: 10px; width: 32px; height: 32px;"
      @click.stop="toggleFavorite"
    >
      <i 
        :class="['bi', isFavorite ? 'bi-heart-fill text-red-500' : 'bi-heart text-white']" 
        style="font-size: 16px;"
      ></i>
    </div>

    <!-- Category Ribbon -->
    <div class="relative ribbon ribbon-start ribbon-clip">
      <div class="ribbon-label py-1 pl-2.5 pr-3 top-0 mt-3 text-[0.65rem] font-extrabold tracking-wider uppercase">
        <div>{{ project.estate_type === 'low_rise' ? 'DỰ ÁN THẤP TẦNG' : 'DỰ ÁN CAO TẦNG' }}</div>
        <span :class="['ribbon-inner', project.estate_type === 'low_rise' ? 'ribbon-tertiary' : 'ribbon-quaternary']"></span>
      </div>
      
      <!-- Responsive Image Container -->
      <div class="project-image overflow-hidden relative block w-full rounded-t-2xl" style="padding-bottom: 60%;">
        <img 
          :src="project.image_url || 'https://via.placeholder.com/400x250'" 
          class="card-img-top w-full h-full object-cover cursor-pointer absolute inset-0" 
          alt="Project Image"
        >
        
        <!-- Hot Badge -->
        <div 
          v-if="project.is_hot" 
          class="absolute bottom-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full text-white font-bold text-[0.65rem] tracking-widest uppercase select-none hot-badge"
        >
          <i class="bi bi-fire text-white"></i>
          HOT
        </div>
      </div>
    </div>

    <!-- Info Area -->
    <div class="p-5 flex flex-col flex-grow justify-between">
      <div>
        <div class="flex justify-between items-start gap-2 mb-2">
          <h4 class="text-base font-extrabold text-slate-800 line-clamp-2 pt-1 mb-0 leading-snug">
            {{ project.name }}
          </h4>
          <div class="cursor-pointer flex-shrink-0" @click.stop="shareProject">
            <a class="py-1 px-2 inline-block text-slate-400 hover:text-primary transition-colors" title="Chia sẻ dự án">
              <i class="bi bi-box-arrow-up-right text-base"></i>
            </a>
          </div>
        </div>
        <p class="text-xs text-slate-500 line-clamp-3 mb-4 h-12 leading-relaxed">
          {{ project.description || 'Không có mô tả dự án.' }}
        </p>
      </div>

      <div class="border-t border-slate-100 pt-3">
        <div class="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
          <i class="bi bi-geo-alt-fill text-slate-400 flex-shrink-0 mt-0.5"></i>
          <span class="line-clamp-2 leading-snug">{{ project.location }}</span>
        </div>
        
        <div class="flex justify-between items-center text-xs font-semibold text-slate-400">
          <span><i class="bi bi-eye-fill"></i> {{ project.view_count || 0 }} lượt xem</span>
          <span class="text-primary font-bold">Còn {{ project.available_units }} / {{ project.total_units }} căn</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

defineEmits(['view-detail']);

const isFavorite = ref(false);

onMounted(() => {
  const favorites = JSON.parse(localStorage.getItem('salepro_favorites') || '[]');
  isFavorite.value = favorites.includes(props.project.id);
});

function toggleFavorite() {
  const favorites = JSON.parse(localStorage.getItem('salepro_favorites') || '[]');
  if (favorites.includes(props.project.id)) {
    const idx = favorites.indexOf(props.project.id);
    favorites.splice(idx, 1);
    isFavorite.value = false;
  } else {
    favorites.push(props.project.id);
    isFavorite.value = true;
  }
  localStorage.setItem('salepro_favorites', JSON.stringify(favorites));
}

function shareProject() {
  if (navigator.share) {
    navigator.share({
      title: props.project.name,
      text: props.project.description,
      url: window.location.href
    }).catch(console.error);
  } else {
    navigator.clipboard.writeText(`${window.location.origin}/project-detail/${props.project.slug}`);
    alert('Đã sao chép liên kết dự án vào khay nhớ tạm!');
  }
}
</script>

