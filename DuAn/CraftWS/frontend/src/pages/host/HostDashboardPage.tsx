import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, DollarSign, BookOpen, ShoppingBag, Plus, UserPlus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats } from '../../utils/mockData';
import { formatCurrencyShort } from '../../utils/formatCurrency';

const stats = [
  { label: 'Lượt đặt hôm nay', value: dashboardStats.host.todayBookings, icon: <CalendarCheck size={22} />, color: 'bg-blue-500' },
  { label: 'Doanh thu tháng', value: formatCurrencyShort(dashboardStats.host.monthlyRevenue), icon: <DollarSign size={22} />, color: 'bg-emerald-500' },
  { label: 'Workshop hoạt động', value: dashboardStats.host.activeWorkshops, icon: <BookOpen size={22} />, color: 'bg-purple-500' },
  { label: 'Đơn hàng chờ xử lý', value: dashboardStats.host.pendingOrders, icon: <ShoppingBag size={22} />, color: 'bg-amber-500' },
];

const quickActions = [
  { label: 'Thêm Workshop', to: '/host/workshops/create', icon: <Plus size={20} /> },
  { label: 'Thêm sản phẩm', to: '/host/products/create', icon: <Plus size={20} /> },
  { label: 'Quản lý HĐV', to: '/host/tour-guides', icon: <UserPlus size={20} /> },
  { label: 'Gán HĐV', to: '/host/assign-guide', icon: <UserPlus size={20} /> },
];

const HostDashboardPage: React.FC = () => (
  <div className="space-y-8">
    <h1 className="font-headline-lg text-headline-md text-deep-earth">Bảng điều khiển Chủ xưởng</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl border border-soft-clay p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center`}>{s.icon}</div>
            <div><p className="text-sm text-on-surface-variant">{s.label}</p><p className="text-xl font-bold text-on-surface">{s.value}</p></div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-soft-clay p-6">
        <h2 className="font-semibold text-lg text-deep-earth mb-4">Xu hướng doanh thu</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dashboardStats.host.monthlyRevChart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9E4D9" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
            <Tooltip formatter={(v: number) => formatCurrencyShort(v)} />
            <Bar dataKey="revenue" fill="#964824" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl border border-soft-clay p-6">
        <h2 className="font-semibold text-lg text-deep-earth mb-4">Thao tác nhanh</h2>
        <div className="space-y-3">
          {quickActions.map((a) => (
            <Link key={a.to} to={a.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-soft-clay transition-colors text-sm font-medium text-on-surface">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{a.icon}</div>
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HostDashboardPage;
