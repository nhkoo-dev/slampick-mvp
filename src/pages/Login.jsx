import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { ROUTES } from '../config/constants';
import { supabase } from '../supabase/client';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate(ROUTES.TODAY_LIST);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="mb-8 text-center text-2xl font-extrabold text-gray-900">
            로그인
          </h1>

          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-gray-400"
          />

          <Button variant="dark" size="block" onClick={signIn}>
            로그인
          </Button>

          <p className="mt-6 text-center text-sm text-gray-500">
            회원이 아니신가요?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className="font-semibold text-gray-900 underline-offset-2 transition-colors hover:text-black hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
