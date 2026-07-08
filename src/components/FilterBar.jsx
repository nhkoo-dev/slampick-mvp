function FilterPill({ label, active }) {
  return (
    <button
      type="button"
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

export default function FilterBar() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          지역
        </span>
        <FilterPill label="전체" active />
        <FilterPill label="US" />
        <FilterPill label="중화권" />
        <FilterPill label="일본" />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-gray-500">
          티어
        </span>
        <FilterPill label="전체" active />
        <FilterPill label="메가" />
        <FilterPill label="미드" />
        <FilterPill label="나노" />
      </div>

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </div>
  );
}
