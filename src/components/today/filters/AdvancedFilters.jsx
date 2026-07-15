import { FilterGroup, AxisFilterGroup } from './FilterGroup';
import RateRangeDropdown from './RateRangeDropdown';

const REGIONS = ['전체', 'US', '중화권', '일본', '중동'];
const AGE_GROUPS = ['전체', '10대', '20대', '30대', '40대+'];
const AXES = ['전체', '가용성', '적합도', '성과'];
const SORTS = ['기본', '단가↑', '단가↓'];

// 아코디언이 열렸을 때만 렌더링되는 상세 필터: 지역/연령대/3축/정렬(+단가)
export default function AdvancedFilters({
  selectedRegion,
  setSelectedRegion,
  selectedAgeGroup,
  setSelectedAgeGroup,
  selectedAxes,
  onToggleAxis,
  selectedSort,
  setSelectedSort,
  rateMin,
  rateMax,
  onChangeRateRange,
}) {
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          지역
        </span>
        <FilterGroup
          options={REGIONS}
          selected={selectedRegion}
          onSelect={setSelectedRegion}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          연령대
        </span>
        <FilterGroup
          options={AGE_GROUPS}
          selected={selectedAgeGroup}
          onSelect={setSelectedAgeGroup}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          3축
        </span>
        <AxisFilterGroup
          options={AXES}
          selectedAxes={selectedAxes}
          onToggle={onToggleAxis}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          정렬
        </span>
        <FilterGroup
          options={SORTS}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
        <RateRangeDropdown
          rateMin={rateMin}
          rateMax={rateMax}
          onChangeRateRange={onChangeRateRange}
        />
      </div>
    </>
  );
}
