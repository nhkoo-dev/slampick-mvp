// 단가(rate_card, 원 단위) 필터가 공유하는 절대 경계값. min이 하한과 같거나 max가 상한과 같으면
// 그쪽 방향으로는 제한이 없는(= 필터 미적용) 것으로 취급한다.
export const RATE_MIN_BOUND = 0;
export const RATE_MAX_BOUND = 30_000_000; // 3000만원

// '상한 없음'을 나타내는 값. RATE_MAX_BOUND('1000만-3000만'의 실제 상한과 '3000만+'의 시작점이 겹침)와
// 구분하기 위해 별도의 값(Infinity)을 사용한다.
export const RATE_UNBOUNDED_MAX = Infinity;

// 단가 드롭다운에 나열되는 구간 프리셋 (원 단위). 마지막 '3000만+'만 상한이 없다(= RATE_UNBOUNDED_MAX)
export const RATE_PRESETS = [
  { label: '100만 미만', min: 0, max: 1_000_000 },
  { label: '100만-300만', min: 1_000_000, max: 3_000_000 },
  { label: '300만-500만', min: 3_000_000, max: 5_000_000 },
  { label: '500만-1000만', min: 5_000_000, max: 10_000_000 },
  { label: '1000만-3000만', min: 10_000_000, max: RATE_MAX_BOUND },
  { label: '3000만+', min: RATE_MAX_BOUND, max: RATE_UNBOUNDED_MAX },
];

// 단가 범위가 기본값(전체 구간)에서 벗어나 실제로 필터링에 쓰이고 있는지 여부
export function isRateRangeActive(min, max) {
  return min > RATE_MIN_BOUND || max < RATE_UNBOUNDED_MAX;
}
