import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../../hooks/useCart';
import { formatCurrencyShort } from '../../utils/formatCurrency';
import { SHIPPING_FEE } from '../../utils/constants';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    navigate('/payment-result?status=SUCCESS');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-10">
      <h1 className="font-headline-lg text-headline-md text-deep-earth mb-8">Thanh toán</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white rounded-xl border border-soft-clay p-6">
              <h2 className="font-semibold text-lg mb-4">Địa chỉ giao hàng</h2>
              <div className="space-y-4">
                <Input label="Họ và tên" placeholder="Nguyễn Văn A" {...register('fullName', { required: true })} />
                <Input label="Số điện thoại" placeholder="0901234567" {...register('phone', { required: true })} />
                <Input label="Địa chỉ" placeholder="Số nhà, đường, phường/xã" {...register('address', { required: true })} />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Tỉnh/Thành phố" placeholder="TP. Hồ Chí Minh" {...register('city', { required: true })} />
                  <Input label="Quận/Huyện" placeholder="Quận 1" {...register('district', { required: true })} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-soft-clay p-6">
              <h2 className="font-semibold text-lg mb-4">Phương thức thanh toán</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl cursor-pointer hover:border-primary/30">
                  <input type="radio" value="vnpay" defaultChecked {...register('paymentMethod')} className="text-primary" />
                  <span className="font-medium">VNPay</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl cursor-pointer hover:border-primary/30">
                  <input type="radio" value="momo" {...register('paymentMethod')} className="text-primary" />
                  <span className="font-medium">MoMo</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl cursor-pointer hover:border-primary/30">
                  <input type="radio" value="cod" {...register('paymentMethod')} className="text-primary" />
                  <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                </label>
              </div>
            </div>
            <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>Thanh toán ngay</Button>
          </form>
        </div>
        <div className="bg-white rounded-xl border border-soft-clay p-6 h-fit sticky top-24">
          <h2 className="font-semibold text-lg text-deep-earth mb-4">Tóm tắt đơn hàng</h2>
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex justify-between text-sm mb-2">
              <span className="truncate mr-4">{item.product.name} × {item.quantity}</span>
              <span className="shrink-0">{formatCurrencyShort(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-soft-clay pt-3 mt-3 space-y-2">
            <div className="flex justify-between text-sm"><span>Tạm tính</span><span>{formatCurrencyShort(cartTotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Phí vận chuyển</span><span>{formatCurrencyShort(SHIPPING_FEE)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-soft-clay pt-2"><span>Tổng tiền</span><span className="text-primary">{formatCurrencyShort(cartTotal + SHIPPING_FEE)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
