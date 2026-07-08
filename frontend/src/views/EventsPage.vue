<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">SỰ KIỆN MỞ BÁN</h1>
      <p class="mt-2 text-sm text-slate-500">Tham gia các buổi lễ mở bán, lễ ký kết và trải nghiệm dự án thực tế cùng Queen Land.</p>
    </div>

    <!-- Empty State -->
    <div class="bg-white border border-slate-200 rounded-2xl p-8 sm:p-16 text-center max-w-xl mx-auto shadow-sm space-y-4">
      <div class="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
        <i class="bi bi-calendar-event text-3xl"></i>
      </div>
      <h3 class="text-lg font-black text-slate-700">Chưa có sự kiện mở bán mới</h3>
      <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
        Hiện tại chưa có sự kiện mở bán nào mới được lên lịch. Vui lòng quay lại sau để cập nhật thông tin về các buổi lễ mở bán và trải nghiệm nhà mẫu thực tế.
      </p>
      <router-link to="/project-page" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-colors">
        <i class="bi bi-building"></i> Xem các dự án đang bán
      </router-link>
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
    location: 'Văn phòng Queen Land, Quận 2, TP.HCM',
    image: 'https://s3-hfx03.fptcloud.com/image-upload/salepro/1766481729674-banner-web-2.webp',
    status: 'upcoming'
  }
]);

function registerEvent(event) {
  alert(`Đăng ký tham dự: "${event.title}" thành công. Chúng tôi sẽ liên hệ lại với bạn qua Số điện thoại đăng ký.`);
}
</script>
