<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">HƯỚNG DẪN SỬ DỤNG</h1>
      <p class="mt-2 text-sm text-slate-500">Tìm hiểu quy trình tra cứu bảng hàng trực tuyến, cách đăng nhập và các bước khóa căn giữ chỗ căn hộ.</p>
    </div>

    <!-- Instruction Cards -->
    <div class="max-w-4xl mx-auto space-y-6">
      <div 
        v-for="(step, idx) in steps" 
        :key="idx"
        class="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-5 items-start"
      >
        <div class="bg-primary/10 text-primary font-black text-lg h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0">
          {{ idx + 1 }}
        </div>
        <div class="space-y-2">
          <h3 class="text-base font-extrabold text-slate-800">{{ step.title }}</h3>
          <p class="text-slate-500 text-xs leading-relaxed">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const steps = ref([
  {
    title: 'Đăng nhập Tài khoản Đại lý / Khách hàng',
    description: 'Bấm vào nút "Đăng nhập" ở góc trên bên phải màn hình. Nhập Số điện thoại của bạn, hệ thống sẽ tự động xác thực và liên kết tài khoản của bạn để trải nghiệm tính năng.'
  },
  {
    title: 'Tìm kiếm và Lọc dự án phù hợp',
    description: 'Sử dụng bộ lọc ở trang chủ để tìm kiếm các dự án theo Chủ đầu tư, Vị trí khu vực, Trạng thái mở bán và Loại hình Cao tầng / Thấp tầng.'
  },
  {
    title: 'Kiểm tra sơ đồ căn hộ (Bảng hàng)',
    description: 'Truy cập vào trang chi tiết của dự án, chọn tab "Bảng hàng", chọn Block/Tòa nhà tương ứng. Hệ thống sẽ hiển thị sơ đồ căn hộ thời gian thực: Căn trống màu Xanh, Căn đang khóa màu Cam và Căn đã bán màu Đỏ.'
  },
  {
    title: 'Thực hiện khóa căn giữ chỗ tạm thời',
    description: 'Nhấp chọn một căn trống màu Xanh để mở cửa sổ yêu cầu khóa căn. Nhập ghi chú (ví dụ: Tên khách hàng đặt chỗ, số tiền cọc...) rồi bấm "Xác nhận". Căn hộ sẽ được giữ chỗ trong 15 phút kèm bộ đếm ngược thời gian thực.'
  }
]);
</script>
