// 여러 곳에서 완전히 동일하게 반복되던 버튼 Tailwind 클래스만 variant/size로 추출한 공통 버튼
const VARIANTS = {
  gradient:
    'rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-text-inverse shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40',
  dark: 'rounded-xl bg-black text-text-inverse transition-colors hover:bg-text',
};

const SIZES = {
  sm: 'px-5 py-2 text-sm font-semibold',
  block: 'w-full py-3 text-sm font-semibold',
};

export default function Button({
  variant,
  size,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const classes = [VARIANTS[variant], SIZES[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
