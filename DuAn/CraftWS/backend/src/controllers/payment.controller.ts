import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { PaymentService } from '../services/payment.service';
import Payment from '../models/payment.model';
import Booking from '../models/booking.model';
import Order from '../models/order.model';

export const createPaymentUrl = asyncHandler(async (req: Request, res: Response) => {
  const { bookingId, orderId, method } = req.body;

  let amount = 0;
  if (bookingId) {
    const booking = await Booking.findOne({ _id: bookingId, touristId: req.user!._id });
    if (!booking) return sendError(res, 'Booking không tồn tại', 404);
    if (booking.bookingStatus !== 'PENDING') return sendError(res, 'Booking không ở trạng thái chờ thanh toán');
    amount = booking.totalPrice;
  }
  if (orderId) {
    const order = await Order.findOne({ _id: orderId, touristId: req.user!._id });
    if (!order) return sendError(res, 'Đơn hàng không tồn tại', 404);
    if (order.orderStatus !== 'PENDING') return sendError(res, 'Đơn hàng không ở trạng thái chờ thanh toán');
    amount = order.totalAmount;
  }

  if (!amount) return sendError(res, 'Vui lòng cung cấp bookingId hoặc orderId');

  const payment = await PaymentService.createPaymentUrl({
    userId: req.user!._id.toString(),
    bookingId,
    orderId,
    amount,
    method,
  });

  sendSuccess(res, 'Tạo link thanh toán thành công', payment, 201);
});

export const mockSuccess = asyncHandler(async (req: Request, res: Response) => {
  const payment = await PaymentService.mockSuccess(req.params.id as string);
  sendSuccess(res, 'Thanh toán thành công (mock)!', payment);
});

export const getPaymentStatus = asyncHandler(async (req: Request, res: Response) => {
  const payment = await Payment.findById(req.params.id);
  if (!payment) return sendError(res, 'Payment không tồn tại', 404);
  sendSuccess(res, 'Lấy trạng thái thanh toán', payment);
});

export const vnpayCallback = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder cho VNPay callback
  sendSuccess(res, 'VNPay callback received', req.query);
});

export const momoCallback = asyncHandler(async (req: Request, res: Response) => {
  // Placeholder cho MoMo callback
  sendSuccess(res, 'MoMo callback received', req.body);
});
