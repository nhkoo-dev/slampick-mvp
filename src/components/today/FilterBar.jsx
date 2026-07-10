import Card from '../common/Card';

export function FilterPill({ label, active, onClick, disabled }) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-primary to-fuchsia-500 text-text-inverse shadow-md shadow-primary/30'
          : 'border border-border-strong bg-surface text-text-muted hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary'
      } ${
        disabled
          ? 'cursor-not-allowed opacity-60 hover:translate-y-0 hover:border-border-strong hover:text-text-muted'
          : ''
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ options, selected, onSelect, disabled }) {
  return options.map((option) => (
    <FilterPill
      key={option}
      label={option}
      active={selected === option}
      onClick={() => onSelect(option)}
      disabled={disabled}
    />
  ));
}

const REGIONS = ['전체', 'US', '중화권', '일본', '중동'];
const TIERS = ['전체', '메가', '미드', '나노'];
const AXES = ['전체', '가용성', '적합도', '성과'];

export default function FilterBar({
  isTrial = false,
  selectedRegion,
  setSelectedRegion,
  selectedTier,
  setSelectedTier,
  selectedAxis,
  setSelectedAxis,
}) {
  // trial이면 선택값을 항상 '전체'로 고정하고 setter는 호출되지 않는 no-op으로 대체한다
  let region = selectedRegion;
  let onSelectRegion = setSelectedRegion;
  let tier = selectedTier;
  let onSelectTier = setSelectedTier;
  let axis = selectedAxis;
  let onSelectAxis = setSelectedAxis;

  if (isTrial) {
    region = '전체';
    onSelectRegion = () => {};
    tier = '전체';
    onSelectTier = () => {};
    axis = '전체';
    onSelectAxis = () => {};
  }

  return (
    <Card glass className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          지역
        </span>
        <FilterGroup
          options={REGIONS}
          selected={region}
          onSelect={onSelectRegion}
          disabled={isTrial}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          티어
        </span>
        <FilterGroup
          options={TIERS}
          selected={tier}
          onSelect={onSelectTier}
          disabled={isTrial}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          3축
        </span>
        <FilterGroup
          options={AXES}
          selected={axis}
          onSelect={onSelectAxis}
          disabled={isTrial}
        />
      </div>

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </Card>
  );
}
