/**
 * trial 화면에서 블러 처리될 자리를 채우는 placeholder 카드 목록을 생성한다.
 * 별도의 placeholder 데이터는 없고, 실제 조회된 influencers를 count 길이만큼
 * 순환(모듈러 인덱싱)하며 재사용한다. 내용은 어차피 블러로 가려지므로 중복 노출되어도 무방하다.
 *
 * @param {object[]} influencers - 순환 재사용할 원본 influencer 목록
 * @param {number} count - 생성할 placeholder 카드 개수
 * @returns {object[]} 길이가 count인 placeholder influencer 목록 (influencers가 비어 있으면 빈 배열)
 */
export function createTrialPlaceholders(influencers, count) {
  if (influencers.length === 0) {
    return [];
  }

  return Array.from(
    { length: count },
    (_, i) => influencers[i % influencers.length]
  );
}
