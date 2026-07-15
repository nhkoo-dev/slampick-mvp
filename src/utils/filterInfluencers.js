import { FOLLOWER_MIN_BOUND, FOLLOWER_UNBOUNDED_MAX } from './followerRange';
import { RATE_MIN_BOUND, RATE_UNBOUNDED_MAX } from './rateRange';

// FilterBar에서 사용하는 한글 라벨 -> 실제 데이터의 tier 값 매핑
const TIER_MAP = {
  메가: 'MEGA',
  미드: 'MID',
  나노: 'NANO',
};

// FilterBar에서 사용하는 한글 라벨 -> 실제 데이터의 region 값 매핑
const REGION_MAP = {
  US: 'US',
  중화권: 'CH',
  일본: 'JP',
  중동: 'UAE',
};

// FilterBar에서 사용하는 한글 라벨 -> 실제 데이터의 category 값 매핑
const CATEGORY_MAP = {
  뷰티: 'beauty',
  헤어: 'hair',
  '의류·패션': 'fashion',
  '식품·음료': 'food_beverage',
  '생활용품·가전': 'home_appliances',
  게임: 'gaming',
  '의료·건강관리': 'healthcare',
};

/**
 * 선택된 region/platform/category/tier/3축 조건으로 influencer 목록을 필터링한다.
 *
 * 3축(selectedAxes)은 다중 선택이 가능하며, 선택된 축은 모두 AND로 적용된다.
 * 예) {가용성, 적합도}가 선택되면 두 조건을 모두 만족하는 influencer만 남는다.
 * 성과 축은 아직 판단 기준이 없어 선택되어도 필터링에 영향을 주지 않는다.
 *
 * @param {object[]} influencers - 필터링할 influencer 목록
 * @param {object} options
 * @param {string} options.selectedRegion - FilterBar에서 선택된 지역 (한글 라벨, '전체'면 전체 노출)
 * @param {string} options.selectedPlatform - FilterBar에서 선택된 플랫폼 ('전체'면 전체 노출, 대소문자 무관 비교)
 * @param {string} options.selectedCategory - FilterBar에서 선택된 카테고리 (한글 라벨, '전체'면 전체 노출)
 * @param {string} options.selectedTier - FilterBar에서 선택된 등급 (한글 라벨, '전체'면 전체 노출)
 * @param {Set<string>} [options.selectedAxes] - FilterBar에서 선택된 3축 라벨 집합 (비어있으면 전체 노출)
 * @param {number} [options.followerMin] - 팔로워수 드롭다운에서 선택된 하한 (FOLLOWER_MIN_BOUND면 하한 없음)
 * @param {number} [options.followerMax] - 팔로워수 드롭다운에서 선택된 상한 (FOLLOWER_UNBOUNDED_MAX면 상한 없음)
 * @param {number} [options.rateMin] - 단가 드롭다운에서 선택된 하한, 원 단위 (RATE_MIN_BOUND면 하한 없음)
 * @param {number} [options.rateMax] - 단가 드롭다운에서 선택된 상한, 원 단위 (RATE_UNBOUNDED_MAX면 상한 없음)
 * @returns {object[]} 필터링된 influencer 목록
 */
export function filterInfluencers(
  influencers,
  {
    selectedRegion,
    selectedPlatform,
    selectedCategory,
    selectedTier,
    selectedAxes,
    followerMin,
    followerMax,
    rateMin,
    rateMax,
  }
) {
  const axes = selectedAxes ?? new Set();
  const minFollowers = followerMin ?? FOLLOWER_MIN_BOUND;
  const maxFollowers = followerMax ?? FOLLOWER_UNBOUNDED_MAX;
  const minRate = rateMin ?? RATE_MIN_BOUND;
  const maxRate = rateMax ?? RATE_UNBOUNDED_MAX;

  return influencers.filter((influencer) => {
    const matchesRegion =
      selectedRegion === '전체' || influencer.region === REGION_MAP[selectedRegion];
    const matchesPlatform =
      selectedPlatform === '전체' ||
      influencer.platform?.toLowerCase() === selectedPlatform.toLowerCase();
    const matchesCategory =
      selectedCategory === '전체' || influencer.category === CATEGORY_MAP[selectedCategory];
    const matchesTier =
      selectedTier === '전체' || influencer.tier === TIER_MAP[selectedTier];
    const matchesAvailability = !axes.has('가용성') || influencer.isAvailable === true;
    const matchesGuideFit = !axes.has('적합도') || influencer.isGuideFit === true;
    const matchesFollowersMin =
      minFollowers <= FOLLOWER_MIN_BOUND || influencer.followers >= minFollowers;
    const matchesFollowersMax = influencer.followers <= maxFollowers;
    const rate = influencer.rate_card ?? 0;
    const matchesRateMin = minRate <= RATE_MIN_BOUND || rate >= minRate;
    const matchesRateMax = rate <= maxRate;

    return (
      matchesRegion &&
      matchesPlatform &&
      matchesCategory &&
      matchesTier &&
      matchesAvailability &&
      matchesGuideFit &&
      matchesFollowersMin &&
      matchesFollowersMax &&
      matchesRateMin &&
      matchesRateMax
    );
  });
}
