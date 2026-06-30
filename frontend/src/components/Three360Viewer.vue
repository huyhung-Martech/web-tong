<template>
  <div class="relative w-full h-full overflow-hidden select-none" ref="containerRef">
    <!-- ThreeJS Canvas Container -->
    <div class="w-full h-full cursor-grab active:cursor-grabbing" ref="canvasContainerRef"></div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="absolute inset-0 flex flex-col justify-center items-center bg-slate-900/90 text-white z-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
      <span class="text-sm font-semibold">Đang tải hình ảnh 360°...</span>
    </div>

    <!-- Controls Overlay -->
    <div class="absolute bottom-4 right-4 flex items-center gap-2 z-10">
      <button 
        class="w-9 h-9 flex justify-center items-center bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors border border-white/10"
        title="Phóng to"
        @click="zoomIn"
      >
        <i class="bi bi-zoom-in"></i>
      </button>
      <button 
        class="w-9 h-9 flex justify-center items-center bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors border border-white/10"
        title="Thu nhỏ"
        @click="zoomOut"
      >
        <i class="bi bi-zoom-out"></i>
      </button>
      <button 
        class="w-9 h-9 flex justify-center items-center bg-black/60 hover:bg-black/80 text-white rounded-lg transition-colors border border-white/10"
        title="Toàn màn hình"
        @click="toggleFullscreen"
      >
        <i :class="['bi', isFullscreen ? 'bi-fullscreen-exit' : 'bi-fullscreen']"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as THREE from 'three';

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  }
});

const containerRef = ref(null);
const canvasContainerRef = ref(null);
const loading = ref(true);
const isFullscreen = ref(false);

let scene, camera, renderer, sphere, texture;
let animationFrameId;

// Camera angles (longitude / latitude)
let lon = 0;
let lat = 0;
let phi = 0;
let theta = 0;

// Interaction state
let isUserInteracting = false;
let onPointerDownPointerX = 0;
let onPointerDownPointerY = 0;
let onPointerDownLon = 0;
let onPointerDownLat = 0;

const initThree = () => {
  if (!canvasContainerRef.value) return;

  const width = canvasContainerRef.value.clientWidth;
  const height = canvasContainerRef.value.clientHeight || 450;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  // Sphere Geometry (scaled negative on X to render texture on the inside)
  const geometry = new THREE.SphereGeometry(500, 60, 40);
  geometry.scale(-1, 1, 1);

  // Load Texture
  loading.value = true;
  const loader = new THREE.TextureLoader();
  texture = loader.load(
    props.imageUrl,
    () => {
      loading.value = false;
    },
    undefined,
    (err) => {
      console.error('Error loading 360 texture:', err);
      loading.value = false;
    }
  );

  // Material & Mesh
  const material = new THREE.MeshBasicMaterial({ map: texture });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  canvasContainerRef.value.appendChild(renderer.domElement);

  // Event Listeners
  const dom = renderer.domElement;
  dom.addEventListener('pointerdown', onPointerDown);
  dom.addEventListener('wheel', onDocumentMouseWheel);
  window.addEventListener('resize', onWindowResize);

  // Start Animation Loop
  animate();
};

const onPointerDown = (event) => {
  if (event.isPrimary === false) return;

  isUserInteracting = true;

  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;

  onPointerDownLon = lon;
  onPointerDownLat = lat;

  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
};

const onPointerMove = (event) => {
  if (event.isPrimary === false) return;

  const clientX = event.clientX;
  const clientY = event.clientY;

  const factor = camera.fov / 300; 

  lon = (onPointerDownPointerX - clientX) * factor + onPointerDownLon;
  lat = (clientY - onPointerDownPointerY) * factor + onPointerDownLat;
};

const onPointerUp = (event) => {
  if (event.isPrimary === false) return;

  isUserInteracting = false;

  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);
};

const onDocumentMouseWheel = (event) => {
  const fov = camera.fov + event.deltaY * 0.05;
  camera.fov = Math.max(30, Math.min(100, fov));
  camera.updateProjectionMatrix();
};

const zoomIn = () => {
  const fov = camera.fov - 10;
  camera.fov = Math.max(30, Math.min(100, fov));
  camera.updateProjectionMatrix();
};

const zoomOut = () => {
  const fov = camera.fov + 10;
  camera.fov = Math.max(30, Math.min(100, fov));
  camera.updateProjectionMatrix();
};

const toggleFullscreen = () => {
  if (!containerRef.value) return;
  if (!document.fullscreenElement) {
    containerRef.value.requestFullscreen().then(() => {
      isFullscreen.value = true;
    }).catch(console.error);
  } else {
    document.exitFullscreen().then(() => {
      isFullscreen.value = false;
    });
  }
};

const onWindowResize = () => {
  if (!canvasContainerRef.value || !camera || !renderer) return;
  const width = canvasContainerRef.value.clientWidth;
  const height = canvasContainerRef.value.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
};

const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  update();
};

const update = () => {
  lat = Math.max(-85, Math.min(85, lat));
  
  // Rotate slightly when idle
  if (!isUserInteracting) {
    lon += 0.06;
  }

  phi = THREE.MathUtils.degToRad(90 - lat);
  theta = THREE.MathUtils.degToRad(lon);

  const target = new THREE.Vector3();
  target.x = 500 * Math.sin(phi) * Math.sin(theta);
  target.y = 500 * Math.cos(phi);
  target.z = 500 * Math.sin(phi) * Math.cos(theta);

  camera.lookAt(target);
  renderer.render(scene, camera);
};

const cleanUp = () => {
  cancelAnimationFrame(animationFrameId);

  if (renderer && renderer.domElement) {
    renderer.domElement.removeEventListener('pointerdown', onPointerDown);
    renderer.domElement.removeEventListener('wheel', onDocumentMouseWheel);
    if (renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  window.removeEventListener('resize', onWindowResize);
  document.removeEventListener('pointermove', onPointerMove);
  document.removeEventListener('pointerup', onPointerUp);

  if (sphere) {
    if (sphere.geometry) sphere.geometry.dispose();
    if (sphere.material) {
      if (Array.isArray(sphere.material)) {
        sphere.material.forEach(m => m.dispose());
      } else {
        sphere.material.dispose();
      }
    }
  }

  if (texture) texture.dispose();
  if (renderer) renderer.dispose();
};

onMounted(() => {
  setTimeout(initThree, 100);
});

onBeforeUnmount(() => {
  cleanUp();
});

watch(() => props.imageUrl, (newUrl) => {
  if (texture) texture.dispose();
  loading.value = true;
  const loader = new THREE.TextureLoader();
  texture = loader.load(
    newUrl,
    () => {
      loading.value = false;
      if (sphere) {
        sphere.material.map = texture;
        sphere.material.needsUpdate = true;
      }
    },
    undefined,
    (err) => {
      console.error('Error reloading 360 texture:', err);
      loading.value = false;
    }
  );
});
</script>
