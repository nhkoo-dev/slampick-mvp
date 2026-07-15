import { FilterGroup } from './FilterGroup';
import FollowerRangeDropdown from './FollowerRangeDropdown';

const PLATFORMS = ['전체', 'YouTube', 'Instagram', 'TikTok'];
const CATEGORIES = [
  '전체',
  '뷰티',
  '헤어',
  '의류·패션',
  '식품·음료',
  '생활용품·가전',
  '게임',
  '의료·건강관리',
];
const TIERS = ['전체', '메가', '미드', '나노'];

// 항상 보이는 필터: 플랫폼/카테고리/티어(+팔로워수)
export default function PrimaryFilters({
  selectedPlatform,
  setSelectedPlatform,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier,
  followerMin,
  followerMax,
  onChangeFollowerRange,
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          플랫폼
        </span>
        <FilterGroup
          options={PLATFORMS}
          selected={selectedPlatform}
          onSelect={setSelectedPlatform}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
          카테고리
        </span>
        <FilterGroup
          options={CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="w-16 shrink-0 text-sm font-semibold text-text-secondary">
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
    </>
  );
}
