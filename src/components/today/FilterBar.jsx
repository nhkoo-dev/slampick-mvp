import Card from '../common/Card';
import { FilterPill } from '../common/FilterPill';
import FollowerRangeDropdown from './FollowerRangeDropdown';

export { FilterPill };

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

// 3축(가용성/적합도/성과)은 다중 선택 가능. '전체'는 선택된 축이 없을 때의 상태를 의미한다.
function AxisFilterGroup({ options, selectedAxes, onToggle }) {
  return options.map((option) => {
    let active;

    if (option === '전체') {
      active = selectedAxes.size === 0;
    } else {
      active = selectedAxes.has(option);
    }

    return (
      <FilterPill
        key={option}
        label={option}
        active={active}
        onClick={() => onToggle(option)}
      />
    );
  });
}

const REGIONS = ['전체', 'US', '중화권', '일본', '중동'];
const TIERS = ['전체', '메가', '미드', '나노'];
const AXES = ['전체', '가용성', '적합도', '성과'];
const SORTS = ['기본', '단가↑', '단가↓'];

export default function FilterBar({
  selectedRegion,
  setSelectedRegion,
  selectedTier,
  setSelectedTier,
  followerMin,
  followerMax,
  onChangeFollowerRange,
  selectedAxes,
  onToggleAxis,
  selectedSort,
  setSelectedSort,
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
        <FollowerRangeDropdown
          followerMin={followerMin}
          followerMax={followerMax}
          onChangeFollowerRange={onChangeFollowerRange}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          3축
        </span>
        <AxisFilterGroup
          options={AXES}
          selectedAxes={selectedAxes}
          onToggle={onToggleAxis}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-12 shrink-0 text-sm font-semibold text-text-secondary">
          정렬
        </span>
        <FilterGroup
          options={SORTS}
          selected={selectedSort}
          onSelect={setSelectedSort}
        />
      </div>

      <p className="mt-3 text-xs text-gray-400">
        필터는 월 1회 변경 가능 — 정한 조건으로 슬램픽이 계속 찾아 매일 채워요.
      </p>
    </Card>
  );
}
