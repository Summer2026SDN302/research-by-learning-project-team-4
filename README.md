[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iZHHambl)

LinkJira:

https://nguyenngocbuu03.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiNWM0M2E0MzMwODNkNDdjMTlmNTU0ZWNhMzJiYTFhMDQiLCJwIjoiaiJ9


# Cultural & Craft Workshop Booking System

## Nền tảng đặt chỗ trải nghiệm workshop và mua sắm sản phẩm văn hóa địa phương

---

## 1. Giới thiệu dự án

**Cultural & Craft Workshop Booking System** là một nền tảng web hỗ trợ số hóa quy trình đặt chỗ tham gia các workshop văn hóa địa phương và mua sắm sản phẩm thủ công từ các xưởng/nghệ nhân.

Hệ thống hướng đến các hoạt động như:

- Đặt vé tham gia workshop làm gốm, nấu ăn truyền thống, thủ công mỹ nghệ.
- Mua sản phẩm vật lý do các xưởng địa phương đăng bán.
- Quản lý lịch trình workshop theo từng khung giờ.
- Check-in khách tham gia bằng mã QR.
- Quản lý nhân sự Tour Guide.
- Thống kê doanh thu cho Admin và Host.

### Quy mô dự án

- **Số lượng thành viên:** 5 người
- **Thời gian thực hiện:** 8 tuần
- **Mô hình phát triển:** Research by Learning (RBL)
- **Kiến trúc hệ thống:** Fullstack Web Application theo mô hình MVC ở Backend

---

## 2. Mục tiêu dự án

Dự án không chỉ dừng ở mức xây dựng một hệ thống CRUD thông thường mà tập trung giải quyết bài toán thực tế trong nền tảng đặt chỗ và thương mại điện tử:

- Làm thế nào để nhiều khách hàng đặt vé cùng lúc nhưng không bị overbooking?
- Làm thế nào để kiểm soát số lượng slot trong từng Timeslot?
- Làm thế nào để quản lý đồng thời vé workshop và sản phẩm vật lý?
- Làm thế nào để Host quản lý Tour Guide và phân công lịch trình hiệu quả?
- Làm thế nào để check-in khách bằng QR Code một cách nhanh và chính xác?

---

## 3. Hàm lượng nghiên cứu RBL (Research by Learning)

### 3.1. Chủ đề RBL

Dự án tập trung nghiên cứu:

> **Kiến trúc hệ thống và thuật toán kiểm soát đồng thời trong hệ thống đặt chỗ workshop sử dụng NoSQL Database.**

Cụ thể, nhóm nghiên cứu cách xử lý bài toán **Concurrency Control** trong MongoDB để tránh tình trạng nhiều người dùng cùng đặt vé vào một Timeslot nhưng số lượng vé bị vượt quá giới hạn cho phép.

---

### 3.2. Bài toán nghiên cứu

Trong hệ thống booking, mỗi workshop có nhiều khung giờ, mỗi khung giờ có số lượng slot giới hạn.

Ví dụ:

- Timeslot lúc 08:00 có 10 slot.
- Cùng lúc có 5 khách hàng thao tác đặt vé.
- Mỗi khách đặt 3 vé.
- Nếu xử lý không đúng, hệ thống có thể ghi nhận 15 vé trong khi chỉ có 10 slot.

Đây là lỗi **Overbooking** do **Race Condition** khi nhiều request cập nhật cùng một tài nguyên tại cùng một thời điểm.

---

### 3.3. Nội dung nghiên cứu chính

Nhóm tập trung vào 3 hướng nghiên cứu:

#### 1. Thuật toán kiểm soát slot

Nghiên cứu cách kiểm tra và cập nhật slot an toàn:

- Kiểm tra `availableSlots >= quantity`.
- Tăng `bookedSlots`.
- Giảm `availableSlots`.
- Cập nhật trạng thái Timeslot thành `FULL` khi hết slot.

Giải pháp đề xuất:

```js
Timeslot.findOneAndUpdate(
  {
    _id: timeslotId,
    availableSlots: { $gte: quantity }
  },
  {
    $inc: {
      bookedSlots: quantity,
      availableSlots: -quantity
    }
  },
  { new: true }
);
```

Cách này sử dụng **Atomic Update** của MongoDB để đảm bảo thao tác kiểm tra và cập nhật diễn ra an toàn trong một lần xử lý.

---

#### 2. Kiến trúc hệ thống

Dự án áp dụng kiến trúc Fullstack gồm:

- **Frontend:** ReactJS + TypeScript
- **Backend:** Node.js + Express.js + TypeScript
- **Database:** MongoDB + Mongoose
- **API:** RESTful API
- **Authentication:** JWT
- **Authorization:** Role-Based Access Control

Backend được tổ chức theo mô hình MVC:

