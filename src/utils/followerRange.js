// 슬라이더/입력창이 실제로 다룰 수 있는 표시용 경계값 (드래그/직접입력으로 만들 수 있는 값의 범위)
export const FOLLOWER_MIN_BOUND = 10000;
export const FOLLOWER_MAX_BOUND = 1000000;

// '상한 없음'을 나타내는 값. FOLLOWER_MAX_BOUND(500K-1M의 실제 상한)와 겹치면
// '500K-1M'과 '1M+'를 구분할 수 없으므로 별도의 값(Infinity)을 사용한다.
export const FOLLOWER_UNBOUNDED_MAX = Infinity;

// 팔로워수 드롭다운에 나열되는 구간 프리셋. 마지막 '1M+'만 상한이 없다(= FOLLOWER_UNBOUNDED_MAX)
export const FOLLOWER_PRESETS = [
  { label: '10K-50K', min: 10000, max: 50000 },
  { label: '50K-100K', min: 50000, max: 100000 },
  { label: '100K-200K', min: 100000, max: 200000 },
  { label: '200K-500K', min: 200000, max: 500000 },
  { label: '500K-1M', min: 500000, max: FOLLOWER_MAX_BOUND },
  { label: '1M+', min: 1000000, max: FOLLOWER_UNBOUNDED_MAX },
];

// 팔로워수 범위가 기본값(전체 구간)에서 벗어나 실제로 필터링에 쓰이고 있는지 여부
export function isFollowerRangeActive(min, max) {
  return min > FOLLOWER_MIN_BOUND || max < FOLLOWER_UNBOUNDED_MAX;
}
