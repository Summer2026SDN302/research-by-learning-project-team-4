import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Workshop from '../models/workshop.model';

// PUBLIC: Lấy danh sách workshops
export const getWorkshops = asyncHandler(async (req: Request, res: Response) => {
  const { category, location, search, page = '1', limit = '12', sort = '-createdAt' } = req.query;
  const filter: any = { status: 'ACTIVE' };
  if (category) filter.category = category;
  if (location) filter.location = location;
  if (search) filter.$text = { $search: search as string };

  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
  const workshops = await Workshop.find(filter)
    .populate('hostId', 'fullName avatar hostProfile.workshopName')
    .skip(skip).limit(parseInt(limit as string)).sort(sort as string);
  const total = await Workshop.countDocuments(filter);

  sendSuccess(res, 'Lấy danh sách workshop thành công', { workshops, total, page: parseInt(page as string) });
});

// PUBLIC: Lấy chi tiết workshop
export const getWorkshopById = asyncHandler(async (req: Request, res: Response) => {
  const workshop = await Workshop.findOne({ _id: req.params.id, status: { $ne: 'DELETED' } })
    .populate('hostId', 'fullName avatar phone hostProfile');
  if (!workshop) return sendError(res, 'Workshop không tồn tại', 404);
  sendSuccess(res, 'Lấy thông tin workshop thành công', workshop);
});

// HOST: Tạo workshop
export const createWorkshop = asyncHandler(async (req: Request, res: Response) => {
  const workshop = await Workshop.create({ ...req.body, hostId: req.user!._id });
  sendSuccess(res, 'Tạo workshop thành công', workshop, 201);
});

// HOST: Lấy workshops của mình
export const getMyWorkshops = asyncHandler(async (req: Request, res: Response) => {
  const workshops = await Workshop.find({ hostId: req.user!._id, status: { $ne: 'DELETED' } }).sort({ createdAt: -1 });
  sendSuccess(res, 'Lấy danh sách workshop', workshops);
});

// HOST: Cập nhật workshop
export const updateWorkshop = asyncHandler(async (req: Request, res: Response) => {
  const workshop = await Workshop.findOneAndUpdate(
    { _id: req.params.id, hostId: req.user!._id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!workshop) return sendError(res, 'Workshop không tồn tại hoặc bạn không có quyền', 404);
  sendSuccess(res, 'Cập nhật workshop thành công', workshop);
});

// HOST: Xóa workshop (soft delete)
export const deleteWorkshop = asyncHandler(async (req: Request, res: Response) => {
  const workshop = await Workshop.findOneAndUpdate(
    { _id: req.params.id, hostId: req.user!._id },
    { status: 'DELETED' },
    { new: true }
  );
  if (!workshop) return sendError(res, 'Workshop không tồn tại', 404);
  sendSuccess(res, 'Xóa workshop thành công');
});
