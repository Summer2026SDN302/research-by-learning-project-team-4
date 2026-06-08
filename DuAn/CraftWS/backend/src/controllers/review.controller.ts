import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Review from '../models/review.model';
import Booking from '../models/booking.model';
import Workshop from '../models/workshop.model';

export const createReview = asyncHandler(async (req: Request, res: Response) => {
  const { bookingId, rating, comment, images } = req.body;

  // Kiểm tra booking thuộc tourist
  const booking = await Booking.findOne({ _id: bookingId, touristId: req.user!._id });
  if (!booking) return sendError(res, 'Booking không tồn tại hoặc không thuộc về bạn', 404);

  // Kiểm tra trạng thái booking
  if (!['CHECKED_IN', 'COMPLETED'].includes(booking.bookingStatus)) {
    return sendError(res, 'Chỉ có thể đánh giá sau khi đã check-in hoặc hoàn thành');
  }

  // Kiểm tra đã review chưa
  const existingReview = await Review.findOne({ bookingId });
  if (existingReview) return sendError(res, 'Bạn đã đánh giá booking này rồi');

  const review = await Review.create({
    touristId: req.user!._id,
    workshopId: booking.workshopId,
    bookingId,
    rating,
    comment,
    images: images || [],
  });

  // Cập nhật averageRating workshop
  const reviews = await Review.find({ workshopId: booking.workshopId, status: 'VISIBLE' });
  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  await Workshop.findByIdAndUpdate(booking.workshopId, {
    averageRating: Math.round(avgRating * 10) / 10,
    totalReviews: reviews.length,
  });

  sendSuccess(res, 'Đánh giá thành công', review, 201);
});

export const getWorkshopReviews = asyncHandler(async (req: Request, res: Response) => {
  const reviews = await Review.find({ workshopId: req.params.workshopId, status: 'VISIBLE' })
    .populate('touristId', 'fullName avatar')
    .sort({ createdAt: -1 });
  sendSuccess(res, 'Lấy danh sách đánh giá', reviews);
});
