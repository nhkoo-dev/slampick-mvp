import { FilterPill } from './FilterBar';

const MODES = [
  { value: 'premium', label: '구독(실시간)' },
  { value: 'trial', label: '체험(무료)' },
];

// premium tier만 프리미엄/체험 전환 버튼을 보고, 그 외에는 "무료 체험 중" 뱃지만 노출
export default function ModeSwitcher({ isPremiumTier, viewMode, setViewMode }) {
  if (!isPremiumTier) {
    return <FilterPill label="무료 체험 중" active />;
  }

  return (
    <>
      {MODES.map((m) => (
        <FilterPill
          key={m.value}
          label={m.label}
          active={viewMode === m.value}
          onClick={() => setViewMode(m.value)}
        />
      ))}
    </>
  );
}
