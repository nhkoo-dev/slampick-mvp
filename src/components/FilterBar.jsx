import Card from './Card';

export function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-primary to-fuchsia-500 text-text-inverse shadow-md shadow-primary/30'
          : 'border border-border-strong bg-surface text-text-muted hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary'
      }`}
    >
      {label}
    </button>
  );
}

function FilterGroup({ options, selected, onSelect }) {
  return options.map((option) => (
    <FilterPill
      key={option}
      label={option}
      active={selected === option}
      onClick={() => onSelect(option)}
    />
  ));
}

const REGIONS = ['전체', 'US', '중화권', '일본', '중동'];
const TIERS = ['전체', '메가', '미드', '나노'];
const AXES = ['전체', '가용성', '적합도', '성과'];

export default function FilterBar({
  selectedRegion,
  setSelectedRegion,
  selectedTier,
  setSelectedTier,
  selectedAxis,
  setSelectedAxis,
}) {
  return (
    <Card glass className="p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          지역
        </span>
        <FilterGroup
          options={REGIONS}
          selected={selectedRegion}
          onSelect={setSelectedRegion}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          티어
        </span>
        <FilterGroup
          options={TIERS}
          selected={selectedTier}
          onSelect={setSelectedTier}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          3축
        </span>
        <FilterGroup
          options={AXES}
          selected={selectedAxis}
          onSelect={setSelectedAxis}
        />
      </div>

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </Card>
  );
}
