// Home/FilterBar/InfluencerCard에서 반복되던 rounded-3xl + shadow 조합만 추출한 공통 카드
export default function Card({ glass = false, hover = false, className = '', children, ...props }) {
  const classes = [
    'rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgba(71,51,255,0.06)]',
    glass ? 'bg-white/80 backdrop-blur-xl' : 'bg-surface',
    hover ? 'transition-all duration-300' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
