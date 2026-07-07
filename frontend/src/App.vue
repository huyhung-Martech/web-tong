<template>
  <div class="min-h-screen bg-slate-50 flex flex-col font-vietnam">
    <!-- Header Layout -->
    <Header />

    <!-- Main Router Workspace -->
    <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <router-view />
    </main>

    <!-- Footer Layout -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// Provide dummies to prevent injection errors in sub-views
const user = ref(null);
provide('user', user);
provide('openLogin', () => {});
</script>
