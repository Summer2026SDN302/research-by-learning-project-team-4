import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const SearchBox: React.FC = () => {
  return (
    <div className="w-full max-w-[920px] mx-auto bg-white/95 backdrop-blur-md rounded-2xl lg:rounded-full p-2 lg:p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-white/40 mt-8 lg:mt-10">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2 lg:gap-0">
        
        {/* Destination Select */}
        <div className="flex-1 h-14 px-5 flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-outline-variant/30 hover:bg-soft-clay/20 lg:hover:bg-transparent rounded-xl lg:rounded-none transition-colors">
          <MapPin size={20} className="text-[#964824] shrink-0" />
          <div className="flex-1 text-left">
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-outline">Địa điểm</p>
            <select className="text-sm font-semibold text-on-surface bg-transparent outline-none w-full cursor-pointer">
              <option>Bạn muốn đi đâu?</option>
              <option>Hội An</option>
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Đà Nẵng</option>
              <option>Huế</option>
            </select>
          </div>
        </div>

        {/* Date Input */}
        <div className="flex-1 h-14 px-5 flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-outline-variant/30 hover:bg-soft-clay/20 lg:hover:bg-transparent rounded-xl lg:rounded-none transition-colors">
          <Calendar size={20} className="text-[#964824] shrink-0" />
          <div className="flex-1 text-left">
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-outline">Ngày trải nghiệm</p>
            <input 
              type="date" 
              className="text-sm font-semibold text-on-surface bg-transparent outline-none w-full cursor-pointer" 
            />
          </div>
        </div>

        {/* Guests Select */}
        <div className="flex-1 h-14 px-5 flex items-center gap-3 hover:bg-soft-clay/20 lg:hover:bg-transparent rounded-xl lg:rounded-none transition-colors mb-3 lg:mb-0">
          <Users size={20} className="text-[#964824] shrink-0" />
          <div className="flex-1 text-left">
            <p className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-outline">Số khách</p>
            <select className="text-sm font-semibold text-on-surface bg-transparent outline-none w-full cursor-pointer">
              <option>1 khách</option>
              <option>2 khách</option>
              <option>3+ khách</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <Link
          to="/workshops"
          className="h-12 lg:h-14 px-8 flex items-center justify-center gap-2 bg-[#964824] hover:bg-[#7A3518] text-white rounded-xl lg:rounded-full font-semibold transition-all shadow-md hover:shadow-lg w-full lg:w-auto shrink-0"
        >
          <Search size={18} />
          <span>Tìm kiếm</span>
        </Link>
        
      </div>
    </div>
  );
};

export default SearchBox;
