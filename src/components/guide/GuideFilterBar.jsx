const REGIONS = ['전체', '중화권', '영어권', 'US-글로벌'];

function FilterPill({ label, active, onClick }) {
  let activeClasses = 'bg-surface text-text-muted border border-border-strong hover:border-border-strong';
  if (active) {
    activeClasses = 'bg-badge-active text-text-inverse';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeClasses}`}
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
