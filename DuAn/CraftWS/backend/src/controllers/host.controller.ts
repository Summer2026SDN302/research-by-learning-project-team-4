import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import User from '../models/user.model';
import Booking from '../models/booking.model';
import Order from '../models/order.model';
import Workshop from '../models/workshop.model';

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const hostId = req.user!._id;
  const [todayBookings, monthlyRevenue, activeWorkshops, pendingOrders] = await Promise.all([
    Booking.countDocuments({ hostId, createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } }),
    Booking.aggregate([
      { $match: { hostId, bookingStatus: { $in: ['PAID', 'CHECKED_IN', 'COMPLETED'] } } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]),
    Workshop.countDocuments({ hostId, status: 'ACTIVE' }),
    Order.countDocuments({ hostId, orderStatus: 'PENDING' }),
  ]);

  sendSuccess(res, 'Lấy dashboard thành công', {
    todayBookings,
    monthlyRevenue: monthlyRevenue[0]?.total || 0,
    activeWorkshops,
    pendingOrders,
  });
});

export const createTourGuide = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password, phone } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return sendError(res, 'Email đã được sử dụng');

  const tourGuide = await User.create({
    fullName,
    email,
    password,
    phone,
    role: 'TOUR_GUIDE',
    status: 'ACTIVE',
    hostId: req.user!._id,
    createdBy: req.user!._id,
  });

  const obj = tourGuide.toObject();
  const { password: _, ...result } = obj;
  sendSuccess(res, 'Tạo hướng dẫn viên thành công', result, 201);
});

export const getTourGuides = asyncHandler(async (req: Request, res: Response) => {
  const guides = await User.find({ role: 'TOUR_GUIDE', hostId: req.user!._id }).sort({ createdAt: -1 });
  sendSuccess(res, 'Lấy danh sách hướng dẫn viên', guides);
});

export const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ hostId: req.user!._id })
    .populate('touristId', 'fullName email phone')
    .sort({ createdAt: -1 });
  sendSuccess(res, 'Lấy danh sách đơn hàng', orders);
});

export const updateOrderStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  const order = await Order.findOne({ _id: req.params.id, hostId: req.user!._id });
  if (!order) return sendError(res, 'Đơn hàng không tồn tại', 404);

  const now = new Date();
  if (status === 'SHIPPING') order.shippedAt = now;
  if (status === 'COMPLETED') order.completedAt = now;
  if (status === 'CANCELLED') order.cancelledAt = now;

  order.orderStatus = status;
  await order.save();
  sendSuccess(res, 'Cập nhật trạng thái đơn hàng thành công', order);
});
