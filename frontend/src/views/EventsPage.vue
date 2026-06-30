<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">SỰ KIỆN MỞ BÁN</h1>
      <p class="mt-2 text-sm text-slate-500">Tham gia các buổi lễ mở bán, lễ ký kết và trải nghiệm dự án thực tế cùng Hưng Land.</p>
    </div>

    <!-- Events Timeline -->
    <div class="space-y-6 max-w-3xl mx-auto">
      <div 
        v-for="(event, idx) in events" 
        :key="idx"
        class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6"
      >
        <div class="w-full md:w-48 h-32 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
          <img :src="event.image" class="w-full h-full object-cover" alt="Event Cover">
        </div>
        
        <div class="flex-grow flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-extrabold text-white bg-primary px-2.5 py-0.5 rounded uppercase">
                {{ event.status === 'upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc' }}
              </span>
              <span class="text-xs text-slate-400 font-bold">{{ event.date }}</span>
            </div>
            <h3 class="text-lg font-extrabold text-slate-800 mt-2.5 leading-snug">{{ event.title }}</h3>
            <p class="text-slate-500 text-xs mt-2 leading-relaxed">{{ event.description }}</p>
          </div>
          
          <div class="flex justify-between items-center mt-4">
            <span class="text-xs text-slate-400 font-medium flex items-center gap-1">
              <i class="bi bi-geo-alt-fill text-primary"></i>
              {{ event.location }}
            </span>
            <button @click="registerEvent(event)" class="btn bg-primary hover:bg-primary-dark text-white text-xs font-bold py-2 px-4 rounded-xl transition-all shadow-sm">
              Đăng ký tham gia
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const events = ref([
  {
    title: 'Lễ công bố phân khu Seasons Garden - Lumière Hanoi',
    date: '28 tháng 6, 2026',
    description: 'Sự kiện ký kết đại lý và công bố giỏ hàng đẹp nhất tòa L1, L2. Khách hàng tham dự nhận chiết khấu trực tiếp 2% và gói quà tặng nội thất cao cấp.',
    location: 'Khách sạn JW Marriott, Hà Nội',
    image: 'https://s3-hfx03.fptcloud.com/image-upload/salepro/1766481729674-banner-web-2.webp',
    status: 'upcoming'
  },
  {
    title: 'Trải nghiệm đỉnh cao Virtual Tour 3d - Global City',
    date: '12 tháng 7, 2026',
    description: 'Sự kiện trải nghiệm thực tế ảo qua kính VR chuyên nghiệp dành riêng cho giới đầu tư, mục kích toàn cảnh khu đô thị The Global City.',
    location: 'Văn phòng Hưng Land, Quận 2, TP.HCM',
    image: 'https://s3-hfx03.fptcloud.com/image-upload/salepro/1766481729674-banner-web-2.webp',
    status: 'upcoming'
  }
]);

function registerEvent(event) {
  alert(`Đăng ký tham dự: "${event.title}" thành công. Chúng tôi sẽ liên hệ lại với bạn qua Số điện thoại đăng ký.`);
}
</script>
