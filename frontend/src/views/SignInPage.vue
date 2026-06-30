<template>
  <div class="min-h-[60vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-extrabold text-slate-900">ĐĂNG NHẬP ĐẠI LÝ</h2>
        <p class="text-xs text-slate-400">Đăng nhập bằng số điện thoại để mở khóa tính năng tra cứu bảng hàng và khóa căn giữ chỗ.</p>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Số Điện Thoại</label>
          <div class="relative">
            <i class="bi bi-telephone absolute left-4 top-3.5 text-slate-400 text-sm"></i>
            <input 
              v-model="phone" 
              type="text" 
              placeholder="Nhập số điện thoại (Ví dụ: 0989151897)" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
            />
          </div>
        </div>
        
        <button 
          @click="handleLogin" 
          class="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-md hover-premium transition-all"
        >
          Tiếp Tục
        </button>

        <span class="block text-center text-xs text-slate-400">
          Chưa có tài khoản? Hệ thống sẽ tự động đăng ký liên kết tài khoản cho số điện thoại mới.
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const phone = ref('');
const triggerLogin = inject('triggerLogin');

async function handleLogin() {
  if (!phone.value.trim()) {
    alert('Vui lòng nhập số điện thoại');
    return;
  }

  const success = await triggerLogin(phone.value);
  if (success) {
    router.push({ name: 'Projects' });
  }
}
</script>
