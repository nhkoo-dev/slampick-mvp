// FilterBar 정렬 버튼에서 사용하는 라벨
export const SORT_DEFAULT = '기본';
export const SORT_RATE_DESC = '단가↑';
export const SORT_RATE_ASC = '단가↓';

/**
 * 선택된 정렬 기준으로 influencer 목록을 rate_card 기준 정렬한다.
 * 원본 배열은 변경하지 않는다.
 *
 * @param {object[]} influencers - 정렬할 influencer 목록
 * @param {string} selectedSort - FilterBar에서 선택된 정렬 라벨
 * @returns {object[]} 정렬된 influencer 목록
 */
export function sortInfluencers(influencers, selectedSort) {
  if (selectedSort === SORT_RATE_DESC) {
    return [...influencers].sort((a, b) => (b.rate_card ?? 0) - (a.rate_card ?? 0));
  }

  if (selectedSort === SORT_RATE_ASC) {
    return [...influencers].sort((a, b) => (a.rate_card ?? 0) - (b.rate_card ?? 0));
  }

  return influencers;
}
