[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/iZHHambl)
Nền tảng Đặt chỗ Trải nghiệm & Mua sắm Văn hóa Địa phương (Local Culture Workshop & E-commerce)

1. Giới thiệu dự án

Dự án là một nền tảng web số hóa quy trình quảng bá, đặt chỗ (booking) cho các hoạt động du lịch trải nghiệm mang tính văn hóa (như xưởng làm gốm, lớp học nấu ăn truyền thống). Đồng thời, hệ thống tích hợp luồng thương mại điện tử (e-commerce) cỡ nhỏ để các xưởng có thể bán các sản phẩm thủ công vật lý trực tiếp cho du khách.

Quy mô nhóm: 5 thành viên

Thời gian thực hiện: 8 tuần

2. Quản lý dự án (Jira Tracking)

Toàn bộ tiến độ, phân chia công việc (Task assignment) và quản lý Sprint của dự án được theo dõi trực tiếp trên Jira.

🔗 Link Jira Workspace: [Thay_Link_Jira_Của_Nhóm_Vào_Đây]

3. Hàm lượng nghiên cứu (Research by Learning - RBL)

Bên cạnh việc xây dựng hệ thống phần mềm CRUD thông thường, dự án tập trung nghiên cứu và giải quyết một bài toán đặc thù trong hệ thống thương mại điện tử và đặt vé:

Chủ đề tập trung: Nghiên cứu kiến trúc hệ thống và thuật toán kiểm soát đồng thời (Concurrency Control) trong môi trường cơ sở dữ liệu NoSQL.

Bài toán: Tránh tình trạng Overbooking (Đặt lố vé/vượt quá số lượng slot cho phép) khi có nhiều người dùng (concurrent users) cùng thao tác đặt vé vào một khung giờ (Timeslot) hoặc mua cùng một sản phẩm vật lý tại cùng một thời điểm (Race Condition).

Giải pháp công nghệ: Nghiên cứu áp dụng Optimistic Concurrency Control (OCC - Kiểm soát đồng thời lạc quan) thông qua cơ chế Version Document kết hợp với MongoDB Multi-document Transactions (Yêu cầu cấu hình Replica Set) hoặc sử dụng Atomic Operators (như $inc) để đảm bảo tính toàn vẹn dữ liệu (ACID) khi thanh toán mà không làm nghẽn hiệu năng hệ thống.

4. Công nghệ sử dụng (Tech Stack)

Frontend: ReactJS / Next.js (TailwindCSS, Axios, Redux/Zustand)

Backend: Node.js (Express) / NestJS

Database: MongoDB (NoSQL) kết hợp thư viện ODM Mongoose (Quản lý Schema và Transaction)

Dịch vụ ngoài: Cloudinary (Lưu trữ ảnh), Cổng thanh toán Sandbox (VNPay/MoMo).

5. Hướng dẫn cài đặt (Installation Guide)

Yêu cầu môi trường

Node.js (v16 trở lên)

MongoDB (v6.0+ cấu hình Replica Set cho máy local) hoặc sử dụng MongoDB Atlas (Khuyên dùng).

Chạy hệ thống Backend

cd backend
npm install
# Tạo file .env và config MongoDB URI (Xem file .env.example)
npm run start:dev



Chạy hệ thống Frontend

cd frontend
npm install
# Cấu hình biến môi trường gọi API
npm run dev
