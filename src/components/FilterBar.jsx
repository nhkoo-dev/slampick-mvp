export function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-gradient-to-r from-primary to-fuchsia-500 text-white shadow-md shadow-primary/30'
          : 'border border-gray-300 bg-white text-gray-600 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary'
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
    <div className="rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-[0_8px_30px_rgba(71,51,255,0.06)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          지역
        </span>
        <FilterGroup
          options={REGIONS}
          selected={selectedRegion}
          onSelect={setSelectedRegion}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          티어
        </span>
        <FilterGroup
          options={TIERS}
          selected={selectedTier}
          onSelect={setSelectedTier}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
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
    </div>
  );
}
