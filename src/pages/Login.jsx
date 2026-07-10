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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <h1 className="mb-8 text-center text-2xl font-extrabold text-text">
            로그인
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
            className="mb-6 w-full rounded-xl border border-border px-4 py-3 text-sm text-text placeholder-placeholder outline-none transition-colors focus:border-border-focus"
          />

          <Button variant="dark" size="block" onClick={signIn}>
            로그인
          </Button>

          <p className="mt-6 text-center text-sm text-text-secondary">
            회원이 아니신가요?{' '}
            <Link
              to={ROUTES.SIGNUP}
              className="font-semibold text-text underline-offset-2 transition-colors hover:text-black hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
