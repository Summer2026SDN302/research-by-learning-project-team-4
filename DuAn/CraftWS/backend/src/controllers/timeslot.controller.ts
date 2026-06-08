import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Timeslot from '../models/timeslot.model';
import Workshop from '../models/workshop.model';
import User from '../models/user.model';

// PUBLIC: Lấy timeslots theo workshop
export const getTimeslotsByWorkshop = asyncHandler(async (req: Request, res: Response) => {
  const timeslots = await Timeslot.find({
    workshopId: req.params.workshopId,
    status: { $in: ['AVAILABLE', 'FULL'] },
    startTime: { $gte: new Date() },
  }).populate('tourGuideId', 'fullName').sort({ startTime: 1 });
  sendSuccess(res, 'Lấy danh sách khung giờ', timeslots);
});

// HOST: Tạo timeslot
export const createTimeslot = asyncHandler(async (req: Request, res: Response) => {
  const workshop = await Workshop.findOne({ _id: req.body.workshopId, hostId: req.user!._id });
  if (!workshop) return sendError(res, 'Workshop không tồn tại hoặc bạn không có quyền', 404);

  const timeslot = await Timeslot.create({
    ...req.body,
    hostId: req.user!._id,
    availableSlots: req.body.totalSlots,
  });
  sendSuccess(res, 'Tạo khung giờ thành công', timeslot, 201);
});

// HOST: Lấy timeslots của mình
export const getMyTimeslots = asyncHandler(async (req: Request, res: Response) => {
  const { workshopId } = req.query;
  const filter: any = { hostId: req.user!._id };
  if (workshopId) filter.workshopId = workshopId;

  const timeslots = await Timeslot.find(filter)
    .populate('workshopId', 'title')
    .populate('tourGuideId', 'fullName')
    .sort({ startTime: -1 });
  sendSuccess(res, 'Lấy danh sách khung giờ', timeslots);
});

// HOST: Cập nhật timeslot
export const updateTimeslot = asyncHandler(async (req: Request, res: Response) => {
  const timeslot = await Timeslot.findOneAndUpdate(
    { _id: req.params.id, hostId: req.user!._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!timeslot) return sendError(res, 'Khung giờ không tồn tại', 404);
  sendSuccess(res, 'Cập nhật khung giờ thành công', timeslot);
});

// HOST: Xóa timeslot
export const deleteTimeslot = asyncHandler(async (req: Request, res: Response) => {
  const timeslot = await Timeslot.findOneAndUpdate(
    { _id: req.params.id, hostId: req.user!._id, bookedSlots: 0 },
    { status: 'CANCELLED' },
    { new: true }
  );
  if (!timeslot) return sendError(res, 'Không thể xóa khung giờ đã có đặt chỗ', 400);
  sendSuccess(res, 'Xóa khung giờ thành công');
});

// HOST: Gán Tour Guide vào timeslot
export const assignGuide = asyncHandler(async (req: Request, res: Response) => {
  const { tourGuideId } = req.body;

  // Kiểm tra tour guide thuộc host này
  const guide = await User.findOne({ _id: tourGuideId, role: 'TOUR_GUIDE', hostId: req.user!._id });
  if (!guide) return sendError(res, 'Hướng dẫn viên không hợp lệ hoặc không thuộc quyền quản lý của bạn');

  const timeslot = await Timeslot.findOneAndUpdate(
    { _id: req.params.id, hostId: req.user!._id },
    { tourGuideId },
    { new: true }
  ).populate('tourGuideId', 'fullName');

  if (!timeslot) return sendError(res, 'Khung giờ không tồn tại', 404);
  sendSuccess(res, 'Gán hướng dẫn viên thành công', timeslot);
});
