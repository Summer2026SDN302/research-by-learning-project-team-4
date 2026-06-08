import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2, 'Tên sản phẩm phải có ít nhất 2 ký tự'),
  description: z.string().optional(),
  category: z.string().optional(),
  price: z.number().min(0, 'Giá không được âm'),
  stock: z.number().min(0, 'Số lượng không được âm'),
  images: z.array(z.string()).optional(),
});

export const updateProductSchema = createProductSchema.partial();
