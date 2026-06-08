import { z } from 'zod';

export const checkoutSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    quantity: z.number().min(1),
  })).min(1, 'Giỏ hàng không được trống'),
  shippingAddress: z.object({
    fullName: z.string().min(1, 'Vui lòng nhập họ tên'),
    phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
    addressLine: z.string().min(1, 'Vui lòng nhập địa chỉ'),
    ward: z.string().optional(),
    district: z.string().optional(),
    city: z.string().min(1, 'Vui lòng nhập thành phố'),
    note: z.string().optional(),
  }),
});
