<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">TIN TỨC DỰ ÁN</h1>
      <p class="mt-2 text-sm text-slate-500">Cập nhật tin tức thị trường bất động sản mới nhất và các chính sách ưu đãi từ Queen Land.</p>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>

    <div v-else-if="news.length === 0" class="bg-white border border-slate-200 rounded-2xl p-8 sm:p-16 text-center max-w-xl mx-auto shadow-sm space-y-4">
      <div class="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
        <i class="bi bi-newspaper text-3xl"></i>
      </div>
      <h3 class="text-lg font-black text-slate-700">Chưa có tin tức mới</h3>
      <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
        Hiện tại chưa có tin tức hoặc chính sách mới nào được cập nhật. Vui lòng quay lại sau để xem các tin tức thị trường bất động sản mới nhất.
      </p>
      <router-link to="/project-page" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-colors">
        <i class="bi bi-building"></i> Xem các dự án đang bán
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="item in news" 
        :key="item.id" 
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
      >
        <div class="h-48 overflow-hidden bg-slate-100 relative">
          <img :src="item.image" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" alt="News Cover">
          <span class="absolute top-4 left-4 text-[10px] font-extrabold text-white bg-primary px-2.5 py-1 rounded-md shadow-sm uppercase">
            {{ item.category }}
          </span>
        </div>
        
        <div class="p-5 flex-grow flex flex-col justify-between space-y-4">
          <div>
            <span class="block text-[10px] text-slate-400 font-bold uppercase">{{ item.date }}</span>
            <h3 class="text-base font-extrabold text-slate-800 mt-2 line-clamp-2 leading-snug">{{ item.title }}</h3>
            <p class="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">{{ item.summary }}</p>
          </div>
          
          <button @click="readMore(item)" class="text-xs font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 mt-auto self-start">
            Đọc tiếp
            <i class="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const news = ref([]);
const loading = ref(false);

function readMore(item) {
  alert(`Đang mở bài viết: "${item.title}". Tính năng đọc chi tiết đang được cập nhật.`);
}
</script>
