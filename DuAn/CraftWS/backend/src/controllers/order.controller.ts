import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess, sendError } from '../utils/apiResponse';
import Product from '../models/product.model';
import Order from '../models/order.model';
import { v4 as uuidv4 } from 'uuid';
import { SHIPPING_FEE } from '../utils/constants';

export const checkout = asyncHandler(async (req: Request, res: Response) => {
  const { items, shippingAddress } = req.body;

  // Tải tất cả products
  const productIds = items.map((i: any) => i.productId);
  const products = await Product.find({ _id: { $in: productIds }, status: 'ACTIVE' });

  if (products.length !== items.length) {
    return sendError(res, 'Một số sản phẩm không khả dụng');
  }

  // Kiểm tra stock & tính giá
  const orderItems = [];
  let productTotal = 0;
  let hostId: string | null = null;

  for (const item of items) {
    const product = products.find((p) => p._id.toString() === item.productId);
    if (!product) return sendError(res, `Sản phẩm ${item.productId} không tồn tại`);
    if (product.stock < item.quantity) return sendError(res, `Sản phẩm "${product.name}" không đủ số lượng (còn ${product.stock})`);

    if (!hostId) hostId = product.hostId.toString();

    const subtotal = product.price * item.quantity;
    productTotal += subtotal;

    orderItems.push({
      productId: product._id,
      name: product.name,
      image: product.images[0] || '',
      price: product.price,
      quantity: item.quantity,
      subtotal,
    });
  }

  const orderCode = `ORD-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;
  const totalAmount = productTotal + SHIPPING_FEE;

  const order = await Order.create({
    orderCode,
    touristId: req.user!._id,
    hostId,
    items: orderItems,
    shippingAddress,
    productTotal,
    shippingFee: SHIPPING_FEE,
    totalAmount,
    orderStatus: 'PENDING',
  });

  sendSuccess(res, 'Đặt hàng thành công! Vui lòng thanh toán.', order, 201);
});

export const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({ touristId: req.user!._id })
    .populate('hostId', 'fullName')
    .sort({ createdAt: -1 });
  sendSuccess(res, 'Lấy danh sách đơn hàng', orders);
});
