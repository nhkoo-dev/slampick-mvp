import { FilterPill } from '../common/FilterPill';

const REGIONS = ['전체', '중화권', '영어권', 'US-글로벌'];

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
