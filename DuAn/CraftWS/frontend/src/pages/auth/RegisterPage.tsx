import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../schemas/registerSchema';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'TOURIST' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((r) => setTimeout(r, 1000));
    if (data.role === 'HOST') {
      setSuccess('Tài khoản Chủ xưởng đang chờ Quản trị viên duyệt.');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="font-headline-lg text-headline-md text-deep-earth mb-2">Đăng ký</h1>
      <p className="text-on-surface-variant mb-8">Tạo tài khoản CraftLocal của bạn</p>

      {success && <div className="mb-4 p-3 bg-amber-50 text-amber-700 border border-amber-200 rounded-lg text-sm">{success}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Họ và tên" placeholder="Nguyễn Văn A" error={errors.fullName?.message} {...register('fullName')} />
        <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Số điện thoại" type="tel" placeholder="0901234567" error={errors.phone?.message} {...register('phone')} />
        <Input label="Mật khẩu" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <Input label="Xác nhận mật khẩu" type="password" placeholder="••••••••" error={errors.confirmPassword?.message} {...register('confirmPassword')} />
        <Select
          label="Vai trò"
          options={[{ value: 'TOURIST', label: 'Khách du lịch' }, { value: 'HOST', label: 'Chủ xưởng' }]}
          error={errors.role?.message}
          {...register('role')}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>Tạo tài khoản</Button>
      </form>

      <p className="text-center mt-6 text-sm text-on-surface-variant">
        Đã có tài khoản?{' '}
        <Link to="/login" className="text-primary font-semibold hover:underline">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
