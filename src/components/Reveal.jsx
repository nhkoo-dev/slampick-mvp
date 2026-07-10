import { useEffect, useRef, useState } from 'react';

// 스크롤 시 요소가 화면에 들어오면 fade-in + slide-up 효과를 주는 래퍼 컴포넌트
// as prop으로 감쌀 태그(div, section 등)를 지정할 수 있음
export default function Reveal({ children, className = '', delay = 0, as = 'div' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // 요소가 뷰포트에 15% 이상 보이면 visible을 true로 전환
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // 한 번 나타난 뒤에는 다시 관찰할 필요가 없으므로 즉시 해제
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
      // delay는 Tailwind 클래스로 표현하기 어려운 동적 값이라 인라인 스타일로 처리
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
