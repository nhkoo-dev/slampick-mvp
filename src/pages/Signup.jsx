import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { ROUTES } from '../config/constants';
import { supabase } from '../supabase/client';
import { createBrand } from '../repositories/brandRepository';

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
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto flex max-w-md flex-col py-20">
        <h1 className="mb-8 text-center text-3xl font-bold">
          회원가입
        </h1>

        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="비밀번호 확인"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="mb-6 rounded-lg border p-3"
        />

        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-gray-700">회원 유형</p>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="userType"
                value="brand"
                checked={userType === 'brand'}
                onChange={() => setUserType('brand')}
              />
              브랜드
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="userType"
                value="influencer"
                checked={userType === 'influencer'}
                onChange={() => setUserType('influencer')}
              />
              인플루언서
            </label>
          </div>
        </div>

        {userType === 'brand' && (
          <input
            type="text"
            placeholder="브랜드명"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="mb-6 rounded-lg border p-3"
          />
        )}

        <button
          onClick={signUp}
          className="rounded-lg bg-black py-3 text-white"
        >
          회원가입
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있으신가요?{' '}
          <Link to={ROUTES.LOGIN} className="font-medium text-black underline">
            로그인
          </Link>
        </p>
      </main>
    </div>
  );
}