```txt
Model       -> MongoDB/Mongoose Schema
View        -> JSON Response vì Backend là REST API
Controller  -> Xử lý request, gọi service, trả response
Service     -> Xử lý business logic phức tạp
```

---

#### 3. Công nghệ hỗ trợ nghiệp vụ

Dự án nghiên cứu và áp dụng thêm các công nghệ:

- **JWT:** xác thực người dùng.
- **bcryptjs:** mã hóa mật khẩu.
- **QRCode:** sinh mã vé điện tử.
- **Multer + Cloudinary/AWS S3:** upload ảnh workshop, sản phẩm, review.
- **Nodemailer:** gửi email vé và hóa đơn.
- **VNPay/MoMo Sandbox:** mô phỏng thanh toán online.
- **Recharts:** hiển thị biểu đồ doanh thu.
- **React Context API:** quản lý trạng thái đăng nhập và giỏ hàng.
- **LocalStorage:** lưu giỏ hàng ở phía trình duyệt.

---

### 3.4. Kết quả kỳ vọng của RBL

Sau khi hoàn thành dự án, nhóm có thể chứng minh:

- Hệ thống đặt vé không vượt quá số lượng slot cho phép.
- Tour Guide chỉ xem được lịch trình được Host phân công.
- QR Code chỉ được check-in một lần.
- Tourist chỉ được review sau khi đã check-in thành công.
- Admin và Host có thể xem thống kê doanh thu.
- Dữ liệu booking, payment, order được quản lý rõ ràng bằng MongoDB.

---

## 4. Phân quyền hệ thống

Hệ thống có 4 vai trò chính:

### 4.1. Admin

Admin là quản trị viên hệ thống.

Chức năng chính:

- Đăng nhập hệ thống.
- Quản lý danh sách User, Host, Tourist, Tour Guide.
- Duyệt tài khoản Host mới đăng ký.
- Khóa hoặc mở khóa tài khoản người dùng.
- Xem thống kê doanh thu toàn hệ thống.

---

### 4.2. Host

Host là chủ xưởng hoặc nghệ nhân.

Chức năng chính:

- Đăng ký tài khoản và chờ Admin duyệt.
- CRUD Workshop.
- Upload ảnh workshop.
- Tạo và quản lý Timeslot.
- CRUD sản phẩm vật lý.
- Quản lý tồn kho sản phẩm.
- Quản lý đơn hàng.
- Tạo tài khoản Tour Guide.
- Gán Tour Guide vào Timeslot.
- Xem dashboard doanh thu cá nhân.

---

### 4.3. Tour Guide

Tour Guide là nhân viên thuộc Host.

Chức năng chính:

- Đăng nhập bằng tài khoản do Host tạo.
- Xem lịch trình được phân công.
- Xem danh sách khách trong từng Timeslot.
- Quét QR Code để check-in khách.
- Cập nhật trạng thái chuyến đi:
  - Chưa bắt đầu
  - Đang diễn ra
  - Đã kết thúc
  - Hoàn thành

Giao diện Tour Guide được thiết kế theo hướng **mobile-first** vì Tour Guide thường sử dụng điện thoại khi check-in tại xưởng.

---

### 4.4. Tourist

Tourist là khách hàng sử dụng hệ thống.

Chức năng chính:

- Đăng ký, đăng nhập.
- Tìm kiếm workshop theo tên, giá, địa điểm.
- Xem chi tiết workshop.
- Chọn ngày/giờ trên lịch.
- Đặt vé workshop.
- Thêm sản phẩm vào giỏ hàng.
- Checkout vé và sản phẩm.
- Thanh toán online.
- Nhận vé điện tử có QR Code.
- Xem lịch sử booking.
- Viết review sau khi đã check-in.

---

## 5. Công nghệ sử dụng

### 5.1. Backend

| Công nghệ | Mục đích |
|---|---|
| Node.js | Runtime chạy JavaScript phía server |
| Express.js | Framework xây dựng REST API |
| TypeScript | Tăng tính an toàn kiểu dữ liệu |
| MongoDB | NoSQL Database |
| Mongoose | ODM để định nghĩa schema và thao tác MongoDB |
| JWT | Xác thực người dùng |
| bcryptjs | Mã hóa mật khẩu |
| Multer | Upload file |
| Cloudinary/AWS S3 | Lưu trữ ảnh |
| Nodemailer | Gửi email |
| qrcode | Tạo mã QR vé |
| Zod/Joi | Validate dữ liệu |
| Morgan | Ghi log request |
| Helmet | Tăng bảo mật HTTP headers |
| VNPay/MoMo Sandbox | Thanh toán online thử nghiệm |

---

### 5.2. Frontend

