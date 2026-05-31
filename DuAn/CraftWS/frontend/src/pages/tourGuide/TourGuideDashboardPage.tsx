import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, QrCode, Route } from 'lucide-react';
import { dashboardStats } from '../../utils/mockData';

const TourGuideDashboardPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="font-headline-lg text-headline-md text-deep-earth">Chào mừng trở lại!</h1>
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-soft-clay p-5">
        <Calendar size={24} className="text-blue-500 mb-2" />
        <p className="text-2xl font-bold">{dashboardStats.tourGuide.todaySchedule}</p>
        <p className="text-sm text-on-surface-variant">Lịch hôm nay</p>
      </div>
      <div className="bg-white rounded-xl border border-soft-clay p-5">
        <Users size={24} className="text-emerald-500 mb-2" />
        <p className="text-2xl font-bold">{dashboardStats.tourGuide.totalCustomers}</p>
        <p className="text-sm text-on-surface-variant">Khách hôm nay</p>
      </div>
      <div className="bg-white rounded-xl border border-soft-clay p-5">
        <Clock size={24} className="text-purple-500 mb-2" />
        <p className="text-2xl font-bold">{dashboardStats.tourGuide.nextTimeslot}</p>
        <p className="text-sm text-on-surface-variant">Khung giờ tiếp theo</p>
      </div>
      <div className="bg-white rounded-xl border border-soft-clay p-5">
        <Route size={24} className="text-amber-500 mb-2" />
        <p className="text-2xl font-bold">{dashboardStats.tourGuide.completedTrips}</p>
        <p className="text-sm text-on-surface-variant">Chuyến hoàn thành</p>
      </div>
    </div>
    <div className="space-y-3">
      <Link to="/tour-guide/check-in" className="flex items-center gap-4 p-5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all active:scale-[0.98]">
        <QrCode size={28} />
        <div><p className="font-semibold text-lg">Quét mã QR</p><p className="text-white/70 text-sm">Check-in khách hàng</p></div>
      </Link>
      <Link to="/tour-guide/schedules" className="flex items-center gap-4 p-5 bg-white rounded-xl border border-soft-clay hover:shadow-md transition-all">
        <Calendar size={28} className="text-primary" />
        <div><p className="font-semibold text-lg text-on-surface">Lịch phân công</p><p className="text-on-surface-variant text-sm">Xem khung giờ được gán</p></div>
      </Link>
    </div>
  </div>
);

export default TourGuideDashboardPage;
