# 🏢 Salehub.dev — Hệ thống Website Tổng BĐS & Cổng Thông Tin Dự Án

[![Website](https://img.shields.io/badge/Live%20Web-salehub.dev-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://salehub.dev/)
[![Vue 3](https://img.shields.io/badge/Vue.js-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

Hệ thống Website Tổng BĐS **Salehub** là cổng thông tin trung tâm (Portal) kết nối, giới thiệu và điều hướng toàn bộ hệ sinh thái các dự án bất động sản, landing page bán hàng và dữ liệu phân khu của doanh nghiệp.

---

## 🌐 Đường Dẫn Mở Trang Web Trực Tiếp

* **Website Tổng chính thức:** 👉 **[https://salehub.dev](https://salehub.dev)** *(hoặc `https://www.salehub.dev/`)*
* **Hệ thống phân khu vệ tinh (Tích hợp rewrite qua Vercel):**
  * 🏢 **The Parkland (Imperia Ocean City):** [https://salehub.dev/parkland/](https://salehub.dev/parkland/) *(Trỏ về `https://parkland.salehub.dev/`)*
  * 🌊 **Vinhomes Cổ Loa / Hạ Long Xanh:** [https://salehub.dev/ha-long-xanh/](https://salehub.dev/ha-long-xanh/) *(Trỏ về `https://globalgate.salehub.dev/`)*
  * 🌳 **Forestia Park (MIK Phố Nối):** [https://salehub.dev/forestia/](https://salehub.dev/forestia/) *(Trỏ về `https://forestia.salehub.dev/`)*

---

## 🚀 Tính Năng Nổi Bật

1. **Giao diện Modern Real Estate Portal:** Thiết kế sang trọng chuẩn thương hiệu Queen Land, tối ưu trải nghiệm mượt mà trên cả Desktop lẫn Mobile.
2. **Thanh điều hướng Spotlight & Header tinh chỉnh:** Tích hợp nhận diện thương hiệu, bộ lọc dự án theo trạng thái mở bán, vị trí địa lý và phân khúc đầu tư.
3. **Cấu hình Redirects & Proxy Routing đa dự án (`vercel.json`):** Điều hướng liền mạch giữa tên miền tổng `salehub.dev` tới các landing page chuyên biệt độc lập mà người dùng không bị gián đoạn trải nghiệm.
4. **Chuẩn hóa SEO On-page:** Tích hợp meta thẻ canonical, structured data Schema.org, Open Graph preview và bộ lọc chặn bots cào dữ liệu khi chưa công bố chính thức.

---

## 🛠️ Công Nghệ Sử Dụng

* **Frontend:** Vue 3 (Composition API / `<script setup>`), Vue Router.
* **Build Tool:** Vite tốc độ cao, hỗ trợ Hot Module Replacement (HMR).
* **Styling:** Tailwind CSS, Heroicons, Google Sans Flex & Inter typography.
* **Hosting & CDN:** Vercel Global Edge Network với chứng chỉ bảo mật SSL tự động.

---

## 📁 Cấu Trúc Thư Mục Dự Án

```text
├── public/                # Hình ảnh logo, favicon, sitemap.xml, robots.txt
├── src/
│   ├── assets/            # CSS toàn cục và hình ảnh tĩnh
│   ├── components/        # Header, Footer, SpotlightNavbar, ProjectCard,...
│   ├── views/             # HomePage, ProjectDetailPage, AboutView,...
│   ├── router/            # Cấu hình Vue Router
│   ├── App.vue            # Component gốc
│   └── main.js            # Khởi tạo Vue Application
├── vercel.json            # Cấu hình Routing, Proxy & Sub-domain redirects
├── vite.config.js         # Cấu hình Vite Build
└── package.json           # Dependencies và scripts
```

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Thử Trên Máy

### Yêu cầu môi trường
* Node.js phiên bản **18.x** hoặc **20.x trở lên**.
* Trình quản lý gói `npm` hoặc `pnpm`.

### Các bước thực hiện
```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Local Dev)
npm run dev
# Mở trình duyệt tại: http://localhost:5173

# 3. Đóng gói mã nguồn cho Production
npm run build

# 4. Xem trước bản đóng gói
npm run preview
```

---

## ☁️ Quy Trình Triển Khai (Deployment)

Dự án đã được liên kết trực tiếp với dịch vụ **Vercel**:
* **Branch triển khai chính:** `main` (hoặc `master`).
* Mỗi khi có commit mới được đẩy (push) lên GitHub, Vercel sẽ tự động trigger quy trình CI/CD build và cập nhật phiên bản mới nhất lên tên miền **`salehub.dev`**.

---

## 📋 Thông Tin Bàn Giao

* **Đơn vị phát triển:** Phòng MarTech / Kỹ thuật số BĐS.
* **Người bàn giao:** `huyhung-Martech`
* **Vị trí thư mục cục bộ:** `H:\test antigravity\projects\web-tong\`
