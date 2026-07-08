<template>
  <header class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 outline-none">
          <img src="/Logo-Queen-Land-01.png" class="h-9 object-contain" alt="Queen Land Logo">
          <span class="hidden md:inline text-[10px] text-slate-400 font-extrabold uppercase tracking-widest border-l border-slate-200 pl-3">Bất Động Sản Queen Land</span>
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
        <div class="flex items-center gap-3">
          <!-- Liên hệ đại lý -->
          <a href="tel:0926066888" class="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-md hover-premium transition-all">
            <i class="bi bi-telephone-fill"></i>
            Liên hệ đại lý
          </a>

        </div>
      </div>
    </div>
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

const navItems = [
  { label: 'Giới thiệu', to: '/huong-dan-su-dung' },
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
</style>
