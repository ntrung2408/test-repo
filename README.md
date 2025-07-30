# 💰 Ứng Dụng Quản Lý Tài Chính Cá Nhân

Một ứng dụng web hiện đại để quản lý tài chính cá nhân, được xây dựng với React, TypeScript và Tailwind CSS.

## ✨ Tính Năng

### 📊 Dashboard Tổng Quan
- Hiển thị thống kê tổng quan về tài chính
- Biểu đồ thu chi theo tháng
- Biểu đồ chi tiêu theo danh mục
- Danh sách giao dịch gần đây

### 💸 Quản Lý Giao Dịch
- Thêm giao dịch thu nhập/chi tiêu
- Phân loại theo danh mục có sẵn
- Ghi chú mô tả chi tiết
- Chọn ngày giao dịch

### 📋 Lịch Sử Giao Dịch
- Xem tất cả giao dịch
- Tìm kiếm theo mô tả/danh mục
- Lọc theo loại giao dịch
- Sắp xếp theo ngày/số tiền
- Xóa giao dịch

### 📈 Báo Cáo & Xuất Dữ Liệu
- Xuất dữ liệu CSV/JSON
- Tạo báo cáo chi tiết
- Lọc theo khoảng thời gian
- Thống kê theo danh mục

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Chart.js** - Biểu đồ
- **Lucide React** - Icons
- **date-fns** - Date utilities
- **Local Storage** - Lưu trữ dữ liệu

## 🚀 Cài Đặt và Chạy

### Yêu Cầu Hệ Thống
- Node.js 16+ 
- npm hoặc yarn

### Các Bước Cài Đặt

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd finance-manager-app
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

4. **Mở trình duyệt:**
   Truy cập `http://localhost:3000`

### Scripts Khác

```bash
# Build cho production
npm run build

# Preview build
npm run preview

# Lint code
npm run lint
```

## 📱 Giao Diện

### Desktop
- Layout responsive hoàn hảo
- Navigation tabs rõ ràng
- Charts và tables tối ưu

### Mobile
- Giao diện thân thiện mobile
- Touch-friendly controls
- Responsive design

## 🎨 Danh Mục Có Sẵn

### Thu Nhập
- 💰 Lương
- 🎁 Thưởng  
- 📈 Đầu tư
- 📋 Khác

### Chi Tiêu
- 🍕 Ăn uống
- 🚗 Giao thông
- 🛍️ Mua sắm
- 🎮 Giải trí
- 💡 Hóa đơn
- 🏥 Sức khỏe
- 📚 Giáo dục
- 📋 Khác

## 💾 Lưu Trữ Dữ Liệu

Ứng dụng sử dụng **Local Storage** để lưu trữ dữ liệu:
- Dữ liệu được lưu tự động
- Không cần server
- Dữ liệu tồn tại khi đóng/mở lại trình duyệt
- Có thể xuất backup dưới dạng JSON

## 📊 Biểu Đồ & Thống Kê

### Biểu Đồ Cột
- Thu chi theo 6 tháng gần nhất
- So sánh trực quan thu nhập vs chi tiêu

### Biểu Đồ Tròn
- Phân bổ chi tiêu theo danh mục
- Hiển thị phần trăm và giá trị

### Thẻ Thống Kê
- Tổng thu nhập
- Tổng chi tiêu  
- Số dư hiện tại
- Thu nhập tháng này

## 🔧 Tùy Chỉnh

### Thêm Danh Mục Mới
Chỉnh sửa file `src/context/FinanceContext.tsx`:
```typescript
const defaultCategories: Category[] = [
  // Thêm danh mục mới ở đây
  { id: 'new-id', name: 'Tên Danh Mục', type: 'expense', color: '#color' }
];
```

### Thay Đổi Màu Sắc
Chỉnh sửa file `tailwind.config.js` hoặc `src/index.css`

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## 🆘 Hỗ Trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi:
- Tạo issue trên GitHub
- Liên hệ qua email
- Xem documentation

## 🔮 Tính Năng Tương Lai

- [ ] Dark mode
- [ ] Đồng bộ cloud
- [ ] Thông báo nhắc nhở
- [ ] Ngân sách hàng tháng
- [ ] Mục tiêu tiết kiệm
- [ ] Import từ bank statement
- [ ] Multi-currency support
- [ ] Mobile app

---

**Được phát triển với ❤️ bằng React và TypeScript**
