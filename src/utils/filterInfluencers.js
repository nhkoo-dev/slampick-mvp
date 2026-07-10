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
 * 선택된 region/tier 조건으로 influencer 목록을 필터링한다.
 * trial 모드에서는 필터 UI 자체는 보이지만 클릭이 동작하지 않아야 하므로
 * isTrial이 true면 필터링 없이 원본 목록을 그대로 반환한다.
 *
 * @param {object[]} influencers - 필터링할 influencer 목록
 * @param {object} options
 * @param {boolean} options.isTrial - trial 화면 여부 (true면 필터를 적용하지 않음)
 * @param {string} options.selectedRegion - FilterBar에서 선택된 지역 (한글 라벨, '전체'면 전체 노출)
 * @param {string} options.selectedTier - FilterBar에서 선택된 등급 (한글 라벨, '전체'면 전체 노출)
 * @returns {object[]} 필터링된 influencer 목록
 */
export function filterInfluencers(
  influencers,
  { isTrial, selectedRegion, selectedTier }
) {
  if (isTrial) {
    return influencers;
  }

  return influencers.filter((influencer) => {
    const matchesRegion =
      selectedRegion === '전체' || influencer.region === REGION_MAP[selectedRegion];
    const matchesTier =
      selectedTier === '전체' || influencer.tier === TIER_MAP[selectedTier];

    return matchesRegion && matchesTier;
  });
}
