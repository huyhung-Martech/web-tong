<template>
  <footer class="bg-slate-900 text-slate-400 pt-6 md:pt-10 pb-0 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- About -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Salehub - Nền tảng công nghệ</h3>
        <p class="text-sm leading-relaxed mb-4">
          Salehub là nền tảng quản trị phân phối bất động sản hiện đại, giúp kết nối môi giới và khách hàng đến những quỹ căn chất lượng cao.
        </p>
        <div class="social-flip-btn-group">
          <!-- Animated Border Lines -->
          <div class="flip-border-lines">
            <div class="flip-border-line top"></div>
            <div class="flip-border-line bottom"></div>
          </div>
          
          <!-- C: Hotline -->
          <a href="#" class="social-flip-node" aria-label="Hotline" style="--index: 0;">
            <span class="social-tooltip">Hotline: Liên hệ</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">C</div>
              <div class="social-flip-back hl-color"><i class="bi bi-telephone-fill"></i></div>
            </div>
          </a>
          
          <!-- O: Zalo -->
          <a href="#" class="social-flip-node" aria-label="Zalo" style="--index: 1;">
            <span class="social-tooltip">Zalo Chat</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">O</div>
              <div class="social-flip-back zl-color">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 14px; height: 14px; display: block;">
                  <path d="M12 2C6.477 2 2 6.134 2 11.238c0 3.123 1.674 5.922 4.298 7.606-.118.847-.48 2.373-.556 2.709-.089.39.155.362.327.247.135-.09 2.146-1.455 3.013-2.066.862.242 1.79.376 2.718.376 5.523 0 10-4.134 10-9.238S17.523 2 12 2zm3.308 12.333c0 .247-.2.447-.447.447h-4.474v-1.118h2.641l-2.84-3.52c-.1-.13-.153-.294-.153-.464V8.455c0-.247.2-.447.447-.447h4.385v1.118H12.35l2.805 3.5c.105.132.153.295.153.463v1.247z" />
                </svg>
              </div>
            </div>
          </a>
          
          <!-- N: Email -->
          <a href="mailto:contact@salehub.dev" class="social-flip-node" aria-label="Email" style="--index: 2;">
            <span class="social-tooltip">Email: contact@salehub.dev</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">N</div>
              <div class="social-flip-back ms-color"><i class="bi bi-envelope-fill"></i></div>
            </div>
          </a>
          
          <!-- T: Facebook Page -->
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" class="social-flip-node" aria-label="Facebook" style="--index: 3;">
            <span class="social-tooltip">Facebook Page</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">T</div>
              <div class="social-flip-back fb-color"><i class="bi bi-facebook"></i></div>
            </div>
          </a>
          
          <!-- A: Zalo Group -->
          <a href="#" class="social-flip-node" aria-label="Zalo Group" style="--index: 4;">
            <span class="social-tooltip">Quỹ căn Zalo Group</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">A</div>
              <div class="social-flip-back zl-color"><i class="bi bi-people-fill"></i></div>
            </div>
          </a>
          
          <!-- C: Youtube -->
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" class="social-flip-node" aria-label="Youtube" style="--index: 5;">
            <span class="social-tooltip">YouTube Channel</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">C</div>
              <div class="social-flip-back yt-color"><i class="bi bi-youtube"></i></div>
            </div>
          </a>
          
          <!-- T: Map -->
          <a href="#" class="social-flip-node" aria-label="Bản đồ" style="--index: 6;">
            <span class="social-tooltip">Vị Trí Bản Đồ</span>
            <div class="social-flip-inner">
              <div class="social-flip-front">T</div>
              <div class="social-flip-back map-color"><i class="bi bi-geo-alt-fill"></i></div>
            </div>
          </a>
        </div>
      </div>

      <!-- Links -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Liên Kết Nhanh</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-white transition-colors">Giới thiệu Salehub</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Quy chế hoạt động sàn</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Chính sách bảo mật</a></li>
          <li><a href="#" class="hover:text-white transition-colors">Hướng dẫn thanh toán khóa căn</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white font-bold text-lg mb-4">Thông Tin Liên Hệ</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2">
            <i class="bi bi-geo-alt-fill text-accent"></i>
            <span>Salehub, Hà Nội & TP. HCM</span>
          </li>
          <li class="flex items-center gap-2">
            <i class="bi bi-envelope-fill text-accent"></i>
            <a href="mailto:contact@salehub.dev" class="hover:text-white">contact@salehub.dev</a>
          </li>
          <li class="flex items-center gap-2">
            <i class="bi bi-telephone-fill text-accent"></i>
            <span>Hotline: Liên hệ (Hỗ trợ 24/7)</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:mt-10 py-4 md:py-6 border-t border-slate-800 text-center text-xs text-slate-600">
      Bản quyền thuộc về Salehub.dev - Một sản phẩm của Queen Land Group.
    </div>
  </footer>
</template>

<style scoped>
.social-flip-btn-group {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    margin-top: 16px;
}

.flip-border-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}

.flip-border-line {
    position: absolute;
    height: 1px;
    width: 100%;
    background: linear-gradient(to right, transparent, rgba(255, 213, 174, 0.4), transparent);
}

.flip-border-line.top {
    top: 0;
    left: 0;
    animation: moveLineRight 2.5s linear infinite;
}

.flip-border-line.bottom {
    bottom: 0;
    left: 0;
    animation: moveLineLeft 2.5s linear infinite;
}

@keyframes moveLineRight {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

@keyframes moveLineLeft {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}

.social-flip-node {
    position: relative;
    width: 32px;
    height: 32px;
    perspective: 1000px;
    cursor: pointer;
    display: block;
}

.social-flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transition-delay: calc(var(--index) * 0.08s);
}

.social-flip-btn-group:hover .social-flip-inner {
    transform: rotateY(180deg);
}

.social-flip-front,
.social-flip-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-weight: 850;
    font-size: 13px;
}

.social-flip-front {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
}

.social-flip-back {
    transform: rotateY(180deg);
    color: #ffffff;
}

.social-flip-back.hl-color {
    background: #169f72;
}

.social-flip-back.zl-color {
    background: #0068FF;
}

.social-flip-back.ms-color {
    background: #ea4335;
}

.social-flip-back.fb-color {
    background: #1877F2;
}

.social-flip-back.yt-color {
    background: #FF0000;
}

.social-flip-back.map-color {
    background: #FFD5AE;
    color: #0f172a;
}

.social-tooltip {
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(10px) scale(0.8);
    bottom: 40px;
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #ffffff;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
    z-index: 100;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.social-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #0f172a;
}

.social-flip-node:hover .social-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
}
</style>
