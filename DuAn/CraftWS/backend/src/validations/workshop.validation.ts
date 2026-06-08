import { z } from 'zod';

export const createWorkshopSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  category: z.string().optional(),
  address: z.string().optional(),
  location: z.string().optional(),
  price: z.number().min(0, 'Giá không được âm'),
  duration: z.number().min(1, 'Thời lượng phải lớn hơn 0'),
  maxGuestsPerSlot: z.number().min(1, 'Số khách tối đa phải lớn hơn 0').optional(),
  images: z.array(z.string()).optional(),
});

export const updateWorkshopSchema = createWorkshopSchema.partial();
