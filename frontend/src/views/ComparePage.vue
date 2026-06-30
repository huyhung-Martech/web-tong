<template>
  <div class="py-8 space-y-6">
    <div class="mb-8">
      <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">SO SÁNH CĂN HỘ</h1>
      <p class="mt-2 text-sm text-slate-500">So sánh chi tiết các căn hộ giữa các phân khu, diện tích, giá và hướng nhà để đưa ra lựa chọn đầu tư tối ưu.</p>
    </div>

    <!-- Comparison Table Grid -->
    <div class="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-4xl mx-auto">
      <div class="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <h3 class="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <i class="bi bi-sliders text-primary"></i> Bảng so sánh căn hộ thực tế
        </h3>
        <span class="text-xs text-slate-400 font-semibold">So sánh mẫu 2 căn hot nhất</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-200 bg-slate-50/50 text-slate-400 font-bold text-xs uppercase">
              <th class="py-4 px-6 w-1/4">Thông số</th>
              <th class="py-4 px-6 text-primary w-3/8 font-extrabold text-center">Căn HH-A-06-10 (Lumiere L1)</th>
              <th class="py-4 px-6 text-emerald-600 w-3/8 font-extrabold text-center">Căn HH-B-12-08 (Lumiere L2)</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Dự án</td>
              <td class="py-4 px-6 text-center font-extrabold text-slate-800">LUMIÈRE HANOI</td>
              <td class="py-4 px-6 text-center font-extrabold text-slate-800">LUMIÈRE HANOI</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Giá bán</td>
              <td class="py-4 px-6 text-center font-extrabold text-primary text-base">4.2 tỷ</td>
              <td class="py-4 px-6 text-center font-extrabold text-emerald-600 text-base">4.9 tỷ</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Diện tích thông thủy</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">68.5 m²</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">79.2 m²</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Hướng nhà</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">Đông Nam (Mát mẻ)</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">Tây Bắc (Thoáng đãng)</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Số phòng ngủ</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">2 Phòng Ngủ</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">3 Phòng Ngủ</td>
            </tr>
            <tr class="border-b border-slate-100 hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Tầng số</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">Tầng 6 (Thấp vừa)</td>
              <td class="py-4 px-6 text-center font-medium text-slate-700">Tầng 12 (Trung bình cao)</td>
            </tr>
            <tr class="hover:bg-slate-50/30">
              <td class="py-4 px-6 font-bold text-slate-600">Hành động</td>
              <td class="py-4 px-6 text-center">
                <router-link to="/project-detail/lumiere-hanoi-seasons-garden" class="btn bg-primary text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm hover-premium transition-all">
                  Đặt cọc căn này
                </router-link>
              </td>
              <td class="py-4 px-6 text-center">
                <router-link to="/project-detail/lumiere-hanoi-seasons-garden" class="btn bg-emerald-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-sm hover-premium transition-all">
                  Đặt cọc căn này
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
