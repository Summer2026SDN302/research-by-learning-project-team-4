import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workshopSchema, type WorkshopFormData } from '../../schemas/workshopSchema';
import { WORKSHOP_CATEGORIES, LOCATIONS } from '../../utils/constants';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Textarea from '../../components/common/Textarea';
import Button from '../../components/common/Button';

const WorkshopFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<WorkshopFormData>({ resolver: zodResolver(workshopSchema) });

  const onSubmit = async (_data: WorkshopFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    navigate('/host/workshops');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-headline-lg text-headline-md text-deep-earth mb-8">Thông tin Workshop</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Tiêu đề" placeholder="Tên workshop" error={errors.title?.message} {...register('title')} />
        <Textarea label="Mô tả" placeholder="Mô tả chi tiết workshop..." error={errors.description?.message} {...register('description')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Select label="Danh mục" options={WORKSHOP_CATEGORIES.map((c) => ({ value: c, label: c }))} placeholder="Chọn danh mục" error={errors.category?.message} {...register('category')} />
          <Select label="Khu vực" options={LOCATIONS.map((l) => ({ value: l, label: l }))} placeholder="Chọn khu vực" error={errors.location?.message} {...register('location')} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <Input label="Giá (VND)" type="number" placeholder="450000" error={errors.price?.message} {...register('price')} />
          <Input label="Thời lượng (phút)" type="number" placeholder="180" error={errors.duration?.message} {...register('duration')} />
          <Input label="Số khách tối đa" type="number" placeholder="12" error={errors.maxGuests?.message} {...register('maxGuests')} />
        </div>
        <Input label="Địa chỉ" placeholder="Địa chỉ đầy đủ" error={errors.address?.message} {...register('address')} />
        <div>
          <label className="text-sm font-medium text-on-surface mb-1.5 block">Hình ảnh</label>
          <div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <p className="text-on-surface-variant text-sm">Nhấn để tải ảnh lên hoặc kéo thả</p>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" isLoading={isSubmitting}>Lưu Workshop</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/host/workshops')}>Hủy</Button>
        </div>
      </form>
    </div>
  );
};

export default WorkshopFormPage;
