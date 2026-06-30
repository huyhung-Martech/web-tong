<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-vietnam">
    <!-- Header Layout -->
    <Header 
      :user="user" 
      @logout="logout" 
    />

    <!-- Main Router Workspace -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <router-view />
    </main>

    <!-- Footer Layout -->
    <Footer />

    <!-- Global Quick Login Modal -->
    <div v-if="showLoginModal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div class="bg-white w-full max-w-md rounded-2xl shadow-xl border border-slate-100 overflow-hidden transform transition-all duration-300">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold text-slate-800">ĐĂNG NHẬP ĐẠI LÝ</h3>
            <button @click="showLoginModal = false" class="text-slate-400 hover:text-slate-600">
              <i class="bi bi-x-lg text-lg"></i>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-2 uppercase">Số Điện Thoại</label>
              <input 
                v-model="loginPhone" 
                type="text" 
                placeholder="Nhập số điện thoại (Ví dụ: 0989151897)" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
                @keyup.enter="handleLoginSubmit"
              />
            </div>
            
            <button 
              @click="handleLoginSubmit" 
              class="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-bold shadow-md hover-premium transition-all"
            >
              Tiếp Tục
            </button>

            <span class="block text-center text-xs text-slate-400">
              Hệ thống sẽ tự động đăng ký và liên kết tài khoản cho số điện thoại mới để trải nghiệm.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const API_BASE = 'http://localhost:8089/rest_api';

const user = ref(null);
const showLoginModal = ref(false);
const loginPhone = ref('');

// Provide variables/actions for sub-views
provide('user', user);
provide('openLogin', () => {
  showLoginModal.value = true;
});
provide('triggerLogin', triggerLoginByPhone);

onMounted(() => {
  const savedUser = localStorage.getItem('salepro_user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});

async function triggerLoginByPhone(phoneStr) {
  try {
    const res = await fetch(`${API_BASE}/pu/property/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phoneStr }),
    });

    if (res.ok) {
      const data = await res.json();
      user.value = data.user;
      localStorage.setItem('salepro_user', JSON.stringify(data.user));
      localStorage.setItem('salepro_token', data.token);
      return true;
    }
  } catch (e) {
    console.error('Login error:', e);
  }
  alert('Đăng nhập thất bại. Không kết nối được đến server backend.');
  return false;
}

async function handleLoginSubmit() {
  if (!loginPhone.value.trim()) {
    alert('Vui lòng nhập số điện thoại');
    return;
  }
  const success = await triggerLoginByPhone(loginPhone.value);
  if (success) {
    showLoginModal.value = false;
    loginPhone.value = '';
  }
}

function logout() {
  user.value = null;
  localStorage.removeItem('salepro_user');
  localStorage.removeItem('salepro_token');
  window.location.reload(); // Refresh to clean route states
}
</script>
