<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">SO SÁNH CĂN HỘ</h1>
      <p class="mt-2 text-sm text-slate-500">So sánh chi tiết các căn hộ giữa các phân khu, diện tích, giá và hướng nhà để đưa ra lựa chọn đầu tư tối ưu.</p>
    </div>

    <!-- Empty State -->
    <div class="bg-white border border-slate-200 rounded-2xl p-8 sm:p-16 text-center max-w-xl mx-auto shadow-sm space-y-4">
      <div class="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto text-slate-300">
        <i class="bi bi-sliders text-3xl"></i>
      </div>
      <h3 class="text-lg font-black text-slate-700">Chưa có căn hộ nào được so sánh</h3>
      <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
        Hiện tại chưa có dữ liệu so sánh căn hộ. Các bảng so sánh và phân tích chi tiết dòng tiền sẽ được cập nhật khi các phân khu chính thức mở bán.
      </p>
      <router-link to="/project-page" class="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-sm transition-colors">
        <i class="bi bi-building"></i> Quay lại danh sách dự án
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