| Công nghệ | Mục đích |
|---|---|
| ReactJS | Xây dựng giao diện người dùng |
| TypeScript | Kiểm soát kiểu dữ liệu |
| JSX/TSX | Viết UI component |
| React Router DOM | Điều hướng trang |
| Axios | Gọi API |
| Tailwind CSS | Thiết kế giao diện nhanh |
| Bootstrap/React-Bootstrap | Hỗ trợ dashboard và component có sẵn |
| React Hooks | Quản lý state và side effect |
| Context API | Lưu thông tin Auth và Cart |
| React Hook Form | Xử lý form |
| Zod/Yup | Validate form |
| LocalStorage | Lưu giỏ hàng |
| qrcode.react | Hiển thị QR Code |
| html5-qrcode/react-qr-reader | Quét QR Code |
| Recharts | Vẽ biểu đồ dashboard |
| Lucide React/React Icons | Icon giao diện |

---

## 6. Kiến trúc thư mục dự án

```txt
project-root/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── .env.example
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 7. Database chính

Các collection chính trong MongoDB:

| Collection | Mục đích |
|---|---|
| users | Lưu thông tin Admin, Host, Tour Guide, Tourist |
| workshops | Lưu thông tin workshop |
| timeslots | Lưu khung giờ workshop |
| bookings | Lưu thông tin đặt vé |
| tickets | Lưu QR Ticket |
| products | Lưu sản phẩm vật lý |
| orders | Lưu đơn hàng sản phẩm |
| payments | Lưu thông tin thanh toán |
| reviews | Lưu đánh giá của Tourist |

---

## 8. API chính

### 8.1. Auth API

```txt
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/profile
PUT    /api/auth/profile
PUT    /api/auth/change-password
```

### 8.2. Admin API

```txt
GET    /api/admin/users
GET    /api/admin/hosts/pending
PUT    /api/admin/hosts/:id/approve
PUT    /api/admin/users/:id/block
PUT    /api/admin/users/:id/unblock
GET    /api/admin/dashboard/revenue
```

### 8.3. Host API

```txt
GET    /api/host/dashboard
POST   /api/host/workshops
GET    /api/host/workshops
PUT    /api/host/workshops/:id
DELETE /api/host/workshops/:id

POST   /api/host/products
GET    /api/host/products
PUT    /api/host/products/:id
DELETE /api/host/products/:id

POST   /api/host/tour-guides
GET    /api/host/tour-guides
PUT    /api/host/timeslots/:id/assign-guide
```

### 8.4. Tour Guide API

```txt
GET    /api/tour-guide/schedules
GET    /api/tour-guide/timeslots/:id/customers
POST   /api/tour-guide/check-in
PUT    /api/tour-guide/timeslots/:id/start
PUT    /api/tour-guide/timeslots/:id/finish
```

### 8.5. Tourist API

```txt
GET    /api/workshops
GET    /api/workshops/:id
GET    /api/workshops/:id/timeslots
POST   /api/bookings
GET    /api/bookings/my-bookings
GET    /api/bookings/:id/ticket
POST   /api/orders/checkout
GET    /api/orders/my-orders
POST   /api/reviews
```

### 8.6. Payment API

```txt
POST   /api/payments/create-payment-url
GET    /api/payments/vnpay-callback
POST   /api/payments/momo-callback
GET    /api/payments/:id/status
```

---

## 9. Các flow xử lý chính

### 9.1. Flow đăng ký và đăng nhập

```txt
Tourist đăng ký -> ACTIVE -> đăng nhập
Host đăng ký -> PENDING -> Admin duyệt -> ACTIVE
Tour Guide không tự đăng ký -> Host tạo tài khoản
Login thành công -> Backend trả JWT token
Frontend lưu token để gọi API cần đăng nhập
```

---

### 9.2. Flow đặt vé workshop

```txt
Tourist chọn Workshop
-> Chọn Timeslot
-> Nhập số lượng vé
-> Backend kiểm tra availableSlots
-> Tạo Booking PENDING
-> Tourist thanh toán
-> Payment SUCCESS
-> Booking PAID
-> Sinh QR Ticket
-> Gửi email vé
```

---

### 9.3. Flow check-in QR

```txt
Tourist đưa mã QR
-> Tour Guide quét QR
-> Backend kiểm tra Ticket
-> Nếu Ticket hợp lệ và UNUSED
-> Cập nhật Ticket thành USED
-> Cập nhật Booking thành CHECKED_IN
-> Lưu checkedBy và checkedInAt
```

---

### 9.4. Flow Host quản lý Tour Guide

```txt
Host đăng nhập
-> Tạo tài khoản Tour Guide
-> Gán Tour Guide vào Timeslot
-> Tour Guide đăng nhập
-> Tour Guide chỉ xem lịch trình được phân công
```

---

### 9.5. Flow Review

```txt
Tourist đã CHECKED_IN
-> Mở trang My Bookings
-> Chọn booking đã tham gia
-> Viết rating/comment/upload ảnh
-> Backend kiểm tra mỗi booking chỉ review một lần
-> Lưu Review
```

---

## 10. Hướng dẫn cài đặt và chạy dự án

### 10.1. Yêu cầu môi trường

Cài đặt trước:

- Node.js phiên bản 18 trở lên
- npm
- MongoDB local hoặc MongoDB Atlas
- Git
- Visual Studio Code

---

### 10.2. Clone project

```bash
git clone <repository-url>
cd <project-folder>
```

---

### 10.3. Chạy Backend

```bash
cd server
npm install
```

Tạo file `.env` trong thư mục `server` dựa trên `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/cultural_craft_booking
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Chạy backend:

