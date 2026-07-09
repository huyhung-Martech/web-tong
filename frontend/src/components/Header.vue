<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 outline-none">
          <img src="/Logo-Queen-Land-01.png" class="h-[18px] object-contain" alt="Salehub Logo">
          <span class="hidden md:inline text-[10px] text-slate-400 font-extrabold uppercase tracking-widest border-l border-slate-200 pl-3">Salehub.dev</span>
        </router-link>

        <!-- Navigation Links with Spotlight effect -->
        <nav ref="navRef" class="spotlight-nav hidden md:flex items-center gap-1 h-10 px-2 rounded-full border border-slate-200 bg-slate-50/50 relative overflow-hidden">
          <router-link 
            v-for="(item, index) in navItems" 
            :key="index"
            :to="item.to" 
            class="nav-link px-4 py-1.5 rounded-full text-xs font-extrabold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider relative z-10"
            active-class="active-link text-primary!"
          >
            {{ item.label }}
          </router-link>

          <!-- Spotlight light background layer -->
          <div
            class="pointer-events-none absolute inset-y-0 z-0 opacity-0 transition-opacity duration-200"
            :style="{
              opacity: hoverX !== null ? 1 : 0,
              left: `${hoverX - 60}px`,
              width: '120px',
              background: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.12) 0%, transparent 70%)'
            }"
          />
        </nav>

        <!-- User Actions / Login / Contact Agent -->
        <div class="flex items-center gap-2.5">
          <!-- Liên hệ đại lý -->
          <a href="tel:0926066888" class="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-xs font-extrabold shadow-md hover-premium transition-all">
            <i class="bi bi-telephone-fill"></i>
            <span class="hidden xs:inline">Liên hệ đại lý</span>
          </a>

          <!-- Hamburger Button on Mobile -->
          <button 
            @click="showMobileMenu = true" 
            class="flex md:hidden items-center justify-center p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors outline-none"
            aria-label="Open menu"
          >
            <i class="bi bi-list text-lg"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Slide-over Drawer -->
    <transition name="drawer-fade">
      <div v-if="showMobileMenu" class="fixed inset-0 z-50 overflow-hidden md:hidden">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" @click="showMobileMenu = false"></div>
        
        <!-- Sliding panel -->
        <div class="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl flex flex-col justify-between transition-transform duration-300">
          <div class="p-6">
            <!-- Header of drawer -->
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <span class="text-xs font-extrabold text-primary uppercase tracking-wider font-label">Menu Điều Hướng</span>
              <button 
                @click="showMobileMenu = false" 
                class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-250 text-slate-400 hover:text-slate-600 transition-colors outline-none"
              >
                <i class="bi bi-x-lg text-sm"></i>
              </button>
            </div>

            <!-- Links list -->
            <nav class="flex flex-col gap-1.5 mt-6">
              <router-link 
                v-for="(item, index) in navItems" 
                :key="index"
                :to="item.to" 
                class="px-4 py-3 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all flex items-center justify-between uppercase tracking-wider"
                active-class="bg-blue-50/50 text-primary!"
                @click="showMobileMenu = false"
              >
                {{ item.label }}
                <i class="bi bi-chevron-right text-[10px] text-slate-400"></i>
              </router-link>
            </nav>
          </div>

          <!-- Bottom Actions -->
          <div class="p-6 border-t border-slate-100 bg-slate-50/50">
            <a href="tel:0926066888" class="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all">
              <i class="bi bi-telephone-fill text-xs text-emerald-100"></i>
              Hotline: 0926.066.888
            </a>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  user: {
    type: Object,
    default: null
  }
});

defineEmits(['open-login', 'logout']);

const navRef = ref(null);
const hoverX = ref(null);
const showMobileMenu = ref(false);

const navItems = [
  { label: 'Dự án', to: '/project-page' },
  { label: 'Tin tức', to: '/tin-tuc' },
  { label: 'Sự kiện', to: '/su-kien' },
  { label: 'So sánh căn hộ', to: '/compare' },
  { label: 'Hướng dẫn sử dụng', to: '/huong-dan-su-dung' },
];

const handleMouseMove = (e) => {
  if (!navRef.value) return;
  const rect = navRef.value.getBoundingClientRect();
  hoverX.value = e.clientX - rect.left;
};

const handleMouseLeave = () => {
  hoverX.value = null;
};

onMounted(() => {
  if (navRef.value) {
    navRef.value.addEventListener('mousemove', handleMouseMove);
    navRef.value.addEventListener('mouseleave', handleMouseLeave);
  }
});

onUnmounted(() => {
  if (navRef.value) {
    navRef.value.removeEventListener('mousemove', handleMouseMove);
    navRef.value.removeEventListener('mouseleave', handleMouseLeave);
  }
});
</script>

<style scoped>
.active-link {
  background-color: rgba(14, 165, 233, 0.08);
}

/* Slide Drawer animation rules */
.drawer-fade-enter-active, .drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-fade-enter-from, .drawer-fade-leave-to {
  opacity: 0;
}
.drawer-fade-enter-active > div:last-child {
  animation: slide-in 0.3s ease-out;
}
.drawer-fade-leave-active > div:last-child {
  animation: slide-out 0.3s ease-in;
}

@keyframes slide-in {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
@keyframes slide-out {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}
</style>
