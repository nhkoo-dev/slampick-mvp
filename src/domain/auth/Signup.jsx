import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../global/components/common/Header';
import Button from '../../global/components/common/Button';
import { ROUTES } from '../../global/config/constants';
import { supabase } from '../../global/supabase/client';
import { createBrand } from '../../global/repositories/brandRepository';

const USER_TYPES = [
  { value: 'brand', label: '브랜드' },
  { value: 'influencer', label: '인플루언서' },
];

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [userType, setUserType] = useState('brand');
  const [brandName, setBrandName] = useState('');

  const signUp = async () => {
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (userType === 'brand' && !brandName) {
      alert('브랜드명을 입력해주세요.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (userType === 'brand') {
      try {
        await createBrand({
          id: data.user.id,
          name: brandName,
        });
      } catch (err) {
        alert(err.message);
        return;
      }
    }

    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="mb-8 text-center text-2xl font-extrabold text-text">
            회원가입
          </h1>

          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder-placeholder outline-none transition-colors focus:border-border-focus"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder-placeholder outline-none transition-colors focus:border-border-focus"
          />

          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="mb-6 w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder-placeholder outline-none transition-colors focus:border-border-focus"
          />

          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-text-secondary">회원 유형</p>
            <div className="flex flex-wrap gap-2">
              {USER_TYPES.map((type) => {
                let typeClasses = 'border-border-strong bg-surface text-text-muted hover:border-border-strong';
                if (userType === type.value) {
                  typeClasses = 'border-badge-active bg-badge-active text-text-inverse';
                }

                return (
                  <label key={type.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="userType"
                      value={type.value}
                      checked={userType === type.value}
                      onChange={() => setUserType(type.value)}
                      className="sr-only"
                    />
                    <span
                      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${typeClasses}`}
                    >
                      {type.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {userType === 'brand' && (
            <input
              type="text"
              placeholder="브랜드명 (필수)"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="mb-6 w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder-placeholder outline-none transition-colors focus:border-border-focus"
            />
          )}

          <Button variant="dark" size="block" onClick={signUp}>
            회원가입
          </Button>

          <p className="mt-6 text-center text-sm text-text-secondary">
            이미 계정이 있으신가요?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-semibold text-text underline-offset-2 transition-colors hover:text-black hover:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
