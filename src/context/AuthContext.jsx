import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

//로그인 정보를 전역으로 공유하기 위한 context 생성
const AuthContext = createContext(undefined);

// Context Provider
// App을 감싸서 하위 컴포넌트에서 로그인 정보를 사용할 수 있게 함
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null); //현재 로그인한 사용자의 세션 정보

  //앱이 처음 실행될 때 브라우저에 저장된 로그인 세션을 가녀옴 // 새로 고침 후에도 로그인 유지
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);  //가져온 세션 상태에 저장
    });

    // 로그인 / 로그아웃 / 토큰 갱신 등의 인증 상태가 변경될 때마다 실행
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("session: ", session);
      setSession(session);  //세션 업데이트
    });

    return () => {
      listener.subscription.unsubscribe();  //컴포넌트가 사라질 때 이벤트 리스너 제거
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user: session?.user ?? null,
    isLoggedIn: !!session,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
}
