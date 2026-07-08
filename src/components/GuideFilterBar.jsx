const REGIONS = ['전체', '중화권', '영어권', 'US-글로벌'];

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

export default function GuideFilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {REGIONS.map((region) => (
        <FilterPill
          key={region}
          label={region}
          active={active === region}
          onClick={() => onChange(region)}
        />
      ))}
    </div>
  );
}