```bash
npm run dev
```

Backend chạy tại:

```txt
http://localhost:5000
```

---

### 10.4. Chạy Frontend

Mở terminal khác:

```bash
cd client
npm install
```

Tạo file `.env` trong thư mục `client`:

```env
VITE_API_URL=http://localhost:5000/api
```

Chạy frontend:

```bash
npm run dev
```

Frontend chạy tại:

```txt
http://localhost:5173
```

---

## 11. Hướng dẫn quản lý dự án bằng Jira

Toàn bộ task, sprint và tiến độ dự án được quản lý trên Jira.

### Link Jira
https://nguyenngocbuu03.atlassian.net/jira/software/projects/KAN/boards/1?atlOrigin=eyJpIjoiNWM0M2E0MzMwODNkNDdjMTlmNTU0ZWNhMzJiYTFhMDQiLCJwIjoiaiJ9

Ví dụ:

```txt
https://your-team.atlassian.net/jira/software/projects/PROJECT_KEY/boards/1
```

### Cách quản lý task trên Jira

Nhóm chia công việc theo các loại issue:

- **Epic:** Nhóm chức năng lớn, ví dụ Auth, Booking, Payment, Dashboard.
- **Story:** Yêu cầu chức năng từ góc nhìn người dùng.
- **Task:** Công việc kỹ thuật cụ thể.
- **Bug:** Lỗi phát sinh trong quá trình phát triển.

### Quy trình làm việc đề xuất

```txt
To Do -> In Progress -> Code Review -> Testing -> Done
```

### Sprint đề xuất

| Tuần | Nội dung |
|---|---|
| Tuần 1 | Phân tích yêu cầu, thiết kế database, setup project |
| Tuần 2 | Auth, phân quyền, cấu trúc MVC |
| Tuần 3 | Workshop, Product, Timeslot |
| Tuần 4 | Booking, Cart, Checkout |
| Tuần 5 | Payment, QR Ticket, Email |
| Tuần 6 | Tour Guide, QR Check-in, Trip Progress |
| Tuần 7 | Dashboard, Review, Upload ảnh |
| Tuần 8 | Testing, fix bug, hoàn thiện báo cáo, demo |

---

## 12. Phân công nhiệm vụ nhóm 5 người

| Thành viên | Vai trò | Công việc chính |
|---|---|---|
| Dev 1 | Backend Core | Auth, User, Role, Admin, Workshop, Product |
| Dev 2 | Backend Booking | Timeslot, Booking, Payment, QR, Email |
| Dev 3 | Frontend Tourist | Home, Workshop list/detail, Booking, Cart, Checkout |
| Dev 4 | Frontend Admin/Host/Tour Guide | Dashboard, quản lý Host, Tour Guide, QR Check-in |
| Dev 5 | Fullstack Extra | Upload ảnh, Map, Review, UI polish, Testing |

---

## 13. Tiêu chí đánh giá hoàn thành

Dự án được xem là hoàn thành khi:

- Đăng ký/đăng nhập hoạt động đúng.
- Phân quyền đúng 4 role.
- Admin duyệt được Host.
- Host tạo được Workshop, Product, Timeslot.
- Host tạo và gán Tour Guide được.
- Tourist đặt vé và mua sản phẩm được.
- Hệ thống chống overbooking.
- Thanh toán sandbox hoạt động ở mức mô phỏng.
- QR Ticket được tạo sau khi thanh toán.
- Tour Guide quét QR check-in được.
- Tourist review sau khi check-in được.
- Dashboard hiển thị thống kê cơ bản.
- README có hướng dẫn chạy dự án rõ ràng.
- Jira có task và sprint đầy đủ.

---

## 14. Ghi chú

Dự án được xây dựng phục vụ môn học theo hướng **Research by Learning**, vì vậy nhóm cần thể hiện rõ:

- Bài toán nghiên cứu.
- Cách áp dụng thuật toán hoặc kỹ thuật xử lý.
- Lý do chọn kiến trúc và công nghệ.
- Kết quả thử nghiệm hoặc demo.
- Hướng dẫn chạy hệ thống đầy đủ.