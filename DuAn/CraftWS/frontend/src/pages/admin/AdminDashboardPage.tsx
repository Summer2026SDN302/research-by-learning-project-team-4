import React from 'react';
import { Users, UserCheck, CalendarCheck, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats, bookings, users } from '../../utils/mockData';
import { formatCurrencyShort } from '../../utils/formatCurrency';
import { ROLE_LABELS, BOOKING_STATUS_LABELS } from '../../utils/constants';

const stats = [
  { label: 'Tổng người dùng', value: dashboardStats.admin.totalUsers, icon: <Users size={22} />, color: 'bg-blue-500' },
  { label: 'Tổng Chủ xưởng', value: dashboardStats.admin.totalHosts, icon: <UserCheck size={22} />, color: 'bg-emerald-500' },
  { label: 'Tổng lượt đặt', value: dashboardStats.admin.totalBookings, icon: <CalendarCheck size={22} />, color: 'bg-purple-500' },
  { label: 'Tổng doanh thu', value: formatCurrencyShort(dashboardStats.admin.totalRevenue), icon: <DollarSign size={22} />, color: 'bg-amber-500' },
];

const AdminDashboardPage: React.FC = () => (
  <div className="space-y-8">
    <h1 className="font-headline-lg text-headline-md text-deep-earth">Bảng điều khiển Quản trị viên</h1>

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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl border border-soft-clay p-6">
        <h2 className="font-semibold text-lg text-deep-earth mb-4">Doanh thu theo tháng</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dashboardStats.admin.monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9E4D9" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
            <Tooltip formatter={(v: number) => formatCurrencyShort(v)} />
            <Bar dataKey="revenue" fill="#964824" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl border border-soft-clay p-6">
        <h2 className="font-semibold text-lg text-deep-earth mb-4">Lượt đặt gần đây</h2>
        <div className="space-y-3">
          {bookings.slice(0, 3).map((b) => (
            <div key={b._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-soft-clay/30">
              <div><p className="font-medium text-sm">{b.touristName}</p><p className="text-xs text-on-surface-variant">{b.workshopTitle}</p></div>
              <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">{BOOKING_STATUS_LABELS[b.status]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboardPage;
