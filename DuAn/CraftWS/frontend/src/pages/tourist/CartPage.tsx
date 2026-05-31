import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatCurrencyShort } from '../../utils/formatCurrency';
import { SHIPPING_FEE } from '../../utils/constants';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-10">
        <EmptyState title="Giỏ hàng trống" description="Giỏ hàng của bạn đang trống. Hãy khám phá các sản phẩm thủ công tuyệt đẹp!" icon={<ShoppingCart size={36} className="text-outline" />} action={<Link to="/products"><Button>Tiếp tục mua sắm</Button></Link>} />
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-16 py-10">
      <h1 className="font-headline-lg text-headline-md text-deep-earth mb-8">Giỏ hàng ({cartItems.length})</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex gap-4 p-4 bg-white rounded-xl border border-soft-clay">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.product._id}`} className="font-semibold hover:text-primary truncate block">{item.product.name}</Link>
                <p className="text-primary font-bold mt-1">{formatCurrencyShort(item.product.price)}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(item.product._id)} className="p-1.5 text-error/60 hover:text-error"><Trash2 size={16} /></button>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center"><Minus size={14} /></button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="w-8 h-8 rounded-lg border flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-soft-clay p-6 h-fit sticky top-24">
          <h2 className="font-semibold text-lg text-deep-earth mb-4">Tóm tắt đơn hàng</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm"><span>Tạm tính</span><span>{formatCurrencyShort(cartTotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Phí vận chuyển</span><span>{formatCurrencyShort(SHIPPING_FEE)}</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-soft-clay pt-2"><span>Tổng tiền</span><span className="text-primary">{formatCurrencyShort(cartTotal + SHIPPING_FEE)}</span></div>
          </div>
          <Link to="/checkout"><Button fullWidth size="lg">Thanh toán</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
