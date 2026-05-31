import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../schemas/loginSchema';
import { useAuth } from '../../hooks/useAuth';
import { getRoleRedirectPath } from '../../utils/roleRedirect';
import { users } from '../../utils/mockData';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    // Mock login: tìm user theo email trong mockData
    const foundUser = users.find((u) => u.email === data.email);
    if (foundUser) {
      login('mock-token-' + foundUser._id, foundUser);
      navigate(getRoleRedirectPath(foundUser.role));
    } else {
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="font-headline-lg text-headline-md text-deep-earth mb-2">Đăng nhập</h1>
      <p className="text-on-surface-variant mb-8">Chào mừng bạn trở lại CraftLocal</p>

      {error && <div className="mb-4 p-3 bg-error/10 text-error rounded-lg text-sm">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Email" type="email" placeholder="email@example.com" error={errors.email?.message} {...register('email')} />
        <Input label="Mật khẩu" type="password" placeholder="••••••••" error={errors.password?.message} {...register('password')} />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-outline-variant" /> Ghi nhớ đăng nhập
          </label>
          <span className="text-primary cursor-pointer hover:underline">Quên mật khẩu?</span>
        </div>
        <Button type="submit" fullWidth isLoading={isSubmitting}>Đăng nhập</Button>
      </form>

      <p className="text-center mt-6 text-sm text-on-surface-variant">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="text-primary font-semibold hover:underline">Đăng ký</Link>
      </p>

      <div className="mt-8 p-4 bg-soft-clay/50 rounded-xl text-xs text-on-surface-variant">
        <p className="font-semibold mb-2">Tài khoản demo:</p>
        <p>👑 Quản trị viên: <span className="font-mono text-primary">admin@craftlocal.vn</span></p>
        <p>🏺 Chủ xưởng: <span className="font-mono text-primary">toan@craftlocal.vn</span></p>
        <p>🧳 Khách du lịch: <span className="font-mono text-primary">sarah@example.com</span></p>
        <p>🧭 Hướng dẫn viên: <span className="font-mono text-primary">minh@craftlocal.vn</span></p>
        <p className="mt-1 italic">(Mật khẩu: nhập bất kỳ)</p>
      </div>
    </div>
  );
};

export default LoginPage;
