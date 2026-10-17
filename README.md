# 🏢 Salehub.dev - Hệ Thống Website Tổng BĐS

Dự án Cổng thông tin trung tâm (Portal) kết nối, giới thiệu và điều hướng toàn bộ hệ sinh thái Landing Page và sản phẩm bất động sản của Queen Land.

Kiến trúc Single Page App xây dựng bằng Vue 3 + Vite, cấu hình routing proxy đa phân khu. Domain: <https://salehub.dev/>

## 📁 Cấu trúc thư mục dự án
*   [`src/App.vue`](src/App.vue): Component gốc của ứng dụng, thiết lập layout chung, notification và viewport router.
*   [`src/components/Header.vue`](src/components/Header.vue): Header nhận diện thương hiệu Queen Land, responsive navigation đa thiết bị.
*   [`src/views/ProjectsPage.vue`](src/views/ProjectsPage.vue): Trang tổng hợp danh mục dự án BĐS trọng điểm, bộ lọc phân khúc và trạng thái mở bán.
*   [`src/views/ProjectDetailPage.vue`](src/views/ProjectDetailPage.vue): Trang chi tiết dự án, mặt bằng, vị trí và form liên hệ tư vấn.
*   [`src/views/ComparePage.vue`](src/views/ComparePage.vue): Công cụ so sánh thông số các dự án BĐS trực quan.
*   [`src/data/search_duan_data.json`](src/data/search_duan_data.json): Cơ sở dữ liệu mẫu danh mục dự án phục vụ tìm kiếm nhanh.
*   [`vercel.json`](vercel.json): Cấu hình reverse proxy & routing chuyển tiếp tới các landing page vệ tinh (`/parkland/`, `/ha-long-xanh/`, `/forestia/`).
*   `public/`: Logo thương hiệu, favicon, robots.txt và sitemap.xml.

## 🎨 Thông tin thiết kế chính (Design System)
*   **Tông màu chủ đạo:**
    *   `Navy Dark (#0F172A)`: Màu nền chủ đạo tạo phong cách công nghệ sang trọng, tin cậy.
    *   `Brand Blue (#2563EB)`: Màu nhấn tương tác, nút bấm hành động (CTA) và hiệu ứng active.
    *   `Gold Amber (#F59E0B)`: Điểm xuyết cho huy hiệu dự án VIP và biểu tượng nổi bật.
    *   `Slate Light (#F8FAFC)`: Nền thẻ card nội dung, tạo độ tương phản dịu mắt.
*   **Fonts:**
    *   Tiêu đề (Headings): *Plus Jakarta Sans* / *Google Sans Flex*.
    *   Nội dung (Body): *Inter*.

## 🚀 Chạy thử
Cài đặt thư viện và khởi động môi trường phát triển cục bộ:

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy server phát triển
npm run dev
# rồi mở http://localhost:5173
```

Để đóng gói bản production:
```bash
npm run build
```

## 📌 Việc cần làm khi có tài nguyên mới

### 1. Thêm dự án mới vào danh mục
*   Cập nhật dữ liệu dự án trong file JSON [`src/data/search_duan_data.json`](src/data/search_duan_data.json) (tên, chủ đầu tư, vị trí, khoảng giá, trạng thái).
*   Thêm card hiển thị tương ứng trong [`src/views/ProjectsPage.vue`](src/views/ProjectsPage.vue).

### 2. Cấu hình điều hướng phân khu con (Sub-project)
Nếu dự án mới có Landing Page độc lập (sub-domain), thêm rewrite rule vào [`vercel.json`](vercel.json):
```json
{
  "source": "/ten-du-an/:path*",
  "destination": "https://ten-du-an.salehub.dev/:path*"
}
```

### 3. Cập nhật thông tin liên hệ & kênh mạng xã hội
Kiểm tra số hotline, email `contact@salehub.dev` và liên kết Zalo/Facebook tại footer trong [`src/components/Header.vue`](src/components/Header.vue) và [`src/views/ProjectDetailPage.vue`](src/views/ProjectDetailPage.vue).

## 🖼️ Quy ước xử lý ảnh
Toàn bộ ảnh dự án hiển thị nên được nén sang định dạng **WebP** để tối ưu tốc độ tải trang:

| Loại ảnh | Vị trí | Bề ngang tối đa |
| --- | --- | --- |
| Banner dự án chính | `public/projects/` | 1920px (WebP chất lượng 80%) |
| Card thumbnail danh mục | `public/projects/` | 800px (tỷ lệ 16:9 hoặc 4:3) |
| Logo đối tác / CĐT | `public/` | Chiều cao 40px–60px (PNG trong suốt hoặc SVG) |
