function FilterPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
      }`}
    >
      {label}
    </button>
  );
}

const REGIONS = ['전체', 'US', '중화권', '일본'];
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
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          지역
        </span>
        {REGIONS.map((region) => (
          <FilterPill
            key={region}
            label={region}
            active={selectedRegion === region}
            onClick={() => setSelectedRegion(region)}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          티어
        </span>
        {TIERS.map((tier) => (
          <FilterPill
            key={tier}
            label={tier}
            active={selectedTier === tier}
            onClick={() => setSelectedTier(tier)}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          3축
        </span>
        {AXES.map((axis) => (
          <FilterPill
            key={axis}
            label={axis}
            active={selectedAxis === axis}
            onClick={() => setSelectedAxis(axis)}
          />
        ))}
      </div>

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </div>
  );
}
