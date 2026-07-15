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

/**
 * 선택된 region/tier/3축 조건으로 influencer 목록을 필터링한다.
 *
 * 3축(selectedAxes)은 다중 선택이 가능하며, 선택된 축은 모두 AND로 적용된다.
 * 예) {가용성, 적합도}가 선택되면 두 조건을 모두 만족하는 influencer만 남는다.
 * 성과 축은 아직 판단 기준이 없어 선택되어도 필터링에 영향을 주지 않는다.
 *
 * @param {object[]} influencers - 필터링할 influencer 목록
 * @param {object} options
 * @param {string} options.selectedRegion - FilterBar에서 선택된 지역 (한글 라벨, '전체'면 전체 노출)
 * @param {string} options.selectedTier - FilterBar에서 선택된 등급 (한글 라벨, '전체'면 전체 노출)
 * @param {Set<string>} [options.selectedAxes] - FilterBar에서 선택된 3축 라벨 집합 (비어있으면 전체 노출)
 * @returns {object[]} 필터링된 influencer 목록
 */
export function filterInfluencers(
  influencers,
  { selectedRegion, selectedTier, selectedAxes }
) {
  const axes = selectedAxes ?? new Set();

  return influencers.filter((influencer) => {
    const matchesRegion =
      selectedRegion === '전체' || influencer.region === REGION_MAP[selectedRegion];
    const matchesTier =
      selectedTier === '전체' || influencer.tier === TIER_MAP[selectedTier];
    const matchesAvailability = !axes.has('가용성') || influencer.isAvailable === true;
    const matchesGuideFit = !axes.has('적합도') || influencer.isGuideFit === true;

    return matchesRegion && matchesTier && matchesAvailability && matchesGuideFit;
  });
}
